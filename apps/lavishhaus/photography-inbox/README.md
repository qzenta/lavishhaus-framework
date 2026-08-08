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
