// Page audit: screenshots + console/network errors + basic SEO/a11y signals.
// Usage: node scripts/audit-pages.mjs <baseUrl> <outDir> [--routes=/,/about] [--viewports=mobile,desktop]
// Read-only: issues GET requests only, never submits forms.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [baseUrl, outDir] = process.argv.slice(2);
if (!baseUrl || !outDir) {
  console.error("usage: node scripts/audit-pages.mjs <baseUrl> <outDir>");
  process.exit(1);
}
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
};
const viewports = (arg("viewports") ?? "mobile,tablet,desktop").split(",");
let routes = arg("routes")?.split(",");

fs.mkdirSync(outDir, { recursive: true });
// CHROMIUM_PATH lets the audit reuse an already-installed Chromium build.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

async function discoverRoutes() {
  // Seed from sitemap, then add every internal link found on the homepage.
  const found = new Set(["/"]);
  try {
    const xml = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) found.add(new URL(m[1]).pathname);
  } catch {}
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) if (h?.startsWith("/") && !h.startsWith("//")) found.add(h.split("#")[0].split("?")[0]);
  await page.close();
  return [...found].filter(Boolean).sort();
}

routes ??= await discoverRoutes();
const results = [];
const allLinks = new Set();

for (const route of routes) {
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: VIEWPORTS[vp] });
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 300)));
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message.slice(0, 300)}`));
    page.on("requestfailed", (r) => failedRequests.push(`${r.failure()?.errorText} ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && failedRequests.push(`${r.status()} ${r.url()}`));

    const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle", timeout: 60000 });
    // Scroll to trigger lazy images before measuring.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const info = await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
      const imgs = [...document.images];
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
          try {
            const j = JSON.parse(s.textContent);
            return [j["@type"]].flat();
          } catch {
            return ["INVALID"];
          }
        }),
        imagesMissingAlt: imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc || i.src),
        brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        placeholderImages: imgs.filter((i) => /picsum/.test(i.currentSrc || i.src)).length,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      };
    });
    for (const l of info.links) allLinks.add(l);
    delete info.links;

    const file = `${route === "/" ? "home" : route.slice(1).replace(/\//g, "__")}--${vp}.png`;
    await page.screenshot({ path: path.join(outDir, file), fullPage: true });
    results.push({ route, viewport: vp, status: response?.status(), ...info, consoleErrors, failedRequests, screenshot: file });
    await context.close();
  }
}

// Check every internal link once with a GET (HEAD is unreliable on some routes).
const linkStatus = {};
for (const href of [...allLinks].filter((h) => h?.startsWith("/") && !h.startsWith("//"))) {
  try {
    const r = await fetch(new URL(href, baseUrl), { redirect: "manual" });
    linkStatus[href] = r.status;
  } catch (e) {
    linkStatus[href] = `ERR ${e.message}`;
  }
}
const externalLinks = [...allLinks].filter((h) => h && !h.startsWith("/") && !h.startsWith("#"));

fs.writeFileSync(path.join(outDir, "results.json"), JSON.stringify({ baseUrl, results, linkStatus, externalLinks }, null, 2));
await browser.close();

const bad = results.filter((r) => r.status >= 400 || r.consoleErrors.length || r.failedRequests.length || r.brokenImages.length || r.horizontalOverflow);
console.log(`routes=${routes.length} pages=${results.length} withIssues=${bad.length}`);
for (const r of bad) {
  console.log(
    `${r.route} [${r.viewport}] status=${r.status} console=${r.consoleErrors.length} failed=${r.failedRequests.length} broken=${r.brokenImages.length} overflow=${r.horizontalOverflow}`
  );
}
const badLinks = Object.entries(linkStatus).filter(([, s]) => typeof s !== "number" || s >= 400);
console.log(`internalLinks=${Object.keys(linkStatus).length} bad=${badLinks.length}`, badLinks.map((b) => b.join(" ")).join(", "));
