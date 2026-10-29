// axe-core scan (WCAG 2.1 A/AA) plus keyboard and reduced-motion checks
// against a local server. Usage: node scripts/a11y-check.mjs <baseUrl> <outFile> [routes,comma,separated]
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

const [base = "http://localhost:3100", outFile = "a11y.json", routeArg] = process.argv.slice(2);
const routes = routeArg
  ? routeArg.split(",")
  : ["/", "/collections", "/collections/bedroom", "/collections/bedroom/upholstered-beds",
     "/collections/living-room/tv-wall-units", "/collections/custom-furniture/bespoke-commissions",
     "/collections/outdoor", "/craftsmanship", "/showroom", "/about", "/contact", "/quote",
     "/faqs", "/privacy", "/terms", "/does-not-exist"];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const report = { axe: {}, keyboard: {}, reducedMotion: {} };

for (const [name, viewport] of [["mobile", { width: 390, height: 844 }], ["desktop", { width: 1440, height: 900 }]]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    report.axe[`${route} [${name}]`] = result.violations.map((v) => ({
      id: v.id, impact: v.impact, nodes: v.nodes.length,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));
  }
  await context.close();
}

// Keyboard: first Tab reaches the skip link, which moves focus to <main>; focus is always visible.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  await page.keyboard.press("Enter");
  const afterSkip = await page.evaluate(() => document.activeElement?.id);
  const stops = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    stops.push(await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return { tag: "body", visible: false };
      const s = getComputedStyle(el);
      const ring = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
      const shadow = s.boxShadow && s.boxShadow !== "none";
      return { tag: el.tagName, text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40), visible: ring || shadow };
    }));
  }
  report.keyboard = { firstTab: first, afterSkipFocus: afterSkip, stops, invisibleFocus: stops.filter((s) => !s.visible) };
  await page.close();
}

// Reduced motion: computed animation/transition durations collapse.
{
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  report.reducedMotion = await page.evaluate(() => {
    let maxAnim = 0, maxTrans = 0;
    for (const el of document.querySelectorAll("*")) {
      const s = getComputedStyle(el);
      const ms = (v) => Math.max(...v.split(",").map((x) => (x.trim().endsWith("ms") ? parseFloat(x) : parseFloat(x) * 1000)));
      maxAnim = Math.max(maxAnim, ms(s.animationDuration));
      maxTrans = Math.max(maxTrans, ms(s.transitionDuration));
    }
    return { maxAnimationMs: maxAnim, maxTransitionMs: maxTrans, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
  await context.close();
}

await browser.close();
await fs.writeFile(outFile, JSON.stringify(report, null, 2));
const all = Object.entries(report.axe).flatMap(([k, v]) => v.map((x) => ({ page: k, ...x })));
const byRule = {};
for (const v of all) {
  byRule[v.id] ??= { impact: v.impact, pages: 0, nodes: 0, example: v.targets[0] };
  byRule[v.id].pages++;
  byRule[v.id].nodes += v.nodes;
}
console.log("axe violations by rule:", JSON.stringify(byRule, null, 1));
console.log("keyboard:", JSON.stringify({ firstTab: report.keyboard.firstTab, afterSkip: report.keyboard.afterSkipFocus, invisibleFocus: report.keyboard.invisibleFocus }));
console.log("reducedMotion:", JSON.stringify(report.reducedMotion));
