# Photography inbox

Local drop folder for real Lavish Haus product/showroom photography, staged
here before being optimized and moved into `public/` (or wherever the
established image-handling pattern points once real images replace
`lib/placeholder-image.ts` calls).

This folder is gitignored except for this README — raw, unoptimized photos
don't belong in the repo.

## Where to drop files

Match the folder name to the `slug` in the corresponding `content/*.ts`
file. One or more images per folder is fine; if a piece has multiple
angles, drop them all in the same folder and they'll become the gallery.

- `categories/<category-slug>/` → hero image for that category
  (`content/categories.ts` — living-room, bedroom, dining, office, outdoor,
  custom-furniture)
- `collections/<collection-slug>/` → hero + gallery images for that
  collection, and per-product shots if you have them (name the file after
  the product slug from `content/collections.ts`, e.g.
  `aurelia-3-seater.jpg`, so it's unambiguous which product it belongs to)
- `projects/<project-slug>/` → cover + gallery images for that project
  (`content/projects.ts`)

If a photo doesn't clearly belong to any existing slug (a new piece not yet
in the catalog, an ambiguous angle, etc.), drop it in the folder that's the
closest match and note the ambiguity — don't force a guess into a
different folder.

## Session log — 7 Aug 2026: first real photo batch

27 files dropped unnamed into the inbox root (a mix of WhatsApp exports and
short random names). None matched any existing `content/*.ts` collection —
these are real showroom pieces (specific headboards, a chesterfield sofa, a
kitchen island, a rose-gold dining table, etc.), not the invented
placeholder products (Aurelia, Marchetti, Hollis, ...). Renamed
descriptively and sorted into `categories/<room-type>/` only — did **not**
force them into `collections/<slug>/`, since those slugs describe
fictional products that don't correspond to anything here.

- **23 photos** organized into `categories/` (living-room: 7, bedroom: 12,
  dining: 1, office: 1, custom-furniture: 2)
- **3 duplicates removed**: one exact byte-for-byte duplicate (TV console
  shot), one near-identical re-save (zebra-hide ottoman), one near-duplicate
  with a decorative frame overlay (kitchen island — kept the clean version)
- **1 file quarantined**, not real photography: a CGI-rendered bedroom
  (`_excluded-not-real-photos/`) — looks like a Pinterest/inspiration
  reference, not an actual Lavish Haus piece. Review and delete or repurpose
  as inspiration, but it's not product photography.
- **1 video left untouched** in the inbox root
  (`WhatsApp Video 2026-08-07 at 10.00.37.mp4`) — out of scope for this pass.

Some groups are multiple angles of the same physical piece (e.g. three
"tv-wall-console-marble-grey-0N" shots, three "bed-grey-mirror-panel-
headboard-0N" shots) — kept as a small gallery per piece rather than
picking one, since the angles genuinely differ. Worth a second look if you
want to trim further.

**Not yet done:** wiring these into the actual site (`content/*.ts`,
`lib/placeholder-image.ts`) — that requires deciding what these real pieces
are actually called/priced, since the current catalog is entirely
placeholder fiction. Also not yet done: photo enhancement (see chat).
