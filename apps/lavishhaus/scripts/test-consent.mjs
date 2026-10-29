// Consent banner behaviour against a LOCAL server. Clarity requests are
// intercepted and answered locally, so nothing reaches Microsoft.
// Usage: node scripts/test-consent.mjs <baseUrl> <outFile>
import { chromium } from "playwright";
import fs from "node:fs/promises";

const [base = "http://localhost:3100", outFile = "consent.json"] = process.argv.slice(2);
if (!/^http:\/\/(localhost|127\.0\.0\.1)/.test(base)) throw new Error("Refusing to run against a non-local URL");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`); };

async function session({ blockStorage = false } = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const clarity = [];
  await context.route(/clarity\.ms/, (route) => { clarity.push(route.request().url()); route.fulfill({ status: 204, body: "" }); });
  if (blockStorage) {
    await context.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
    });
  }
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && !/clarity/i.test(m.text()) && errors.push(m.text()));
  return { context, page, clarity, errors };
}
const banner = (page) => page.getByRole("region", { name: "Cookie consent" });
const settle = (page) => page.waitForLoadState("networkidle").then(() => page.waitForTimeout(800));

// 1. First visit: banner, no Clarity; keyboard reachable; Decline remembered.
{
  const { context, page, clarity, errors } = await session();
  await page.goto(base + "/"); await settle(page);
  check("first visit shows banner", await banner(page).isVisible());
  check("no Clarity request before a choice", clarity.length === 0, `${clarity.length} requests`);
  let reached = null;
  for (let i = 0; i < 60 && !reached; i++) {
    await page.keyboard.press("Tab");
    const t = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (t === "Decline" || t === "Accept") reached = t;
  }
  check("banner buttons reachable by keyboard", reached !== null, reached ?? "");
  await page.getByRole("button", { name: "Decline" }).focus();
  await page.keyboard.press("Enter");
  check("Decline (Enter key) hides banner", (await banner(page).count()) === 0);
  await page.reload(); await settle(page);
  check("Decline remembered after reload", (await banner(page).count()) === 0);
  check("no Clarity after Decline", clarity.length === 0, `${clarity.length} requests`);
  check("stored value is 'denied'", (await page.evaluate(() => localStorage.getItem("lh-analytics-consent"))) === "denied");
  await page.getByRole("button", { name: "Cookie settings" }).click();
  check("Cookie settings reopens banner", await banner(page).isVisible());
  check("no page errors (decline session)", errors.length === 0, errors.join(" | "));
  await context.close();
}
// 2. Accept: Clarity loads, persists, and withdrawing removes it.
{
  const { context, page, clarity, errors } = await session();
  await page.goto(base + "/collections/bedroom/upholstered-beds"); await settle(page);
  await page.getByRole("button", { name: "Accept" }).press("Space");
  await page.waitForTimeout(1500);
  check("Accept (Space key) loads Clarity", clarity.some((u) => u.includes("/tag/xybxgfgo4s")), `${clarity.length} requests`);
  check("banner gone after Accept", (await banner(page).count()) === 0);
  const before = clarity.length;
  await page.goto(base + "/about"); await settle(page); await page.waitForTimeout(1000);
  check("Accept remembered on next page load (Clarity loads again)", clarity.length > before && (await banner(page).count()) === 0);
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await page.waitForLoadState("load"); await settle(page);
  const n = clarity.length;
  await page.waitForTimeout(1500);
  check("withdrawing consent reloads without Clarity and shows banner", (await banner(page).isVisible()) && clarity.length === n);
  check("no page errors (accept session)", errors.length === 0, errors.join(" | "));
  await context.close();
}
// 3. Storage blocked: page still works, banner usable, no Clarity until Accept.
{
  const { context, page, clarity, errors } = await session({ blockStorage: true });
  await page.goto(base + "/"); await settle(page);
  check("storage blocked: banner still shown", await banner(page).isVisible());
  check("storage blocked: no Clarity before choice", clarity.length === 0);
  await page.getByRole("button", { name: "Decline" }).click();
  check("storage blocked: Decline still hides banner for this page", (await banner(page).count()) === 0);
  check("storage blocked: no page errors", errors.length === 0, errors.join(" | "));
  await context.close();
}
await browser.close();
await fs.writeFile(outFile, JSON.stringify(results, null, 2));
process.exit(results.every((r) => r.ok) ? 0 : 1);
