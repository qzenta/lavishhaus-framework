// Runs Lighthouse (mobile, simulated throttling) N times per route against a
// LOCAL server and prints/writes medians. Needs CHROME_PATH or a system Chrome.
// LH_THROTTLING=devtools applies real (observed) throttling instead of Lantern simulation.
// Usage: node scripts/lighthouse-median.mjs <baseUrl> <outFile> <runs> <route> [route...]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [base, outFile, runsArg, ...routes] = process.argv.slice(2);
if (!/^http:\/\/(localhost|127\.0\.0\.1)/.test(base)) throw new Error("Refusing to run against a non-local URL");
const runs = Number(runsArg) || 3;
const throttling = process.env.LH_THROTTLING === "devtools" ? "devtools" : "simulate";
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lh-"));
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const ids = ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index", "total-byte-weight"];
const summary = { base, runs, lighthouse: "12.8.2", formFactor: "mobile", throttling, date: new Date().toISOString(), routes: {} };

for (const route of routes) {
  const reports = [];
  for (let i = 0; i < runs; i++) {
    const file = path.join(tmp, `r${i}.json`);
    execFileSync(process.platform === "win32" ? "npx.cmd" : "npx", ["-y", "lighthouse@12.8.2", base + route, "--quiet",
      "--chrome-flags=--headless=new", "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json", `--output-path=${file}`, `--throttling-method=${throttling}`], { stdio: "ignore", shell: process.platform === "win32" });
    reports.push(JSON.parse(fs.readFileSync(file, "utf8")));
  }
  const row = { perfRuns: reports.map((r) => Math.round(r.categories.performance.score * 100)) };
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) row[c] = median(reports.map((r) => Math.round(r.categories[c].score * 100)));
  for (const id of ids) row[id] = median(reports.map((r) => r.audits[id].numericValue));
  const phases = reports[0].audits["largest-contentful-paint-element"]?.details?.items?.[1]?.items;
  row.lcpPhasesRun1 = phases?.map((p) => `${p.phase}=${Math.round(p.timing)}ms`);
  row.renderBlocking = reports[0].audits["render-blocking-resources"]?.details?.items?.map((i) => i.url.replace(base, "")) ?? [];
  summary.routes[route] = row;
  console.log(
    route.padEnd(40),
    `perf ${row.performance} (${row.perfRuns.join("/")})`,
    `FCP ${(row["first-contentful-paint"] / 1000).toFixed(1)}s`,
    `LCP ${(row["largest-contentful-paint"] / 1000).toFixed(1)}s`,
    `TBT ${Math.round(row["total-blocking-time"])}ms`,
    `CLS ${row["cumulative-layout-shift"].toFixed(3)}`,
    `${Math.round(row["total-byte-weight"] / 1024)}KiB`
  );
}
fs.writeFileSync(outFile, JSON.stringify(summary, null, 2));
