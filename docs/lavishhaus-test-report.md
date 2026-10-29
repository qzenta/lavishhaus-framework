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

## Performance (Lighthouse 12.8.2, mobile, local build)

Medians of 3 runs with simulated throttling:

| Page | Perf | LCP | TBT | CLS | A11y | Best practices | SEO |
|---|---|---|---|---|---|---|---|
| `/` | 83 (82/83/83) | 4.1 s | 242 ms | 0 | 100 | 79 | 100 |
| `/collections/bedroom/upholstered-beds` | 85 (85/85/82) | 4.0 s | 212 ms | 0 | 100 | 79 | 100 |
| `/quote` (single run) | 84 | 4.0 s | 220 ms | 0 | 100 | 79 | 100 |

Devtools-throttled run of `/`: LCP 3.6 s. The LCP element is the hero photo, which loads in about 90 ms under simulation; the rest is render delay (about 213 KiB of JS across 13 scripts, plus render-blocking CSS and fonts). **LCP does not meet the 2.5 s "good" threshold yet** (audit A-43). Best practices is 79 only because of Clarity's third-party cookies (A-44, client decision).

No Lighthouse baseline was captured for the live site: running it would have added synthetic sessions to the client's Clarity analytics. Byte-level wins are verified directly: the logo now downloads at 256/384w (was 1080/1920w), and the AI hero PNG and picsum images are gone.

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
