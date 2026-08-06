# packages/cms (Track 2 — deferred by design, see CC handoff)

The CC implementation handoff (`Qzenta_Framework_CC_Handoff.md`) defaults to
Payload CMS for this framework, with Sanity as the fallback if time-to-launch
outweighs owning the CMS infrastructure. Track 1 deliberately ships without a
live CMS — content lives as typed local data in
`apps/lavishhaus/content/*.ts` against the shapes in
`apps/lavishhaus/types/catalog.ts` (Category → Collection → Product), so a CMS
can be layered in later without changing the frontend's data contracts.

Implement this package when editorial workflow (non-developer content updates)
becomes an actual requirement — not before.
