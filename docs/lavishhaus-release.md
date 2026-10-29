# Lavish Haus — Release notes and deployment

**Status: ready for review. Not deployed.** The work is local commits on `lavishhaus-redesign` and has not been pushed, merged or deployed. DNS, Vercel settings and env values were not touched.

## What changes for visitors

- **Catalog rebuilt around real client photography.** Nine collections of photographed pieces replace the placeholder catalog (Aurelia, Marchetti, Linden, …). Descriptions cover only what is visible in the photos. The sofa gallery no longer shows TV consoles.
- **Unverified claims removed or softened:** FSC, full-grain leather, 15-year guarantee, response and lead times, opening hours, stats, social accounts. The fictional projects and testimonials are gone. The AI-generated hero and picsum placeholders are gone.
- **New editorial design:** split hero, 4:5 cards, per-piece galleries with a keyboard lightbox, "Request a Quote" and WhatsApp per piece, plus a new OG card from a real photo.
- **Forms are honest.** If email delivery fails or isn't configured, visitors see WhatsApp, phone and email options instead of a false "request received". Email HTML is escaped, there's a honeypot and a minimum fill time, and submitted details no longer appear in logs.
- **Accessibility:** skip link, AA contrast, one h1 per page, reduced motion respected (axe: 0 violations).
- **Privacy policy** now names Brevo and Microsoft Clarity.

Old URLs keep working: 10 retired collection URLs permanently redirect (308) to the closest new collection. `/projects` temporarily redirects (307) to Bespoke Commissions, so it can return once real projects are supplied.

## Commits (oldest first)

| Commit | Scope |
|---|---|
| `460eb68` | Baseline audit, fact register, asset manifest, audit tooling |
| `c9568f8` | Catalog rebuild and trust content (batches 1–2) |
| `0c0002b` | Forms (batch 3) |
| `69a116e` | Accessibility, reduced motion, privacy, performance (batch 4) |
| *(final docs commit)* | Test report, release notes, asset manifest |

## Before deploying (owner / authorised person)

1. **Review** the branch locally (`npm run build && npm run start`, from `apps/lavishhaus`) or on a Vercel preview, if the owner pushes the branch.
2. **Confirm env vars in Vercel → Production** (names only; values aren't in this repo):
   - `BREVO_API_KEY`: required. Without it, forms now show the fallback instead of a false success, which is safer, but no enquiries reach the inbox.
   - `QUOTE_NOTIFY_EMAIL`, `CONTACT_NOTIFY_EMAIL`: optional; default to `sales@` / `info@lavishhaus.co.za`.
   - `BREVO_API_URL` must **not** be set in production (it exists only for local mocks).
   - The sender `no-reply@lavishhaus.co.za` must be a verified sender in Brevo (unchanged from before).
3. **Answer the open client questions** in `docs/lavishhaus-facts.md` (showroom hours and status, guarantee, materials, social accounts, outdoor range, consent for the personalised armchair photo, Clarity consent banner). Copy stays softened until then.
4. **Smoke test on the preview:** submit one quote with a test address the owner controls, confirm it arrives, then check `/`, a collection page, `/showroom`, `/quote` and the WhatsApp button on a phone.

## Deploying

Merge `lavishhaus-redesign` → `main` (PR or fast-forward) by the authorised person. Vercel project `lavishhaus` auto-deploys `main` to production for both domains. No build settings change: the app is still `apps/lavishhaus`, Next 16 build, and there is no new env var to add.

## Rollback

- **Instant:** in Vercel → Deployments, promote the previous production deployment `dpl_ETwkFnsgnQKQNSQJV6ud8Zb3WxQZ` (commit `c68b753`), or use "Instant Rollback". This doesn't need a rebuild.
- **In git:** `git revert` the merge commit on `main` (or the four commits above) and push. Vercel redeploys.
- Content risk on rollback: the old placeholder claims, fictional projects and AI hero come back.

## Known open items (not blockers)

- A-43: mobile lab LCP ≈ 4 s (target 2.5 s). Next step is to trim client-side JS (Radix navigation and select).
- A-44 / F-23: Clarity sets third-party cookies without a consent banner. This is a client or legal decision.
- A-37: the homepage hero photo shows a phone on the duvet; a clean reshot is requested.
- A-30: production delivery can't be verified from here.
- Missing photography slots: `docs/lavishhaus-assets.md` (zebra-hide ottoman, outdoor, showroom exterior, more sofas/kitchen/office, projects, team).
