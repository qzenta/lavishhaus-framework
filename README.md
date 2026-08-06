# Qzenta Catalog Framework

A reusable platform for premium catalogue/showroom websites, built to evolve into
full headless commerce (Medusa.js) without a frontend rewrite. First deployment:
[Lavish Haus](apps/lavishhaus) — a premium furniture showroom for MicWood Furnitures.

## Structure

```
qzenta-catalog-framework/
├── apps/
│   └── lavishhaus/       # Track 1: the live, launchable site
└── packages/             # Track 2: extraction targets as patterns repeat
    ├── ui/                # shared component library
    ├── seo/               # metadata + structured data helpers
    ├── forms/             # quote/contact form schemas + components
    ├── gallery/           # lightbox/gallery components
    ├── quote-engine/      # Brevo/CRM quote submission logic
    ├── analytics/         # GA4/Clarity wiring
    └── cms/               # Payload CMS integration (deferred — see below)
```

## Two-track approach

- **Track 1 — Ship the client site.** `apps/lavishhaus` is a complete, standalone
  Next.js app. It runs and deploys on its own (`npm install && npm run dev` inside
  the app directory). Framework-quality component discipline throughout, but no
  premature abstraction.
- **Track 2 — Harden the framework.** As a second catalogue client arrives, extract
  the patterns that actually repeat into `packages/*`. Each `packages/*/README.md`
  documents what belongs there and its current status (all empty placeholders today).

## CMS

Track 1 ships with typed local content (`apps/lavishhaus/content/*.ts`, `types/catalog.ts`)
instead of a live CMS, so launch isn't blocked on standing up Payload + Postgres. The
content shape is deliberately commerce-ready (Category → Collection → Product) so a
CMS — Payload by default, per the CC handoff — can be layered in later without changing
the frontend data contracts.

## Commerce readiness

Nothing here implements checkout, cart, or payments. The routing and content model
(`/collections/[category]/[collection]`, `Category`/`Collection`/`Product` types) are
shaped so Medusa.js can be introduced later as the backend for the same routes.
