# packages/cms — Payload CMS scaffold (Track 2)

Standalone Payload 3 + Next.js 16 app. Scaffolding only, per the CC handoff:
schema + admin panel wired and verified working, **no live content, no seed
data, and not wired into `apps/lavishhaus` yet**. Deliberately excludes any
Posts/blog collection — there's no content/marketing plan behind one yet.

## Collections

Mirrors the shape of `apps/lavishhaus/types/catalog.ts`:

- `categories` — Living Room, Bedroom, Dining, etc.
- `product-collections` — named to avoid colliding with Payload's own
  "collections" terminology; this is the `Collection` type (Aurelia Sofa
  Collection, Hollis Dining Table Collection, ...)
- `products` — individual pieces within a product-collection
- `projects` — completed spaces gallery
- `testimonials`
- `faqs`
- `media` — uploads, used by the above
- `users` — Payload's required auth collection for admin login

## Running it locally

```bash
npm install
cp .env.example .env   # fill in PAYLOAD_SECRET with any random string
npm run dev             # http://localhost:3012/admin
```

Uses the SQLite adapter (`@payloadcms/db-sqlite`) so it runs with zero
external services — no Postgres instance needed to develop or verify this
package. Swap for `@payloadcms/db-postgres` before any real content entry,
per the CC handoff's Payload-by-default decision (can share Postgres
infrastructure with Medusa.js later).

First run redirects to `/admin/create-first-user` — intentionally left
undone as part of this scaffold. Creating a user is real data entry, out of
scope for "scaffolding only."

## Known limitation — type generation on Node 24

`npm run generate:types` and `generate:importmap` currently fail on Node 24
with `ERR_REQUIRE_ASYNC_MODULE`, coming from Payload's CLI loader hitting a
top-level-await ESM module (`@payloadcms/richtext-lexical`) via synchronous
`require()`. This is a Payload CLI / Node 24 module-resolution
incompatibility, not a problem with this scaffold's config — `next build`
and `next dev` both work correctly and exercise the same config. Workaround
until Payload's CLI catches up: run those two scripts under Node 20 or 22
(e.g. via nvm) if generated types are needed before Payload ships a fix.

## Next steps (not done here)

- Wire this into `apps/lavishhaus` as the actual content source (replacing
  `content/*.ts`) once there's a real need for non-developer content edits
- Swap SQLite for Postgres for any real deployment
- Decide hosting for the CMS admin (separate Vercel project vs. same app)
- Add auth/access control beyond the default (currently `read: () => true`
  on public-facing collections, fine for scaffolding, not for production)
