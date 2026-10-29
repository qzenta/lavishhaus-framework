# Lavish Haus — Progress register

Resume rule: after any reset, check `git log` and `git status` on `lavishhaus-redesign`
and re-run the relevant checks. Don't trust this file alone.

## Standing constraints (client overrides, 29 Oct 2026)

1. Work only in `apps/lavishhaus` unless a fix genuinely needs `packages/*`.
2. Local commits on `lavishhaus-redesign` only: never push or merge, and never touch DNS, Vercel settings, env values or production.
3. No HyperFrames or Remotion; CSS and native transitions only.
4. sharp for image derivatives; Playwright for screenshots.
5. Treat every business claim as unverified until `docs/lavishhaus-facts.md` shows a client source.
6. New client photos go in `photography-inbox/_unsorted/`; unfilled slots are listed in `docs/lavishhaus-assets.md`.
7. Chat output: a one-line status plus the last 30 lines of command output; detail goes here.

Also: edit existing routes, components and inbox folders in place; never scaffold a new project or parallel folders.

## Tooling notes

- Screenshots: `CHROMIUM_PATH="C:/Users/pc/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe" node scripts/audit-pages.mjs <baseUrl> <outDir>` (from `apps/lavishhaus`). Then `node scripts/compress-evidence.mjs <outDir>`; PNGs are gitignored.
- Images: `node scripts/build-images.mjs` (needs the local, gitignored `photography-inbox/categories/` originals).

## Batches

| # | Scope | Status | Commit |
|---|---|---|---|
| 0 | Baseline audit, screenshots, asset classification, fact register, tooling | done | `460eb68` |
| 1+2 | P0 trust and imagery (one commit, they share files): fabricated projects, testimonials and claims removed; showroom wording; AI hero out; catalog rebuilt around 31 real photos; 12 redirects; Aurelia/TV fix; OG card; contrast and heading fixes | done | see git log |
| 3 | P0 forms: honest delivery result, HTML escaping, no PII logs, honeypot; tests | done | see git log |
| 4 | P1 redesign: first screen, cards, grids, mobile; h1s; JSON-LD; OG | pending | |
| 5 | Verification: build, lint, routes, screenshots, a11y, perf, reduced motion; reports | pending | |

## Current state

- Branch `lavishhaus-redesign`. Batches 0–2 committed.
- Last successful checks (batch 2): `tsc` clean, `eslint` clean, `next build` OK (33 pages). Local audit `docs/evidence/batch2/`: 25 routes × 3 viewports, 0 console errors, 0 placeholder images, 0 overflow, one h1 per page, 58/58 internal links OK. Redirects checked with curl: 10 retired collections → 308, `/projects` and `/projects/*` → 307 to Bespoke Commissions.
- Git Bash: pass `MSYS_NO_PATHCONV=1` when giving `--routes=/…` to the audit script. `TaskStop` on `npx next start` can leave the node child holding port 3100; find it with `Get-NetTCPConnection -LocalPort 3100`.
- Batch 3 checks: `npm test` 8/8 pass (`tests/enquiry.test.mjs`: escaping, header line breaks, honeypot/timing, Brevo not-configured/success/failure with a fake fetch). Browser test `scripts/test-forms.mjs` (refuses non-local URLs) 9/9 pass twice: against a server with no `BREVO_API_KEY` (fallback shown, no false success) and against a server with `BREVO_API_URL` pointed at a local mock on 127.0.0.1:3199 (success shown; the mock got exactly 2 requests, so the too-fast bot submit was dropped; HTML escaped). No real email was sent. Server logs contain no submitted names, emails or phones. Evidence: `docs/evidence/batch3/`.
- Production note: if `BREVO_API_KEY` is missing in Vercel (unknown, A-30), live forms will now show the WhatsApp/phone/email fallback instead of a false "received".
- Next: batch 4 (privacy disclosure, reduced motion, keyboard/a11y, performance, visual polish).

## Blockers / external input

- A-30: production env vars can't be read (Vercel API 403), so whether live forms deliver is unknown.
- Client facts: see the questions in `docs/lavishhaus-facts.md`.
