# Lavish Haus — Test report

Branch `lavishhaus-redesign`. Every result below comes from a command that was actually run, against a **local** production build (`next build` + `next start -p 3100`) on Windows 11 / Node 24.16 / Chromium 1234 (Playwright 1.56.1). Nothing was run against production. No real email or WhatsApp message was sent.

Raw evidence lives in `docs/evidence/` (`baseline/`, `batch2/`, `batch2b/`, `batch3/`, `batch4/`, `final/`). Screenshots are committed as compressed JPGs; full-size PNGs are gitignored.

## Summary

| Check | Result | Evidence |
|---|---|---|
| TypeScript (`tsc --noEmit`) | 0 errors | `final/checks.log` |
| ESLint | 0 problems (baseline: 8 errors) | `final/checks.log`, `baseline/checks.log` |
| Production build | OK, 33 pages (baseline 39; project pages removed) | build output |
| Unit tests (`npm test`) | 8/8 pass | `final/checks.log` |
| Routes | 25 sitemap routes × 3 viewports (390 / 820 / 1440): all 200, 0 console errors | `batch4/results.json` |
| Internal links | 58 checked, 0 bad | `batch4/results.json` |
| Images | 0 broken, 0 missing alt, 0 placeholder (picsum) images; baseline had picsum images on several pages | `batch4/results.json` |
| Layout | 0 pages with horizontal overflow at any viewport | `batch4/results.json` |
| Headings / SEO | Exactly one h1 on every page (baseline: several had none); canonical on every page; hidden Outdoor category `noindex, follow`; sitemap has 25 URLs incl. `/craftsmanship`; 404 page returns 404 | `batch4/results.json`, `final/checks.log` |
| Redirects | 10 retired collection URLs → 308 to their closest collection; `/projects` and `/projects/*` → 307 to Bespoke Commissions | `final/checks.log` |
| Accessibility (axe-core, WCAG 2.1 A/AA) | 0 violations on 16 routes × 2 viewports (one rule, `link-in-text-block`, was found and fixed) | `batch4/a11y.json` |
| Keyboard | First Tab is "Skip to content", and Enter moves focus to `main`. 25/25 following tab stops have a visible focus indicator. Lightbox arrow keys added (manual check recommended) | `batch4/a11y.json` |
| Reduced motion | With `prefers-reduced-motion: reduce` the max computed animation/transition is 0.01 ms and scroll-behavior is `auto` | `batch4/a11y.json` |
| Forms, no email key | Quote and contact: validation messages and `aria-invalid` shown; a full submit shows the WhatsApp/phone/email fallback, **not** a success message; values are kept for retry | `batch3/`, `batch4/forms-fallback.json` |
| Forms, mocked email API | With `BREVO_API_URL` pointed at a local mock: success shown; the mock received exactly 2 requests (the too-fast "bot" submission was dropped); HTML in the payload escaped | `batch3/forms-delivered.json` |
| PII in logs | Server logs from both runs contain no submitted names, emails or phone numbers | grep in batch 3 |
| tel / mailto / WhatsApp / map links | Present and well-formed in header, footer, product blocks and fallback; the form test asserts the fallback's 3 links. Not clicked through to the external apps | code + form test |

## Batch 6: consent banner and mobile LCP (commit `e8805e8`)

### Before and after (Lighthouse 12.8.2, mobile, local production builds)

"Before" is `ac84ea8` and "after" is `e8805e8`. Both were built and served the same way (`next build` + `next start`, HTTP/1.1 on localhost) on the same machine in the same session, one after the other. Medians are shown, with per-run Performance scores in brackets. Raw data: `docs/evidence/batch6/lighthouse-{before,after}.json` and `lh-devtools-{before,after}.json`.

**Simulated throttling (Lantern, Lighthouse default), 5 runs each**

| Page | Build | Perf | FCP | LCP | TBT | CLS | Speed Index | Bytes | Best practices |
|---|---|---|---|---|---|---|---|---|---|
| `/` | before | 81 (77/78/81/85/81) | 1.1 s | 4.1 s | 275 ms | 0 | 1.1 s | 613 KiB | 79 |
| `/` | after | **84** (84/83/84/82/86) | 1.4 s | 4.3 s | **147 ms** | 0 | 1.9 s | **565 KiB** | **100** |
| `/collections/bedroom/upholstered-beds` | before | 83 (83/86/77/87/82) | 1.1 s | 3.9 s | 251 ms | 0 | 1.1 s | 555 KiB | 79 |
| `/collections/bedroom/upholstered-beds` | after | **88** (87/88/85/88/88) | 1.4 s | 3.9 s | **64 ms** | 0 | 1.4 s | **506 KiB** | **100** |

**Devtools (observed) throttling, 3 runs each, `clarity.ms` blocked in both**

| Page | Build | Perf | FCP | LCP | TBT | Speed Index | Bytes |
|---|---|---|---|---|---|---|---|
| `/` | before | 45 (44/46/45) | 4.5 s | 5.1 s | 1296 ms | 4.8 s | 578 KiB |
| `/` | after | 50 (48/50/56) | **4.1 s** | **4.3 s** | 1351 ms | 4.2 s | 558 KiB |
| `/collections/bedroom/upholstered-beds` | before | 48 (46/49/48) | 4.4 s | 4.6 s | 1369 ms | 4.5 s | 547 KiB |
| `/collections/bedroom/upholstered-beds` | after | 50 (50/64/49) | 4.2 s | **4.3 s** | 1265 ms | 4.3 s | 526 KiB |

Clarity was blocked in the devtools runs so no more synthetic sessions reach the client's analytics. This flatters "before", which normally loads Clarity, so the devtools deltas understate the gain. Devtools TBT depends on host load: this machine was clearly busier than during batch 4, when a single run gave perf 73, so compare rows within this table only.

**What the numbers say**
- Main-thread work and best practices clearly improved. Simulated TBT fell 46% on `/` and 75% on the collection page. Best practices went from 79 to 100 because no third-party cookies are set before consent. Page weight fell by 48–49 KiB.
- **LCP improved only in the observed run** (−0.8 s on `/`, −0.3 s on the collection page). It was flat in the Lantern simulation (4.1→4.3 s and 3.9→3.9 s; the 0.2 s on `/` is within run-to-run spread). **Neither meets the 2.5 s target.** Lantern doesn't model `fetchpriority`, and on this HTTP/1.1 localhost server it shares the simulated bandwidth of six connections between the 40 KB hero and roughly 210 KiB of JS. Production (Vercel, HTTP/2) won't have that six-connection limit, but it can't be measured from here without touching production.
- **Simulated FCP got 0.3 s worse** (1.1→1.4 s) and Speed Index rose, while observed FCP improved (4.5→4.1 s). The likely cause is that Inter is no longer preloaded, so Lantern discovers the font later. Text still renders immediately in the metric-matched fallback (`display: swap`), and CLS stays 0.

### What changed for performance

| Item | Before | After | How verified |
|---|---|---|---|
| Hero image | Preloaded with `imageSizes` and `fetchPriority="high"`, 40 KB AVIF at 750w (already correct in batch 4) | unchanged | HTML `<link rel=preload>` and `/_next/image` response |
| Font preloads | 2 (Inter variable 48.4 KB + Playfair variable 38.5 KB) | 1 (Playfair 400 static, 21.9 KB); Inter swaps in without preload | HTML and file sizes |
| Microsoft Clarity | Loaded on every visit (bootup 330–480 ms in batch 4 traces) | Not loaded until Accept | `scripts/test-consent.mjs` (0 requests before a choice and after Decline) |
| Mobile menu (Radix Dialog) | In the initial bundle | Loaded on first open | Browser check: chunks load on click; focus returns to "Open menu" |
| Gallery lightbox (Radix Dialog) | In the initial bundle | Loaded on first open (2 chunks) | Browser check: 12 → 14 chunks on first open; arrows and focus return OK |
| Initial JS, `/` (gzip) | 12 scripts, 219 KiB | 11 scripts, 212 KiB | `curl` + gzip of each chunk |
| Render-blocking CSS | 1 file, 15 KB gzip | 1 file (Tailwind output; already minimal) | Lighthouse `render-blocking-resources` |

Remaining LCP levers, not done: replace the Radix navigation menu (about 19 KiB with DismissableLayer) with a native disclosure, and measure on a Vercel preview where HTTP/2 applies.

### Consent banner

`scripts/test-consent.mjs`: 18/18 pass (`docs/evidence/batch6/consent.json`). Clarity requests were intercepted locally, so nothing reached Microsoft.
- First visit shows the banner, with no Clarity request.
- Both buttons are reachable with Tab and work with Enter and Space.
- Decline hides the banner and persists across reloads (`localStorage` = `denied`), and Clarity is never requested.
- Accept loads Clarity, persists on the next page load, and the banner stays hidden.
- Footer "Cookie settings" reopens the banner. Withdrawing after Accept reloads the page without Clarity.
- With `localStorage` throwing, the banner still works for the page view, there are no page errors, and Clarity isn't loaded.

### Re-run checks on the batch 6 build (`docs/evidence/batch6/checks.log`)

tsc 0 errors · eslint 0 problems · unit tests 8/8 · axe WCAG 2.1 AA 0 violations (16 routes × 2 viewports, banner present) · skip link and focus visibility OK · reduced motion OK · forms 9/9 · routes 25 × 3 viewports, all 200, 0 console errors, 0 broken images, 0 overflow, one h1 each, 59/59 internal links OK.

## Performance (batch 4, superseded by the batch 6 tables above)

Medians of 3 runs with simulated throttling:

| Page | Perf | LCP | TBT | CLS | A11y | Best practices | SEO |
|---|---|---|---|---|---|---|---|
| `/` | 83 (82/83/83) | 4.1 s | 242 ms | 0 | 100 | 79 | 100 |
| `/collections/bedroom/upholstered-beds` | 85 (85/85/82) | 4.0 s | 212 ms | 0 | 100 | 79 | 100 |
| `/quote` (single run) | 84 | 4.0 s | 220 ms | 0 | 100 | 79 | 100 |

Devtools-throttled run of `/`: LCP 3.6 s. The LCP element is the hero photo, which loads in about 90 ms under simulation; the rest is render delay (about 213 KiB of JS across 13 scripts, plus render-blocking CSS and fonts). **LCP does not meet the 2.5 s "good" threshold yet** (audit A-43). Best practices is 79 only because of Clarity's third-party cookies (fixed in batch 6 by the consent gate).

No Lighthouse baseline was captured for the live site: running it would have added synthetic sessions to the client's Clarity analytics. Local Lighthouse runs of builds that still loaded Clarity unconditionally (batch 4, and batch 6 "before" simulated) will have sent localhost sessions to the Clarity project. Byte-level wins are verified directly: the logo now downloads at 256/384w (was 1080/1920w), and the AI hero PNG and picsum images are gone.

## Not tested / limitations

- **Real email delivery.** Production env vars can't be read (A-30). Delivery through real Brevo was deliberately not exercised.
- Manual screen-reader pass (NVDA/VoiceOver) not done; axe and the keyboard script are automated proxies.
- Real-device testing (iOS Safari, Android Chrome) not done; Chromium emulation only.
- The Payload `/admin` area was not part of the redesign and was not audited beyond the build.
- Lightbox keyboard navigation is implemented but not covered by the automated script.

## How to re-run

From `apps/lavishhaus`, after `npx next build && npx next start -p 3100`:

```sh
export CHROMIUM_PATH=".../chromium-1234/chrome-win64/chrome.exe"   # optional
npm test
node scripts/audit-pages.mjs http://localhost:3100 ../../docs/evidence/<dir>
node scripts/a11y-check.mjs  http://localhost:3100 ../../docs/evidence/<dir>/a11y.json
node scripts/test-forms.mjs  http://localhost:3100 fallback ../../docs/evidence/<dir>   # refuses non-local URLs
```

For the "delivered" path, start a second server with `BREVO_API_KEY=test-local BREVO_API_URL=http://127.0.0.1:<port>/email` pointing at a local mock. Never point it at real Brevo.
