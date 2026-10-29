// Browser test of the quote and contact forms against a LOCAL server.
// Never point this at production: it submits the forms.
// Usage: node scripts/test-forms.mjs <baseUrl> <expect: fallback|delivered> <outDir>
import { chromium } from "playwright";
import fs from "node:fs/promises";

const [base = "http://localhost:3100", expect = "fallback", outDir = "test-results/forms"] = process.argv.slice(2);
if (!/^http:\/\/(localhost|127\.0\.0\.1)/.test(base)) throw new Error("Refusing to run against a non-local URL");
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`); };
const pick = async (label, option) => {
  await page.getByRole("combobox", { name: label }).click();
  await page.getByRole("option", { name: option }).click();
};

// Quote: prefill from query string
await page.goto(`${base}/quote?collection=upholstered-beds&piece=navy-bed-channel-wall-panel`);
const prefill = await page.getByText("Enquiring about:").count();
check("quote: piece prefill shown for known slug", prefill === 1);
await page.goto(`${base}/quote?collection=<script>&piece=nope`);
check("quote: unknown slugs ignored", (await page.getByText("Enquiring about:").count()) === 0);

// Quote: validation
await page.goto(`${base}/quote?collection=upholstered-beds`);
await page.getByRole("button", { name: "Request a Quote" }).last().click();
const msgs = await page.locator("[data-slot=form-message], p[id$=-form-item-message]").allTextContents();
check("quote: empty submit shows validation messages", msgs.length >= 4, msgs.length + " messages");
check("quote: invalid fields marked aria-invalid", (await page.locator("[aria-invalid=true]").count()) >= 3);

// Quote: full submit
await page.getByLabel("Full name").fill("Test Person");
await page.getByLabel("Email").fill("test@example.invalid");
await page.getByLabel("Phone").fill("082 000 0000");
await pick("Space type", "Residential");
await page.getByLabel("Tell us about your space").fill("Local automated test submission — please ignore.");
await page.getByLabel(/happy for Lavish Haus to contact me/).check();
await page.waitForTimeout(2600); // minimum fill time
await page.getByRole("button", { name: "Request a Quote" }).last().click();
if (expect === "delivered") {
  await page.getByRole("heading", { name: "Request received" }).waitFor({ timeout: 15000 });
  check("quote: success shown only when delivered", true);
  check("quote: no 'one business day' promise", (await page.getByText(/business day/).count()) === 0);
} else {
  await page.getByRole("alert").filter({ hasText: "couldn't send" }).waitFor({ timeout: 15000 });
  check("quote: not-configured shows fallback, not success", (await page.getByRole("heading", { name: "Request received" }).count()) === 0);
  check("quote: fallback offers WhatsApp/phone/email", (await page.locator('[role=alert] a[href^="https://wa.me/"], [role=alert] a[href^="tel:"], [role=alert] a[href^="mailto:"]').count()) === 3);
}
await page.screenshot({ path: `${outDir}/quote-${expect}.png`, fullPage: true });

// Contact: fast (bot-like) submit is silently dropped
await page.goto(`${base}/contact`);
await page.getByLabel("Full name").fill("Fast Bot");
await page.getByLabel("Email").fill("bot@example.invalid");
await page.getByLabel(/Message/).fill("Submitted far too quickly to be a person.");
await page.getByRole("button", { name: /Send/ }).click();
await page.getByRole("heading", { name: "Message sent" }).waitFor({ timeout: 15000 });
check("contact: too-fast submit gets quiet success (dropped server-side)", true);

// Contact: real-speed submit
await page.goto(`${base}/contact`);
await page.getByLabel("Full name").fill("Test Person");
await page.getByLabel("Email").fill("test@example.invalid");
await page.getByLabel(/Message/).fill("Local automated test submission — please ignore.");
await page.waitForTimeout(2600);
await page.getByRole("button", { name: /Send/ }).click();
if (expect === "delivered") {
  await page.getByRole("heading", { name: "Message sent" }).waitFor({ timeout: 15000 });
  check("contact: success when delivered", true);
} else {
  await page.getByRole("alert").filter({ hasText: "couldn't send" }).waitFor({ timeout: 15000 });
  check("contact: not-configured shows fallback", true);
}
await page.screenshot({ path: `${outDir}/contact-${expect}.png`, fullPage: true });

check("no console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
await browser.close();
await fs.writeFile(`${outDir}/forms-${expect}.json`, JSON.stringify(results, null, 2));
process.exit(results.every((r) => r.ok) ? 0 : 1);
