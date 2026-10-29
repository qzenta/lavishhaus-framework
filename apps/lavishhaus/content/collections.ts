import { catalogImage } from "@/lib/catalog-image";
import type { Collection, Product } from "@/types/catalog";

/**
 * Every piece here is one photographed by the client (see
 * docs/lavishhaus-assets.md). Descriptions state only what is visible in the
 * photos — no dimensions, lead times, guarantees or certified materials until
 * the client confirms them (docs/lavishhaus-facts.md).
 *
 * Retired slugs (Aurelia, Marchetti, Linden, ...) redirect in next.config.ts.
 */

type CollectionInput = Omit<Collection, "heroImage" | "gallery"> &
  Partial<Pick<Collection, "heroImage" | "gallery">>;

// Hero defaults to the first product photo; gallery to every product photo.
function defineCollection(input: CollectionInput): Collection {
  const productImages = input.products.flatMap((p) => p.images);
  return {
    ...input,
    heroImage: input.heroImage ?? productImages[0],
    gallery: input.gallery ?? productImages,
  };
}

const product = (p: Product): Product => p;

export const collections: Collection[] = [
  defineCollection({
    slug: "tv-wall-units",
    categorySlug: "living-room",
    name: "TV Wall Units",
    tagline: "Feature walls that bring storage, display and media together.",
    description:
      "Floating and built-in TV walls combining panelled surrounds, low media consoles, lit shelving and display cabinets, each made to suit the wall it is built for.",
    products: [
      product({
        slug: "marble-effect-fluted-tv-wall",
        name: "Marble-Effect Fluted TV Wall",
        shortDescription:
          "A marble-effect centre panel framed by grey fluting, with a floating media console and an illuminated glass display cabinet.",
        images: [
          catalogImage("tv-marble-01", "Floating TV wall with a marble-effect centre panel, grey fluted surround and lit glass display cabinet"),
          catalogImage("tv-marble-02", "Marble-effect fluted TV wall viewed from the left, showing the lit display cabinet"),
          catalogImage("tv-marble-03", "Marble-effect fluted TV wall with its low floating media console"),
        ],
      }),
      product({
        slug: "built-in-led-tv-wall",
        name: "Built-In TV Wall with Lit Shelving",
        shortDescription:
          "A full-height built-in unit with LED-lit floating shelves, a glass display cabinet and an open low-line media console.",
        images: [
          catalogImage("tv-led-01", "Built-in light grey TV wall unit with LED-lit floating shelves and a glass display cabinet"),
          catalogImage("tv-led-02", "Wide view of the built-in TV wall unit with slatted side panel and lit shelves"),
        ],
      }),
      product({
        slug: "timber-panel-tv-wall",
        name: "Timber-Panel TV Wall",
        shortDescription: "A timber feature panel above a white low-line media console.",
        images: [catalogImage("tv-timber", "Timber feature panel TV wall above a white low-line media console")],
      }),
    ],
    relatedCollectionSlugs: ["consoles-and-tables", "bespoke-commissions"],
    featured: true,
  }),
  defineCollection({
    slug: "consoles-and-tables",
    categorySlug: "living-room",
    name: "Consoles & Occasional Tables",
    tagline: "Console tables and coffee tables with a sculptural edge.",
    description:
      "Wall-mounted and freestanding consoles and coffee tables, in gloss, lacquer-look and fluted finishes.",
    products: [
      product({
        slug: "pebble-coffee-tables",
        name: "Pebble Coffee Tables",
        shortDescription: "A nesting pair of black gloss, pebble-shaped tops on fluted pedestal bases.",
        images: [catalogImage("coffee-tables-pebble", "Pair of black gloss pebble-shaped coffee tables on fluted pedestal bases")],
      }),
      product({
        slug: "floating-fluted-console",
        name: "Floating Fluted Console",
        shortDescription: "A wall-mounted black gloss console with a curved, fluted front.",
        images: [catalogImage("console-floating-fluted", "Wall-mounted black gloss console with a curved fluted front")],
      }),
      product({
        slug: "two-drawer-console-brass-frame",
        name: "Two-Drawer Console with Brass-Tone Frame",
        shortDescription: "A white two-drawer console on a slim brass-tone frame.",
        images: [catalogImage("console-brass-drawers", "White two-drawer console on a slim brass-tone frame beneath a round mirror")],
      }),
      product({
        slug: "white-console-table",
        name: "White Console Table",
        shortDescription: "A clean-lined white console table with an open base.",
        images: [catalogImage("console-white-sculpture", "Clean-lined white console table styled with two sculptures")],
      }),
    ],
    relatedCollectionSlugs: ["tv-wall-units", "sofas-and-seating"],
  }),
  defineCollection({
    slug: "sofas-and-seating",
    categorySlug: "living-room",
    name: "Sofas & Seating",
    tagline: "Classic upholstered seating.",
    description:
      "Deep-buttoned and upholstered seating. Ask us about covers, colours and sizes for your room.",
    products: [
      product({
        slug: "chesterfield-sofa",
        name: "Chesterfield Sofa",
        shortDescription: "A deep-buttoned Chesterfield sofa with rolled arms, in brown upholstery.",
        images: [catalogImage("sofa-chesterfield", "Deep-buttoned brown Chesterfield sofa with rolled arms")],
      }),
    ],
    relatedCollectionSlugs: ["consoles-and-tables", "tv-wall-units"],
  }),
  defineCollection({
    slug: "upholstered-beds",
    categorySlug: "bedroom",
    name: "Upholstered Beds",
    tagline: "Statement headboards in a range of styles.",
    description:
      "Beds defined by their headboards — faceted, diamond-tufted, channelled and panelled — in a range of colours and coverings.",
    heroImage: catalogImage("bed-navy-channel-wall", "Navy upholstered bed against a full-width ivory channel-tufted wall panel"),
    products: [
      product({
        slug: "navy-bed-channel-wall-panel",
        name: "Navy Bed with Channel Wall Panel",
        shortDescription:
          "A navy upholstered bed set against a full-width, horizontally channel-tufted wall panel.",
        images: [catalogImage("bed-navy-channel-wall", "Navy upholstered bed against a full-width ivory channel-tufted wall panel")],
      }),
      product({
        slug: "faceted-panel-headboard-bed",
        name: "Faceted Panel Headboard Bed",
        shortDescription:
          "An oversized headboard of irregular faceted panels in soft beige, shown with white bedside pedestals.",
        images: [
          catalogImage("bed-faceted-02", "Bed with an oversized beige faceted-panel headboard and white bedside pedestals"),
          catalogImage("bed-faceted-03", "Faceted-panel headboard bed seen from the foot, with pendant lights either side"),
        ],
      }),
      product({
        slug: "grey-channel-bed-mirror-panels",
        name: "Grey Channel Bed with Mirror Panels",
        shortDescription:
          "A vertical channel-tufted grey headboard between mirrored slat panels, with a matching bolster bench.",
        images: [catalogImage("bed-grey-channel-mirror", "Grey channel-tufted headboard between mirrored slat panels, with a bolster-cushion bench at the foot")],
      }),
      product({
        slug: "champagne-diamond-tufted-bed",
        name: "Champagne Diamond-Tufted Bed",
        shortDescription: "A tall diamond-tufted headboard in champagne, framed in a slim metallic trim.",
        images: [catalogImage("bed-champagne-diamond", "Tall champagne diamond-tufted headboard framed in slim metallic trim")],
      }),
      product({
        slug: "cognac-diamond-panel-bed",
        name: "Cognac Diamond-Panel Bed",
        shortDescription: "A wall-width headboard of large diamond panels in cognac, with a matching base.",
        images: [catalogImage("bed-cognac-panel", "Cognac diamond-panel headboard spanning the wall, with a matching upholstered base")],
      }),
      product({
        slug: "green-chevron-headboard-bed",
        name: "Green Chevron Headboard Bed",
        shortDescription: "A deep green headboard with chevron channelling and a matching base.",
        images: [catalogImage("bed-green-chevron", "Deep green chevron-channelled headboard bed with matching base")],
      }),
      product({
        slug: "honeycomb-headboard-timber-frame",
        name: "Honeycomb Headboard in Timber Frame",
        shortDescription: "A honeycomb-tufted headboard set in an exposed timber frame.",
        images: [catalogImage("bed-honeycomb-timber", "Taupe honeycomb-tufted headboard in an exposed timber frame beside a timber bedside chest")],
      }),
      product({
        slug: "grey-diamond-tufted-bed",
        name: "Grey Diamond-Tufted Bed",
        shortDescription: "A grey diamond-tufted headboard with a matching upholstered base.",
        images: [catalogImage("bed-grey-diamond-tufted", "Grey diamond-tufted headboard bed against patterned wallpaper")],
      }),
      product({
        slug: "grey-square-panel-bed",
        name: "Grey Square-Panel Bed",
        shortDescription: "A tall headboard of square upholstered panels in pale grey.",
        images: [catalogImage("bed-grey-square-panel", "Tall pale grey square-panel upholstered headboard bed")],
      }),
    ],
    relatedCollectionSlugs: ["bedroom-suites", "bespoke-commissions"],
    featured: true,
  }),
  defineCollection({
    slug: "bedroom-suites",
    categorySlug: "bedroom",
    name: "Bedroom Suites",
    tagline: "Beds with coordinated chests, dressers and pedestals.",
    description:
      "Headboards paired with matching chests of drawers, dressers and bedside pedestals for a coordinated room.",
    products: [
      product({
        slug: "grey-gloss-suite-gold-inlay",
        name: "Grey Gloss Suite with Gold-Tone Inlay",
        shortDescription:
          "A channel-tufted headboard between mirrored slats, with a grey gloss chest and pedestals detailed in gold-tone stripes.",
        images: [
          catalogImage("suite-grey-lacquer-01", "Grey gloss bedroom suite with channel-tufted headboard, mirrored slats and a gold-striped chest"),
          catalogImage("suite-grey-lacquer-02", "Wide view of the grey gloss suite with the gold-striped chest at the foot of the bed"),
          catalogImage("suite-grey-lacquer-03", "Channel-tufted headboard and mirrored slat panels of the grey gloss suite"),
        ],
      }),
      product({
        slug: "arch-headboard-bed-six-drawer-dresser",
        name: "Arch Headboard Bed & Six-Drawer Dresser",
        shortDescription: "A black arched headboard paired with a white six-drawer dresser.",
        images: [catalogImage("bed-arch-dresser", "Black arched headboard bed behind a white six-drawer dresser")],
      }),
    ],
    relatedCollectionSlugs: ["upholstered-beds"],
  }),
  defineCollection({
    slug: "dining-sets",
    categorySlug: "dining",
    name: "Dining Tables & Chairs",
    tagline: "Tables, chairs and benches for the dining room.",
    description:
      "Dining tables, upholstered chairs and benches. Sizes, seat counts and coverings are discussed with your quote.",
    products: [
      product({
        slug: "oval-dining-set-fluted-base",
        name: "Oval Dining Set with Fluted Base",
        shortDescription:
          "A black gloss oval table on a fluted pedestal, aubergine upholstered chairs with nailhead trim and a matching bench.",
        images: [catalogImage("dining-black-fluted", "Black gloss oval dining table on a fluted base with aubergine upholstered chairs and bench")],
      }),
      product({
        slug: "eight-seater-table-rose-gold-legs",
        name: "Eight-Seater Table with Rose-Gold Legs",
        shortDescription: "A long rectangular table on rose-gold-tone legs, shown with eight upholstered chairs.",
        images: [catalogImage("dining-rose-gold", "Long dining table on rose-gold-tone legs with eight upholstered chairs")],
      }),
      product({
        slug: "upholstered-dining-chairs",
        name: "Upholstered Dining Chairs",
        shortDescription:
          "Beige upholstered chairs with button-tufted or plain backs on dark timber legs, photographed in the workshop.",
        images: [catalogImage("dining-chairs-tufted", "Beige upholstered dining chairs with button-tufted and plain backs in the workshop")],
      }),
    ],
    relatedCollectionSlugs: ["consoles-and-tables"],
    featured: true,
  }),
  defineCollection({
    slug: "kitchen-islands",
    categorySlug: "kitchen",
    name: "Kitchen Islands & Cabinetry",
    tagline: "Islands and cabinetry for the heart of the home.",
    description: "Kitchen islands and cabinetry, designed and fitted to your space.",
    products: [
      product({
        slug: "fluted-kitchen-island",
        name: "Fluted Kitchen Island",
        shortDescription: "A kitchen island with a vertically fluted front and stone-look top, with taupe cabinetry.",
        images: [catalogImage("kitchen-island-fluted", "Kitchen island with a fluted front and stone-look top beside taupe cabinetry")],
      }),
    ],
    relatedCollectionSlugs: ["bespoke-commissions"],
  }),
  defineCollection({
    slug: "desks",
    categorySlug: "office",
    name: "Desks",
    tagline: "Desks for the home office and study.",
    description: "Desks and storage for focused work, made to suit your room.",
    products: [
      product({
        slug: "white-desk-drawer-pedestal",
        name: "White Desk with Drawer Pedestal",
        shortDescription: "A white desk with a built-in drawer pedestal.",
        images: [catalogImage("desk-white-pedestal", "White desk with a built-in four-drawer pedestal")],
      }),
    ],
    relatedCollectionSlugs: ["bespoke-commissions"],
  }),
  defineCollection({
    slug: "bespoke-commissions",
    categorySlug: "custom-furniture",
    name: "Bespoke Commissions",
    tagline: "Designed around your space.",
    description:
      "Built-in wall units, panelled headboard walls, kitchen islands and one-off pieces, designed with you and made by MicWood Furnitures. Share a sketch, a photo or your measurements and we'll take it from there.",
    heroImage: catalogImage("tv-led-02", "Built-in TV wall unit with slatted side panel and lit floating shelves"),
    gallery: [
      catalogImage("tv-led-02", "Built-in TV wall unit with slatted side panel and lit floating shelves"),
      catalogImage("bed-navy-channel-wall", "Full-width channel-tufted wall panel behind a navy upholstered bed"),
      catalogImage("kitchen-island-fluted", "Kitchen island with a fluted front and stone-look top"),
      catalogImage("console-floating-fluted", "Wall-mounted black gloss console with a curved fluted front"),
      catalogImage("bed-cognac-panel", "Wall-width cognac diamond-panel headboard"),
    ],
    products: [],
    relatedCollectionSlugs: ["tv-wall-units", "upholstered-beds"],
    featured: true,
  }),
];

export function getCollectionsByCategory(categorySlug: string) {
  return collections.filter((c) => c.categorySlug === categorySlug);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedCollections() {
  return collections.filter((c) => c.featured);
}

export function getRelatedCollections(collection: Collection) {
  return collection.relatedCollectionSlugs
    .map((slug) => getCollectionBySlug(slug))
    .filter((c): c is Collection => Boolean(c));
}
