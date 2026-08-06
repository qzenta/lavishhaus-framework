# Qzenta Commerce Framework v1 — CC Implementation Handoff
**From:** Claude Chat (architecture review pass) — reviewing a ChatGPT-authored master prompt
**Routing:** CC for implementation, per Cross-Track Rule
**Decision status:** Daniel has deliberately chosen to build this as a reusable Qzenta framework, first deployed for Lavish Haus — not a scoped-down single-client site. This handoff keeps the original master prompt's technical content intact and adds the sequencing and open-decision fixes needed before CC starts.

---

## 1. What changes from the original master prompt

The original prompt (attached separately, full detail preserved — use it as the technical source of truth for design system, component inventory, SEO strategy, accessibility targets, etc.) is sound on substance. Two structural fixes are needed before CC executes it:

### 1.1 Two-track sequencing (the main fix)
The original prompt implies a single linear gate: IA → wireframes → design system → component inventory → content model → SEO strategy → technical architecture → **only then** implementation begins. Taken literally, that blocks Lavish Haus's actual site launch behind a full platform planning phase.

**Run two tracks instead:**
- **Track 1 — Ship Lavish Haus.** Build and launch the real lavishhaus.co.za deployment on the framework's first-cut components, scoped to what's actually needed for a working, professional catalogue/showroom site (homepage, about, collections, product pages, gallery, quote request, contact, WhatsApp, SEO basics, secure hosting). This is the client-facing deliverable and should move at the pace a paying client expects.
- **Track 2 — Harden the framework.** Extraction into `packages/ui`, `packages/quote-engine`, etc., component generalization, and the full monorepo structure happen iteratively, in parallel or just behind Track 1 — not as a blocking prerequisite. Don't let framework purity delay the client's launch.

CC should build Track 1 with framework discipline in mind (clean, reusable components, no one-off hacks) but should not wait on a fully "approved" design system document before writing code.

### 1.2 CMS decision — resolved, not open
The original prompt leaves CMS choice as an open research task ("recommend the best CMS... likely Sanity, Payload, or Strapi... justify choice"). Resolved here to avoid CC stalling on it:

**Default: Payload CMS.** Self-hosted, TypeScript-native, fits the existing Next.js/Vercel stack, no per-seat/usage-based SaaS pricing, can share Postgres infrastructure with Medusa.js later. Consistent with the pattern already set by choosing Medusa.js over Shopify — Qzenta avoids recurring third-party platform fees where a self-hosted option is viable.

**Fallback: Sanity.** If time-to-launch for Lavish Haus outweighs the value of owning the CMS infrastructure, Sanity ships faster with a generous free tier and less ops overhead. CC should default to Payload unless a specific timeline constraint says otherwise — this is Daniel's call to override, not an open question to re-litigate each session.

---

## 2. Everything else from the original master prompt stands

Preserve as-is from the attached master prompt:
- Tech stack: Next.js (App Router), React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, React Hook Form + Zod, Vercel, Google Fonts (Playfair Display / Inter)
- Colour palette (Charcoal, Warm Black, Stone, Ivory, Sand, Walnut, Gold accent) and design language (large imagery, generous spacing, editorial typography, restrained motion)
- Full site structure (Home, About, Collections by category, Custom Furniture, Projects/Gallery, Showroom, Blog, FAQs, Request a Quote, Contact, legal pages) — Track 1 can prioritize a subset (Home, About, Collections, Product pages, Contact, Request a Quote) and treat Blog/FAQs as Track 2 additions if timeline is tight
- Quote workflow: Collection → Request Quote → Form → Brevo → future n8n integration. No payment, no checkout, no cart — this matches the client's confirmed current requirement
- Commerce-readiness discipline: data model (Collections/Products/Categories/Customers/Orders/Inventory) shaped so Medusa.js can be added later without a frontend rewrite
- SEO, accessibility (WCAG AA), and performance targets as stated, understood as targets to work toward rather than hard blockers on every commit
- Monorepo structure (`qzenta-catalog-framework/apps/lavishhaus`, `packages/ui`, `seo`, `forms`, `gallery`, `quote-engine`, `analytics`, `cms`) as the eventual Track 2 shape

---

## 3. Business-protection items — parallel to CC work, not blocking it

These don't need to hold up CC starting, but need closing out soon:
- Get the R5,650 quote confirmed in writing (WhatsApp/email is enough) — the client's approval so far is verbal
- Raise the 40% deposit invoice per the quote's own payment terms before significant billable hours accumulate
- Fill in the Sikatrix banking details still marked as a placeholder on the quote

---

## 4. Summary for CC

Build Lavish Haus as a real, launchable catalogue/showroom site first, with framework-quality component discipline throughout. Treat the monorepo extraction and full design-system documentation as an ongoing parallel investment, not a gate. Default to Payload CMS. Everything else in the original master prompt is approved technical direction.
