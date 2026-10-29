# Lavish Haus — Asset manifest

Last updated: 2026-10-29 (branch `lavishhaus-redesign`).

Originals are never modified. `apps/lavishhaus/photography-inbox/` is gitignored
(raw staging); web derivatives are committed under
`apps/lavishhaus/public/images/catalog/`. Status values: **used**, **held**
(needs client decision), **excluded** (not usable as product photography),
**duplicate**, **unused**.

## Pipeline

1. Client drops files in `photography-inbox/_unsorted/` (left untouched).
2. Each file is viewed individually and copied (byte-identical, `cp -p`) into
   `photography-inbox/categories/<category-slug>/<descriptive-name>.jpeg`.
3. `apps/lavishhaus/scripts/build-images.mjs` (sharp) reads the originals and
   writes one web master per photo to `public/images/catalog/<category>/`:
   auto-orient, metadata stripped (no EXIF/GPS), long edge ≤ 2000 px,
   mozjpeg q80, optional crop recorded in the script. It also writes
   `lib/image-manifest.json` (intrinsic width/height + 16 px blur placeholder).
4. `next/image` serves responsive AVIF/WebP widths from that master
   (`images.formats` in `next.config.ts`), lazy below the fold, `priority`
   only on the hero.

## October 2026 batch — `_unsorted/` (12 JPEGs + 1 MP4)

| Original (`_unsorted/`) | Content (verified by viewing) | Destination (inbox) | Catalog association | Status |
|---|---|---|---|---|
| `WhatsApp Image 2026-10-29 at 15.24.20.jpeg` | Grey vertical channel-tufted headboard with mirrored side panels, bolster bench, grey nightstands. Showroom floor; a ladder is visible at the right. | `categories/bedroom/bed-grey-channel-headboard-mirror-panels-bolster-bench.jpeg` | bedroom / upholstered-beds | used (cropped to remove ladder) |
| `… 15.24.21 (1).jpeg` | Navy upholstered bed in front of a full-width ivory horizontal-channel wall panel and black fluted wall; installed in a home. A bucket and mat are visible at the edges. | `categories/bedroom/bed-navy-upholstered-channel-wall-panel-installed.jpeg` | bedroom / upholstered-beds; custom-furniture / bespoke-commissions | used (cropped) |
| `… 15.24.21.jpeg` | Three beige velvet dining chairs: two button-tufted backs and one plain back, dark timber legs. Workshop floor. | `categories/dining/dining-chairs-beige-velvet-button-back-workshop.jpeg` | dining / dining-sets; craftsmanship page | used |
| `… 15.24.21 (2).jpeg` | Black gloss oval dining table with fluted base, aubergine velvet chairs with nailhead trim, matching bench; installed in a home. A person is partly visible at the left edge. | `categories/dining/dining-set-black-fluted-table-aubergine-velvet-bench.jpeg` | dining / dining-sets | used (cropped to remove the person) |
| `… 15.24.22.jpeg` | Pair of black gloss pebble-shaped coffee tables on fluted pedestals; installed. | `categories/living-room/coffee-tables-black-fluted-pebble-pair.jpeg` | living-room / consoles-and-tables | used |
| `… 15.24.22 (1).jpeg` | Black floating fluted wall console with two round mirrors above; same home as the dining set. **A person's face is reflected in the left mirror.** | `categories/living-room/console-floating-black-fluted-wall-mounted.jpeg` | living-room / consoles-and-tables | used (cropped below the mirrors) |
| `… 15.24.22 (2).jpeg` | **Phone screenshot** of a styled studio photo of fluted coffee tables (gallery UI chrome visible). Not Lavish Haus photography; it looks like an inspiration reference. | `_excluded-not-real-photos/NOT-OWN-PHOTO-phone-screenshot-coffee-tables-reference.jpeg` | — | excluded |
| `… 15.24.23.jpeg` | White lacquer two-drawer console with brass frame and round mirror. | — | — | duplicate (byte-identical to `categories/living-room/console-table-round-mirror-brass-legs.jpeg`) |
| `… 15.24.23 (1).jpeg` | Built-in TV wall unit, light grey, LED-lit floating shelves, glass display cabinet; installed. A TV broadcast is on screen. | `categories/living-room/tv-wall-unit-built-in-led-shelving-01.jpeg` | living-room / tv-wall-units; custom-furniture / bespoke-commissions | used |
| `… 15.24.23 (2).jpeg` | Same TV wall unit, wider view with slatted side panel. | `categories/living-room/tv-wall-unit-built-in-led-shelving-02-wide.jpeg` | living-room / tv-wall-units | used |
| `… 15.24.24.jpeg` | Honeycomb-tufted headboard in a timber frame, timber nightstand. | — | — | duplicate (byte-identical to `categories/bedroom/bed-honeycomb-tufted-headboard-wood-frame.jpeg`) |
| `… 15.24.24 (1).jpeg` | Oxblood leather Chesterfield armchair with the name "KHUNE" embroidered on the back. | `_held-pending-client/armchair-chesterfield-oxblood-personalised-name.jpeg` | — | **held**: the personalised name identifies a customer (possibly a public figure). Publishing it would imply an endorsement, so it needs written client and customer consent first. |
| `WhatsApp Video 2026-10-29 at 15.24.21.mp4` | 87.6 s, 478×850, H.264 with phone audio. Handheld walkaround of a cognac leather hexagonal-panel headboard bed; the mattress and pillows are still in plastic wrapping. | — | — | **unused**: too low-resolution for a hero or product film, unsteady, and shows unfinished staging. No poster or transcode made. Reconsider if a stable ≥1080p clip arrives. |

## Earlier batches (Aug 2026)

These were already in `public/images/rooms/` (sources: `photography-inbox/categories/`
for 22, and the 9 Aug commit `ae120d9` for 12 more). Re-checked against their
current site associations:

| File | Content | Previous association | Problem | New association |
|---|---|---|---|---|
| `tv-wall-console-marble-grey-01…06` | Marble-grey fluted TV wall console | **Aurelia Sofa Collection gallery** | **Mismatch**: TV consoles shown in a sofa gallery | living-room / tv-wall-units |
| `tv-wall-console-wood-marshall-speaker` | Timber TV console | Marchetti Coffee Table gallery | Mismatch: a TV console, not a coffee table | living-room / tv-wall-units |
| `chesterfield-sofa-brown-leather` | Brown leather Chesterfield sofa | Aurelia hero ("low, architectural profile, feather-wrapped") | Copy described a different sofa | living-room / sofas-and-seating |
| `console-table-elephant-sculptures`, `console-table-round-mirror-brass-legs` | Console tables | Marchetti **Coffee Table** | Console tables, not coffee tables | living-room / consoles-and-tables |
| `bed-black-velvet-arch-headboard-white-dresser(-02)` | Black arch headboard + white dresser | Linden (faceted headboard) gallery | A different bed in another bed's gallery | bedroom / upholstered-beds (own product) |
| `bed-grey-velvet-diamond-tufted-feather-wallpaper` | Bedroom | **Solano Outdoor Lounge** hero and gallery | **Mismatch**: a bedroom shown as outdoor furniture | bedroom / upholstered-beds |
| `bed-cognac-…`, `bed-grey-square-…`, `bed-green-…`, `bed-honeycomb-…` | Individual beds | Bespoke Commissions gallery; Porter **Nightstand** hero | Beds presented as nightstands | bedroom / upholstered-beds (own products) |
| `console-table-round-mirror-brass-legs` | Console table | Outdoor category hero | Mismatch | living-room |
| `hero-living-room.png` | **AI-generated** (perceptual hash identical to `photography-inbox/Gemini_Generated_Image_dtry72dtry72dtry.png`; commit `e7cde4f` "AI-generated lifestyle image") | Homepage hero, alt text describing a real room | Shows an AI image as if it were real | **removed from use**; hero now uses a real client photo |
| `Gemini_Generated_Image_8hjj…`, `…r7o0…` | AI-generated | none | — | excluded |
| `_excluded-not-real-photos/NOT-REAL-PHOTO-cgi-render-bedroom-reference.jpeg` | CGI render | none | — | excluded |
| `WhatsApp Video 2026-08-07 at 10.00.37.mp4` | Not reviewed in Aug | none | — | unused (not reviewed this pass) |

The final per-file mapping lives in `apps/lavishhaus/content/collections.ts` and
`scripts/build-images.mjs`.

## Slots still missing photography

| Slot | Why | What's needed |
|---|---|---|
| Zebra-hide ottoman | Original deleted by mistake on 7 Aug (see the inbox README) | Re-supply the photo → `_unsorted/` |
| Outdoor category (hero + any collection) | No outdoor photography exists. The previous hero was a bedroom photo | Outdoor pieces, if Lavish Haus makes them; otherwise confirm the category should be dropped |
| Showroom page hero / interior | Used a TV console shot and a picsum placeholder; no photo of the showroom itself | Showroom exterior and interior, once its status is confirmed |
| Sofas & seating | Only one sofa photo (Chesterfield); armchair held for consent | More sofas, more angles |
| Kitchen | One photo (fluted taupe island) | More angles or projects |
| Office | One photo (white lacquer desk) | More angles |
| Projects / completed installations | Previous projects (Houghton, Sandton, Camps Bay) were fictional with picsum images and are removed | Client-confirmed project names, locations, permission and photos |
| Brand / about imagery, team, workshop | Only one workshop photo (dining chairs) | Workshop and team photos |
| Open Graph image | `public/og-image.jpg` provenance unknown (see audit A-17) | A real photo; regenerated from the hero once confirmed |
| Hero / brand film | No usable video (see above) | Stable ≥1080p landscape clip of the showroom or a finished piece |
