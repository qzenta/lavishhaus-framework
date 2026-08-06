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
    heroImage: placeholderImage("lh-aurelia-hero", "Aurelia sofa in a Johannesburg living room", 1600, 1000),
    gallery: [
      placeholderImage("lh-aurelia-1", "Aurelia sofa detail, arm and cushion construction"),
      placeholderImage("lh-aurelia-2", "Aurelia sectional configuration in a open-plan living room"),
      placeholderImage("lh-aurelia-3", "Close-up of Aurelia upholstery seam detail"),
      placeholderImage("lh-aurelia-4", "Aurelia sofa styled with a walnut coffee table"),
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
    heroImage: placeholderImage("lh-marchetti-hero", "Marchetti walnut coffee table in a styled living room", 1600, 1000),
    gallery: [
      placeholderImage("lh-marchetti-1", "Marchetti coffee table grain detail"),
      placeholderImage("lh-marchetti-2", "Marchetti nesting tables styled together"),
      placeholderImage("lh-marchetti-3", "Marchetti table joinery close-up"),
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
    heroImage: placeholderImage("lh-linden-hero", "Linden upholstered bed frame in a calm bedroom", 1600, 1000),
    gallery: [
      placeholderImage("lh-linden-1", "Linden headboard upholstery detail"),
      placeholderImage("lh-linden-2", "Linden bed frame leg and floor detail"),
      placeholderImage("lh-linden-3", "Linden bed styled with linen bedding"),
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
    heroImage: placeholderImage("lh-porter-hero", "Porter walnut nightstand beside a bed", 1600, 1000),
    gallery: [
      placeholderImage("lh-porter-1", "Porter nightstand drawer detail"),
      placeholderImage("lh-porter-2", "Porter nightstand brass pull close-up"),
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
    heroImage: placeholderImage("lh-hollis-hero", "Hollis dining table set for a dinner", 1600, 1000),
    gallery: [
      placeholderImage("lh-hollis-1", "Hollis dining table breadboard end detail"),
      placeholderImage("lh-hollis-2", "Hollis table styled with Reyes dining chairs"),
      placeholderImage("lh-hollis-3", "Hollis table grain and finish detail"),
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
    heroImage: placeholderImage("lh-reyes-hero", "Reyes dining chairs around the Hollis table", 1600, 1000),
    gallery: [
      placeholderImage("lh-reyes-1", "Reyes dining chair frame detail"),
      placeholderImage("lh-reyes-2", "Reyes dining chair upholstery close-up"),
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
    heroImage: placeholderImage("lh-carrow-hero", "Carrow writing desk in a minimalist office", 1600, 1000),
    gallery: [
      placeholderImage("lh-carrow-1", "Carrow desk cable management detail"),
      placeholderImage("lh-carrow-2", "Carrow desk leg and joinery detail"),
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
    heroImage: placeholderImage("lh-solano-hero", "Solano outdoor lounge setting on a covered patio", 1600, 1000),
    gallery: [
      placeholderImage("lh-solano-1", "Solano teak frame joinery detail"),
      placeholderImage("lh-solano-2", "Solano outdoor lounge styled at dusk"),
      placeholderImage("lh-solano-3", "Solano cushion and weave detail"),
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
    heroImage: placeholderImage("lh-bespoke-hero", "A craftsman sketching a custom furniture commission", 1600, 1000),
    gallery: [
      placeholderImage("lh-bespoke-1", "Workshop sketch and timber sample for a custom commission"),
      placeholderImage("lh-bespoke-2", "A custom bench seat built into a bay window"),
      placeholderImage("lh-bespoke-3", "MicWood craftsman finishing a bespoke commission"),
    ],
    materials: [materialLibrary.solidWalnut, materialLibrary.fsc, materialLibrary.fullGrainLeather],
    finishes: [...finishOptions.timber, ...finishOptions.upholstery],
    products: [],
    relatedCollectionSlugs: ["hollis-dining-table", "linden-bed-frame"],
    featured: true,
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
