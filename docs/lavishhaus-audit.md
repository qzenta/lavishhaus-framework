# Lavish Haus — Website audit

Audit date: 2026-10-29. Auditor: Claude Code (autonomous mandate, `docs/lavishhaus-brief.md`).
Status legend: **open** · **fixed** (code changed and verified) · **blocked** (needs external input) · **wontfix** (with reason).

## 1. Baseline facts

| Item | Finding |
|---|---|
| Repository | `qzenta/lavishhaus-framework` (GitHub), monorepo; live app `apps/lavishhaus` |
| Branch / commit at start | `lavishhaus-redesign` @ `c68b753` (= `main` = production deployment `dpl_ETwkFnsgnQKQNSQJV6ud8Zb3WxQZ`) |
| Working tree at start | clean (the untracked `docs/lavishhaus-brief.md` was added by the client today) |
| Framework | Next.js 16.3.0 (App Router), React 19.2.8, TypeScript 5, Tailwind 4, shadcn/radix, framer-motion 13 (installed; usage checked in A-30), Payload CMS 3.87 (SQLite; mounted at `/admin`, content still served from `content/*.ts`) |
| Package manager / runtime | npm (`package-lock.json`); Vercel Node 24.x |
| Commands | `npm run dev`, `npm run build`, `npm run lint` (eslint), `npx tsc --noEmit` |
| Hosting | Vercel project `lavishhaus` (`prj_S34kUSSooKo4JpocjJB00IlfjhEo`), production branch `main`, domains `lavishhaus.co.za` and `www.lavishhaus.co.za`. Preview deployments have Vercel SSO protection ("all except custom domains"), so preview URLs need a Vercel login |
| Env vars | **Could not list** (Vercel API 403; no Vercel CLI installed). Unknown whether `BREVO_API_KEY`, `QUOTE_NOTIFY_EMAIL` and `CONTACT_NOTIFY_EMAIL` are set in production |
| Forms | `/quote`, `/contact` → server actions `lib/actions.ts` → `services/*-service.ts` → Brevo transactional email API. No n8n or CRM write yet |
| Analytics | Microsoft Clarity (`xybxgfgo4s`), inline in `app/layout.tsx`; loads unconditionally |
| SEO | Per-page metadata and canonicals, `sitemap.ts`, `robots.ts`, JSON-LD (Organization, FurnitureStore, Product, FAQPage, Breadcrumb) |
| Tests | None (no test runner or test files). Baseline: lint fails with 8 errors, all in untracked `photography-inbox/_scripts/*.js`; `tsc` passes; `next build` passes (39 pages) — `docs/evidence/baseline/checks.log` |
| Baseline screenshots | Live site, 32 routes × mobile 390 / tablet 820 / desktop 1440: `docs/evidence/baseline/live/*.png`, data in `results.json` (via `apps/lavishhaus/scripts/audit-pages.mjs`) |
| Client assets | See `docs/lavishhaus-assets.md` (34 earlier photos in `public/images/rooms/`, 12 new photos + 1 video in `_unsorted/`, logo, 3 AI images, 1 CGI render) |

Public routes found (sitemap + navigation + footer): `/`, `/about`, `/collections`, 7 category pages, 11 collection pages, `/craftsmanship`, `/projects` + 3 project pages, `/showroom`, `/faqs`, `/quote`, `/contact`, `/privacy`, `/terms`. All return 200; no broken internal links (43 checked); no horizontal overflow at any viewport. The only console error is Clarity's beacon failing DNS once; the `ERR_ABORTED …/quote?_rsc=` entries are cancelled prefetches (benign).

## 2. Findings

Severity: P0 (misleading, broken or unsafe) → P3 (optional).

| ID | Sev | Area | Finding and evidence | Remedy | Verification | Status |
|---|---|---|---|---|---|---|
| A-01 | P0 | Imagery | **Homepage hero is AI-generated** but its alt text and placement present it as a real Lavish Haus room. `public/images/hero-living-room.png` has the same perceptual hash as `photography-inbox/Gemini_Generated_Image_dtry72….png`; commit `e7cde4f` says "AI-generated lifestyle image". It is also only 1376 px wide, stretched to full-bleed | Replace with a real client photo | Screenshot + source check | fixed (batch 1–2) |
| A-02 | P0 | Imagery | **Aurelia Sofa Collection gallery is 6 TV wall consoles** plus a Chesterfield that contradicts the copy ("low, architectural profile") | Rebuild the catalog around the photographed pieces; TV consoles get their own collection | Collection page screenshot | fixed (batch 1–2) |
| A-03 | P0 | Imagery | Other mismatches: the **Outdoor** collection and category show a bedroom photo and the round-mirror console; **Porter Nightstand** shows a bed; **Marchetti Coffee Table** shows console tables and a TV console; a bed appears inside another bed's gallery | Same as A-02 | Per-page screenshots | fixed (batch 1–2) |
| A-04 | P0 | Imagery | **picsum stock photos** on 13 routes: product rows on every collection page, all 3 projects, showroom, Instagram grid. They include a European city skyline and cherry blossoms labelled as "Sandton Executive Office" and "Camps Bay Outdoor Terrace" | Remove every `placeholderImage` use; show only real photos | `placeholderImages` = 0 in audit results | fixed (batch 1–2) |
| A-05 | P0 | Trust | **Fabricated projects**: Houghton, Sandton and Camps Bay "recently completed spaces", with fictional summaries | Remove; redirect `/projects/*`; take Projects out of nav, footer and sitemap until real projects are supplied | Redirect check + nav | fixed (batch 1–2) |
| A-06 | P0 | Trust | **Fabricated testimonials** (named people, places, invented products). They also render invisibly (`text-charcoal` on `bg-charcoal`) | Remove the section and data | Screenshot | fixed (batch 1–2) |
| A-07 | P0 | Trust | **Unverified claims**: FSC-certified timber, full-grain leather, 15-year structural guarantee (home, about stats, Aurelia), "respond within one business day" (6 places), 8–12-week lead times (every product), 10–16 weeks (FAQ), "eighteen months of prototyping", "first dining chair run in 2019", "most requested by returning clients", nationwide delivery | Remove or soften per the fact register | grep + screenshots | fixed (batch 1–2) |
| A-08 | P0 | Trust | **Showroom status contradiction**: home says "Johannesburg Showroom Opening Soon" and the FAQ says "opening"; `/showroom`, contact, footer and JSON-LD give a full address and opening hours | Neutral wording: show the address with "contact us to arrange a visit"; drop the unverified hours | Screenshots | fixed (batch 1–2) |
| A-09 | P0 | Catalog | **Fictional products and specifications**: 18 invented products with dimensions (e.g. "W 240 cm"), finish swatches and named materials that don't correspond to any photographed piece | Replace with photographed pieces, described only by what is visible; no dimensions, lead times or certified materials | Content review | fixed (batch 1–2) |
| A-10 | P0 | Forms | **False success**: when `BREVO_API_KEY` is missing the services return `{delivered:false}`, but the action still returns `success:true` and the UI says "we'll reply within one business day". The enquiry is silently dropped. Whether production has the key is unknown (A-30) | Treat not-delivered as a failure with an honest fallback message (WhatsApp, phone, email) | Unit test + browser test | fixed (batch 3) |
| A-11 | P0 | Security / privacy | User input is interpolated **unescaped into the HTML email** (HTML injection into the staff inbox) | Escape all fields | Unit test | fixed (batch 3) |
| A-12 | P0 | Privacy | On the missing-key path the full enquiry (name, email, phone, message) is written to server logs via `console.warn(values)` | Log no PII | Unit test / code review | fixed (batch 3) |
| A-13 | P1 | Forms | No spam protection (no honeypot, rate limit or captcha) | Add a honeypot field plus a minimum fill time | Unit test | fixed (batch 3): honeypot + 2.5 s minimum fill time |
| A-14 | P1 | Privacy | Microsoft Clarity session recording loads without consent and isn't mentioned in the privacy policy (POPIA notice) | Disclose in the privacy policy; consent banner is a client decision | Content review | partly fixed (batch 4): Clarity and Brevo disclosed on /privacy; consent banner is a client decision (F-23) |
| A-15 | P1 | Trust | Social links (`instagram.com/lavishhaus`, `facebook.com/lavishhaus`, `pinterest.com/lavishhaus`) aren't confirmed as the client's accounts and are emitted in Organization `sameAs`. The Instagram grid is picsum | Hide until confirmed; remove the placeholder grid | Screenshot | fixed (batch 1–2) |
| A-16 | P1 | SEO | Product JSON-LD on collection pages has `offers` with no price (invalid for rich results) and a relative image URL | Replace with CollectionPage/ItemList and absolute image URLs | JSON-LD check | fixed (batch 1–2) |
| A-17 | P1 | SEO | `og-image.jpg` provenance unknown (1600×790, not in the inbox); FurnitureStore JSON-LD uses it as `image` | Generate OG from a real photo | File check | fixed (batch 1–2) |
| A-18 | P1 | A11y / SEO | No `<h1>` on `/collections`, `/faqs`, `/quote` | Add | audit results `h1` | fixed (batch 1–2) |
| A-19 | P1 | Visual | Hero is 70vh with a single dark overlay; the eyebrow is low-contrast gold on near-black; on the 3-column featured grid the 4th card is orphaned | Redesign the first screen and grids | Screenshots | partly fixed: split hero, 4:5 cards, even grids; refinement in batch 4 |
| A-20 | P1 | Performance | The hero uses the deprecated `priority` prop (Next 16 → `preload`); catalog photos are served from 1.5–2000 px JPEGs with no blur placeholder | Sharp masters + manifest with blur; `preload` on the hero only | Build + Lighthouse | fixed (batch 1–2) |
| A-21 | P1 | Imagery | 11 near-duplicate pairs in `public/images/rooms` (re-saves); `bed-honeycomb-…-02` is actually the champagne diamond bed (mislabelled); `bed-grey-mirror-panel-*` duplicates the grey-lacquer suite | De-duplicate in the new manifest | Asset manifest | fixed (batch 1–2) |
| A-22 | P1 | Privacy | New photos contain a person (dining set) and a face reflected in a mirror (console) | Crop before publishing | Visual check of derivatives | fixed (batch 1–2) |
| A-23 | P2 | Lint | `npm run lint` fails on gitignored `photography-inbox/_scripts` | Ignore `photography-inbox/**` in the eslint config | `npm run lint` exit 0 | fixed (batch 1–2) |
| A-24 | P2 | Content | "Shop by Room" implies e-commerce; the FAQ says there's no online ordering | Rename to "Collections" | Nav screenshot | fixed (batch 1–2) |
| A-25 | P2 | Content | The process step "book a showroom visit" and copy about a design team "working directly with the workshop" are unverified | Soften | grep | fixed (batch 1–2) |
| A-26 | P2 | Tests | No automated tests | Add focused tests for form actions, escaping, honeypot and redirects | `npm test` | partly fixed (batch 3): unit + browser form tests |
| A-27 | P2 | Motion | Need to confirm framer-motion use and reduced-motion handling | Check; CSS transitions honouring `prefers-reduced-motion` | Emulated reduced motion | fixed (batch 4): global prefers-reduced-motion rule, verified |
| A-28 | P2 | Imagery | Many showroom bed photos show third-party mattress branding (RESTONIC) and showroom clutter; acceptable, but not editorial | Prefer installed-room photos for hero and feature slots | Visual | open |
| A-29 | P3 | Video | The new video isn't usable (see the asset manifest) | Unused; request a better clip | — | wontfix (asset quality) |
| A-30 | — | External | Production env vars unreadable, so production form delivery can't be verified | Client or Qzenta to confirm `BREVO_API_KEY` and notification addresses in Vercel | — | blocked |

## 3. Fact validation

See `docs/lavishhaus-facts.md`.

## 4. Additional findings (batch 2)

| ID | Sev | Area | Finding | Remedy | Verification | Status |
|---|---|---|---|---|---|---|
| A-31 | P1 | A11y | Gold text on ivory (section eyebrows, timeline numbers, contact icons) ≈ 2.9:1, failing WCAG AA | Walnut on light, gold-muted on dark; `SectionHeading tone` prop | Visual + axe (batch 5) | fixed |
| A-32 | P1 | A11y | Footer small text at `ivory/40` ≈ 3.6:1; footer used `h3` with no `h2` | `ivory/60` (≈7:1); `h2` | Visual | fixed |
| A-33 | P1 | SEO | Organization `logo` pointed to `/logo.png`, which doesn't exist | `/images/logo.png` | JSON-LD | fixed |
| A-34 | P1 | SEO | `/craftsmanship` missing from the sitemap | Added; hidden categories excluded | sitemap.xml | fixed |
| A-35 | P2 | UX | External links (WhatsApp, Maps) didn't tell screen readers they open a new tab | sr-only "(opens in a new tab)" | Code review | fixed |
| A-36 | P2 | UX | Lightbox had no keyboard arrows and no position indicator | Arrow keys; "n / total" (aria-live) | Manual (batch 5) | fixed, to verify |
| A-37 | P2 | Imagery | The homepage hero photo shows a phone on the duvet; compact collection heroes crop portrait photos to a central band | Ask client for a clean shot; per-collection focal point | Visual | open |
| A-38 | P1 | SEO | The old `og-image.jpg` was a badly cropped logo (monogram top and "HAUS" cut off) | Regenerated 1200×630 from a real photo + logo (`scripts/build-images.mjs`) | Visual | fixed |

## 5. Additional findings (batch 4)

| ID | Sev | Area | Finding | Remedy | Verification | Status |
|---|---|---|---|---|---|---|
| A-39 | P1 | A11y | No skip link, and `<main>` couldn't take focus | "Skip to content" link as the first tab stop; `main#main tabIndex=-1` | `scripts/a11y-check.mjs`: first Tab hits the skip link, Enter moves focus to `main` | fixed |
| A-40 | P1 | A11y | Inline links on /privacy and /terms were distinguished by colour alone (axe `link-in-text-block`) | Always underlined, walnut | axe: 0 violations on 16 routes × 2 viewports | fixed |
| A-41 | P2 | Perf | Logo declared as 864×368, so it downloaded at 1080/1920w and was preloaded on every page | Intrinsic size equals display size (256/384w); no preload | curl of srcset | fixed |
| A-42 | P2 | Perf | Hero (LCP) not fetched at high priority; Clarity loaded during first render | `fetchPriority="high"` + eager; Clarity via `next/script` `lazyOnload` | Lighthouse | fixed |
| A-43 | P2 | Perf | Lab mobile LCP still ≈ 4 s (simulated) / 3.6 s (devtools-throttled). Image load is fast; the delay is render (≈ 213 KiB JS across 13 scripts, render-blocking CSS and fonts) | Candidates: trim client components (Radix navigation menu, Select), font subsetting. Not done in this pass | Lighthouse medians in the test report | open |
| A-44 | P3 | Best practice | Lighthouse best-practices 79, caused only by Clarity's third-party cookies | Client decision: consent banner or drop Clarity (F-23) | Lighthouse | open (client) |
