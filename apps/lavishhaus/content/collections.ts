import { placeholderImage } from "@/lib/placeholder-image";
import type { Collection, Finish, Material, Product } from "@/types/catalog";

const finishOptions: Record<string, Finish[]> = {
  timber: [
    { name: "Natural Walnut", swatch: "#6b4531" },
    { name: "Smoked Oak", swatch: "#4a3b2f" },
    { name: "Whitewash Ash", swatch: "#d9cfba" },
  ],
  upholstery: [
    { name: "Ivory Boucle", swatch: "#efe6d4" },
    { name: "Warm Stone Linen", swatch: "#a49a89" },
    { name: "Charcoal Performance Weave", swatch: "#2a2724" },
  ],
  metal: [
    { name: "Brushed Brass", swatch: "#b08d57" },
    { name: "Matte Black Steel", swatch: "#16130f" },
  ],
};

const materialLibrary: Record<string, Material> = {
  solidWalnut: {
    name: "Solid Walnut",
    description: "Kiln-dried American black walnut, hand-selected for grain consistency.",
  },
  fsc: {
    name: "FSC-Certified Timber",
    description: "Responsibly sourced hardwood from certified sustainable forests.",
  },
  fullGrainLeather: {
    name: "Full-Grain Leather",
    description: "Vegetable-tanned leather that develops a natural patina with age.",
  },
  performanceFabric: {
    name: "Performance Weave Fabric",
    description: "Stain-resistant, family-friendly upholstery without sacrificing hand-feel.",
  },
  brass: {
    name: "Brushed Brass Hardware",
    description: "Solid brass fittings, brushed and lacquered to resist tarnish.",
  },
  teak: {
    name: "Plantation Teak",
    description: "Naturally weather-resistant teak suited to South African outdoor conditions.",
  },
};

function makeProduct(
  slug: string,
  name: string,
  shortDescription: string,
  seedPrefix: string,
  dimensions: { label: string; value: string }[],
  imageCount = 3
): Product {
  return {
    slug,
    name,
    shortDescription,
    dimensions,
    leadTime: "8–12 weeks, made to order",
    images: Array.from({ length: imageCount }, (_, i) =>
      placeholderImage(`${seedPrefix}-${i}`, `${name} — view ${i + 1}`, 1200, 900)
    ),
  };
}

export const collections: Collection[] = [
  {
    slug: "aurelia-sofa-collection",
    categorySlug: "living-room",
    name: "Aurelia Sofa Collection",
    tagline: "A tailored silhouette built for everyday living.",
    description:
      "The Aurelia balances a low, architectural profile with deep, feather-wrapped cushioning. Hand-built frames in kiln-dried hardwood carry a 15-year structural guarantee.",
    story:
      "Named for its quiet confidence, Aurelia was developed with the MicWood workshop over eighteen months of prototyping — refining the arm pitch and seat depth until it disappeared into the room rather than dominating it.",
    heroImage: {
      src: "/images/rooms/living-room/chesterfield-sofa-brown-leather.jpeg",
      alt: "Brown leather Chesterfield sofa in the Lavish Haus showroom",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/living-room/chesterfield-sofa-brown-leather.jpeg", alt: "Chesterfield sofa leather detail", width: 1200, height: 900 },
      { src: "/images/rooms/living-room/tv-wall-console-marble-grey-01.jpeg", alt: "TV wall console with marble grey finish — living room context", width: 1200, height: 900 },
      { src: "/images/rooms/living-room/tv-wall-console-marble-grey-03.jpeg", alt: "Living room wall console detail", width: 1200, height: 900 },
      { src: "/images/rooms/living-room/tv-wall-console-marble-grey-04.jpeg", alt: "Wall console styled in a contemporary living space", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.performanceFabric, materialLibrary.fullGrainLeather],
    finishes: finishOptions.upholstery,
    products: [
      makeProduct(
        "aurelia-3-seater",
        "Aurelia 3-Seater",
        "The signature silhouette in a room-defining three-seat configuration.",
        "lh-aurelia-3s",
        [
          { label: "Width", value: "228 cm" },
          { label: "Depth", value: "96 cm" },
          { label: "Height", value: "78 cm" },
        ]
      ),
      makeProduct(
        "aurelia-sectional",
        "Aurelia Left-Facing Sectional",
        "An L-shaped configuration built for open-plan living rooms.",
        "lh-aurelia-sec",
        [
          { label: "Width", value: "312 cm" },
          { label: "Depth", value: "168 cm" },
          { label: "Height", value: "78 cm" },
        ]
      ),
      makeProduct(
        "aurelia-armchair",
        "Aurelia Armchair",
        "A single-seat companion piece, sold individually or in pairs.",
        "lh-aurelia-arm",
        [
          { label: "Width", value: "94 cm" },
          { label: "Depth", value: "96 cm" },
          { label: "Height", value: "78 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["marchetti-coffee-table", "linden-bed-frame"],
    featured: true,
  },
  {
    slug: "marchetti-coffee-table",
    categorySlug: "living-room",
    name: "Marchetti Coffee Table Collection",
    tagline: "Solid walnut, honestly joined.",
    description:
      "A single slab top over a mitred hardwood base, finished with a hand-rubbed oil that deepens the grain rather than masking it.",
    story:
      "Marchetti began as a workshop exercise in joinery without visible fixings — every joint is a traditional mortise and tenon, sanded through eight grits before finishing.",
    heroImage: {
      src: "/images/rooms/living-room/console-table-elephant-sculptures.jpeg",
      alt: "Console table with elephant sculptures in a styled living room",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/living-room/console-table-elephant-sculptures.jpeg", alt: "Console table detail with decorative sculptures", width: 1200, height: 900 },
      { src: "/images/rooms/living-room/console-table-round-mirror-brass-legs.jpeg", alt: "Console table styled with a round mirror and brass legs", width: 1200, height: 900 },
      { src: "/images/rooms/living-room/tv-wall-console-wood-marshall-speaker.jpeg", alt: "Wall console in wood finish with styling detail", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.fsc],
    finishes: finishOptions.timber,
    products: [
      makeProduct(
        "marchetti-coffee-table-large",
        "Marchetti Coffee Table — Large",
        "The primary table, sized for sectional and 3-seater pairings.",
        "lh-marchetti-l",
        [
          { label: "Width", value: "140 cm" },
          { label: "Depth", value: "70 cm" },
          { label: "Height", value: "34 cm" },
        ]
      ),
      makeProduct(
        "marchetti-nesting-pair",
        "Marchetti Nesting Table Pair",
        "Two tables that tuck together or split across the room.",
        "lh-marchetti-n",
        [
          { label: "Width", value: "60 / 45 cm" },
          { label: "Depth", value: "60 / 45 cm" },
          { label: "Height", value: "38 / 32 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["aurelia-sofa-collection"],
  },
  {
    slug: "linden-bed-frame",
    categorySlug: "bedroom",
    name: "Linden Bed Frame Collection",
    tagline: "An upholstered frame that quiets the room.",
    description:
      "A low headboard and solid walnut legs bring the Linden close to the floor, giving even smaller rooms a sense of proportion.",
    story:
      "Linden was designed around a simple brief from an early Lavish Haus client: 'a bed that doesn't compete with the art on the walls.'",
    heroImage: {
      src: "/images/rooms/bedroom/bed-beige-facet-headboard-01.jpeg",
      alt: "Beige faceted headboard bed frame in a styled bedroom",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/bedroom/bed-beige-facet-headboard-02-wide.jpeg", alt: "Faceted headboard detail — wide angle", width: 1200, height: 900 },
      { src: "/images/rooms/bedroom/bed-beige-facet-headboard-03.jpeg", alt: "Faceted headboard alternate view", width: 1200, height: 900 },
      { src: "/images/rooms/bedroom/bed-black-velvet-arch-headboard-white-dresser.jpeg", alt: "Black velvet arch headboard with white dresser", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.performanceFabric],
    finishes: finishOptions.upholstery,
    products: [
      makeProduct(
        "linden-queen",
        "Linden Bed Frame — Queen",
        "Standard South African queen size, 152 x 188 cm mattress.",
        "lh-linden-q",
        [
          { label: "Width", value: "168 cm" },
          { label: "Length", value: "212 cm" },
          { label: "Headboard Height", value: "110 cm" },
        ]
      ),
      makeProduct(
        "linden-king",
        "Linden Bed Frame — King",
        "South African king size, 183 x 188 cm mattress.",
        "lh-linden-k",
        [
          { label: "Width", value: "199 cm" },
          { label: "Length", value: "212 cm" },
          { label: "Headboard Height", value: "110 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["aurelia-sofa-collection", "porter-nightstand"],
    featured: true,
  },
  {
    slug: "porter-nightstand",
    categorySlug: "bedroom",
    name: "Porter Nightstand Collection",
    tagline: "Small pieces, held to the same standard.",
    description:
      "A single drawer with a hand-fitted brass pull, over an open shelf — sized to sit quietly beside the Linden or any bed in the house.",
    story:
      "Porter takes its name from the discipline of building small case pieces exactly as carefully as large ones — no shortcuts because a nightstand is 'just' a nightstand.",
    heroImage: {
      src: "/images/rooms/bedroom/bed-grey-square-tufted-panel-headboard.jpeg",
      alt: "Square-tufted panel headboard styled with a bedside nightstand",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/bedroom/bed-grey-mirror-panel-headboard-02-wide.jpeg", alt: "Mirror panel headboard — wide angle", width: 1200, height: 900 },
      { src: "/images/rooms/bedroom/bed-grey-mirror-panel-headboard-03.jpeg", alt: "Mirror panel headboard detail", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.brass],
    finishes: finishOptions.timber,
    products: [
      makeProduct(
        "porter-nightstand-single",
        "Porter Nightstand",
        "A single-drawer nightstand with an open lower shelf.",
        "lh-porter-s",
        [
          { label: "Width", value: "48 cm" },
          { label: "Depth", value: "40 cm" },
          { label: "Height", value: "56 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["linden-bed-frame"],
  },
  {
    slug: "hollis-dining-table",
    categorySlug: "dining",
    name: "Hollis Dining Table Collection",
    tagline: "A table built for the whole evening.",
    description:
      "A thick solid-timber top on a trestle base, engineered with breadboard ends to resist seasonal movement across South African climates.",
    story:
      "Hollis is the piece most requested by returning MicWood clients — the same table specified for a six-seat apartment or an eighteen-seat farmhouse, scaled to fit.",
    heroImage: {
      src: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg",
      alt: "Dining table with rose gold legs and eight chairs",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg", alt: "Dining table detail — rose gold leg finish", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.fsc],
    finishes: finishOptions.timber,
    products: [
      makeProduct(
        "hollis-6-seat",
        "Hollis Dining Table — 6 Seat",
        "Sized for everyday family dining.",
        "lh-hollis-6",
        [
          { label: "Length", value: "180 cm" },
          { label: "Width", value: "95 cm" },
          { label: "Height", value: "75 cm" },
        ]
      ),
      makeProduct(
        "hollis-10-seat",
        "Hollis Dining Table — 10 Seat",
        "A statement table for entertaining.",
        "lh-hollis-10",
        [
          { label: "Length", value: "280 cm" },
          { label: "Width", value: "100 cm" },
          { label: "Height", value: "75 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["reyes-dining-chair"],
    featured: true,
  },
  {
    slug: "reyes-dining-chair",
    categorySlug: "dining",
    name: "Reyes Dining Chair Collection",
    tagline: "Hand-shaped, upholstered where it counts.",
    description:
      "A sculpted timber frame with an upholstered seat pad, shaped to stay comfortable through a long dinner.",
    story:
      "Every Reyes seat is shaped on the same jigs the MicWood workshop developed for its very first dining chair run in 2019.",
    heroImage: {
      src: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg",
      alt: "Dining chairs styled around a table in the showroom",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg", alt: "Dining chair arrangement detail", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.performanceFabric],
    finishes: finishOptions.upholstery,
    products: [
      makeProduct(
        "reyes-dining-chair",
        "Reyes Dining Chair",
        "Sold individually; typically ordered in sets of six or more.",
        "lh-reyes-c",
        [
          { label: "Width", value: "52 cm" },
          { label: "Depth", value: "56 cm" },
          { label: "Height", value: "82 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: ["hollis-dining-table"],
  },
  {
    slug: "carrow-writing-desk",
    categorySlug: "office",
    name: "Carrow Writing Desk Collection",
    tagline: "A desk with nothing to hide behind.",
    description:
      "A single-slab top on a slim steel-and-timber base, with an integrated cable channel built in rather than bolted on.",
    story:
      "Carrow was designed for the home-office era — small enough for a spare room, considered enough for an executive suite.",
    heroImage: {
      src: "/images/rooms/office/desk-white-lacquer-leather-trim.jpeg",
      alt: "White lacquer desk with leather trim in a minimalist office",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/office/desk-white-lacquer-leather-trim.jpeg", alt: "Desk detail — lacquer and leather trim", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.brass],
    finishes: finishOptions.metal,
    products: [
      makeProduct(
        "carrow-desk-140",
        "Carrow Writing Desk — 140cm",
        "Sized for home offices and secondary workstations.",
        "lh-carrow-140",
        [
          { label: "Width", value: "140 cm" },
          { label: "Depth", value: "65 cm" },
          { label: "Height", value: "75 cm" },
        ]
      ),
      makeProduct(
        "carrow-desk-180",
        "Carrow Writing Desk — 180cm",
        "The executive size, with room for dual monitors.",
        "lh-carrow-180",
        [
          { label: "Width", value: "180 cm" },
          { label: "Depth", value: "70 cm" },
          { label: "Height", value: "75 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: [],
  },
  {
    slug: "solano-outdoor-lounge",
    categorySlug: "outdoor",
    name: "Solano Outdoor Lounge Collection",
    tagline: "Teak and weave, built for the highveld and the coast.",
    description:
      "A modular outdoor seating system in plantation teak, with quick-dry cushions and a synthetic weave rated for UV and salt air.",
    story:
      "Solano was tested through a full South African summer on an exposed Cape Town balcony before it was approved for the Lavish Haus range.",
    heroImage: {
      src: "/images/rooms/bedroom/bed-grey-velvet-diamond-tufted-feather-wallpaper.jpeg",
      alt: "Outdoor lounge collection — showroom photo coming soon",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/bedroom/bed-grey-velvet-diamond-tufted-feather-wallpaper.jpeg", alt: "Outdoor collection — photo coming soon", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.teak, materialLibrary.performanceFabric],
    finishes: finishOptions.timber,
    products: [
      makeProduct(
        "solano-2-seater",
        "Solano 2-Seater Lounge",
        "A compact configuration for balconies and smaller patios.",
        "lh-solano-2s",
        [
          { label: "Width", value: "160 cm" },
          { label: "Depth", value: "85 cm" },
          { label: "Height", value: "68 cm" },
        ]
      ),
      makeProduct(
        "solano-modular-corner",
        "Solano Modular Corner Set",
        "A configurable corner set for larger outdoor rooms.",
        "lh-solano-cs",
        [
          { label: "Width", value: "280 cm" },
          { label: "Depth", value: "280 cm" },
          { label: "Height", value: "68 cm" },
        ]
      ),
    ],
    relatedCollectionSlugs: [],
  },
  {
    slug: "bespoke-commissions",
    categorySlug: "custom-furniture",
    name: "Bespoke Commissions",
    tagline: "Designed around your space, not the other way around.",
    description:
      "Work with the MicWood Furnitures workshop to develop a one-of-a-kind piece — matched dimensions, timber selection and finish, from concept sketch to delivery.",
    story:
      "Roughly a third of Lavish Haus's workshop hours go into bespoke commissions — from a boardroom table matched to existing panelling, to a built-in bench seat shaped around a bay window.",
    heroImage: {
      src: "/images/rooms/bedroom/bed-honeycomb-tufted-headboard-wood-frame.jpeg",
      alt: "Honeycomb-tufted headboard with exposed wood frame — a bespoke commission",
      width: 1600,
      height: 1000,
    },
    gallery: [
      { src: "/images/rooms/bedroom/bed-cognac-leather-diamond-headboard.jpeg", alt: "Cognac leather diamond-tufted headboard — bespoke bedroom commission", width: 1200, height: 900 },
      { src: "/images/rooms/bedroom/bed-grey-square-tufted-panel-headboard.jpeg", alt: "Grey square-tufted panel headboard — custom upholstery", width: 1200, height: 900 },
      { src: "/images/rooms/bedroom/bed-green-velvet-chevron-headboard.jpeg", alt: "Green velvet chevron headboard — alternate finish", width: 1200, height: 900 },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.fsc, materialLibrary.fullGrainLeather],
    finishes: [...finishOptions.timber, ...finishOptions.upholstery],
    products: [],
    relatedCollectionSlugs: ["hollis-dining-table", "linden-bed-frame"],
    featured: true,
  },
  {
    slug: "micwood-kitchen-island",
    categorySlug: "kitchen",
    name: "MicWood Kitchen Island Collection",
    tagline: "The centrepiece your kitchen is built around.",
    description:
      "Custom kitchen islands with fluted panelling, integrated storage and stone or timber countertops — designed to anchor the room you use most.",
    story:
      "The kitchen island started as a client request that didn't fit any existing category — and became one of the workshop's most-requested pieces. Every island is built to the kitchen's exact dimensions.",
    heroImage: {
      src: "/images/rooms/kitchen/kitchen-island-fluted-taupe-cabinetry.jpeg",
      alt: "A fluted taupe kitchen island with custom cabinetry by MicWood Furnitures",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/images/rooms/kitchen/kitchen-island-fluted-taupe-cabinetry.jpeg",
        alt: "Kitchen island fluted panel detail",
        width: 1200,
        height: 900,
      },
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.fsc],
    finishes: finishOptions.timber,
    products: [],
    relatedCollectionSlugs: ["bespoke-commissions"],
    featured: false,
  },
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
