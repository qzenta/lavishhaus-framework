# packages/ui (Track 2 — not yet extracted)

Extraction target for the shared component library currently living in
`apps/lavishhaus/components/shared` and `apps/lavishhaus/components/ui` (shadcn
primitives): Navbar, Footer, Hero, CTA, Cards, Collection Grid, Gallery,
Testimonials, FAQ, Timeline, Buttons, Badges, Feature Cards, Stats, Breadcrumbs,
Modal/Drawer, Carousel/Lightbox, Pagination.

Extract once a second catalogue client needs the same components — copy-pasting
one client's components into a second app is the signal to pull this out, not a
guess in advance.
