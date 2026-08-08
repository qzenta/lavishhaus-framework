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
placeholder fiction.

## Correction log — 7 Aug 2026 (same day, follow-up pass)

The initial naming pass above had real errors: several files were viewed as
part of a batch of parallel reads, and the content I described didn't
always match the file I was describing it for. Re-verified every file
individually (one file per check, no batching) and fixed 6 mislabeled
files:

- What was named `bed-champagne-diamond-headboard-gold-trim.jpeg` was
  actually the TV console shot → moved to
  `living-room/tv-wall-console-marble-grey-04.jpeg`
- What was named `bed-grey-mirror-panel-headboard-01.jpeg` was actually the
  champagne/diamond headboard bed → renamed to
  `bed-champagne-diamond-headboard-gold-trim.jpeg` (now correct)
- What was named `bed-grey-mirror-panel-headboard-02-wide.jpeg` was
  actually a different bed (grey velvet diamond-tufted, feather-pattern
  wallpaper) → renamed to
  `bed-grey-velvet-diamond-tufted-feather-wallpaper.jpeg`
- What was named `bed-grey-velvet-diamond-tufted-oval-nightstands.jpeg`
  was actually a different bed (black velvet arch-top headboard, white
  6-drawer dresser) → renamed to
  `bed-black-velvet-arch-headboard-white-dresser.jpeg`
- What was named `tv-wall-console-marble-grey-02.jpeg` was actually a bed
  (the mirror-panel "Mike Rosey" headboard, dresser-box-prominent angle) →
  moved to `bedroom/bed-grey-mirror-panel-headboard-02-wide.jpeg`

**Data loss: the zebra-hide ottoman photo was deleted by mistake and is
not recoverable from this repo.** During the original pass, the file
named `y.jpeg` was misidentified as the zebra ottoman (it's actually a
duplicate of the Mike Rosey bed shot). A second file, `z.jpeg`, genuinely
was the zebra ottoman — but because `y.jpeg` was wrongly believed to show
the same thing, `z.jpeg` was deleted as a "duplicate" during the original
cleanup. There is no copy of the zebra-hide ottoman photo left anywhere in
this repo. If you still have it (likely — it probably came from a phone or
WhatsApp originally), it needs to be re-dropped into
`categories/custom-furniture/`.

Final count after corrections: **22 real photos** (living-room: 8,
bedroom: 11, dining: 1, office: 1, custom-furniture: 1 — down from 2 since
the zebra ottoman is gone).

## Enhancement pass — 7 Aug 2026

Ran a free, local enhancement pass with `sharp` (already a dependency via
`packages/cms`) on all 22 corrected photos: auto-orient, a slight
saturation/brightness lift (+5%/+2%), and gentle sharpening (sigma 0.6),
re-encoded as quality-92 mozjpeg. Output lives in parallel at
`enhanced/categories/...`, originals untouched in `categories/...`. An
earlier attempt using CLAHE (adaptive local contrast) produced a badly
corrupted, blocky result on compressed phone photos — dropped that
approach entirely in favor of this gentler one.

Not run: AI-based upscale/enhance — the image-generation account has 1
credit, not enough for a batch of 22.
