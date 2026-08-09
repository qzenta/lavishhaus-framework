import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Sofas, sectionals and coffee tables built for gathering.",
    description:
      "Anchor pieces upholstered in performance fabrics and full-grain leather, designed to hold their shape and their welcome for decades.",
    heroImage: {
      src: "/images/rooms/living-room/chesterfield-sofa-brown-leather.jpeg",
      alt: "A brown leather Chesterfield sofa in the Lavish Haus showroom",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Beds, headboards and nightstands for restful spaces.",
    description:
      "Upholstered frames and solid walnut casegoods, built quietly so the room can stay calm.",
    heroImage: {
      src: "/images/rooms/bedroom/bed-champagne-diamond-headboard-gold-trim.jpeg",
      alt: "A champagne diamond-tufted headboard with gold trim in the Lavish Haus showroom",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "dining",
    name: "Dining Room",
    tagline: "Tables and chairs crafted for long, unhurried evenings.",
    description:
      "Solid timber dining tables and hand-finished chairs, sized for everyday meals and the evenings that run late.",
    heroImage: {
      src: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg",
      alt: "A rose-gold legged dining table with eight chairs in the Lavish Haus showroom",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    tagline: "Islands, cabinetry and surfaces built for the heart of the home.",
    description:
      "Custom kitchen islands and storage solutions in timber and stone — designed to anchor the room you use most.",
    heroImage: {
      src: "/images/rooms/kitchen/kitchen-island-fluted-taupe-cabinetry.jpeg",
      alt: "A fluted taupe kitchen island with custom cabinetry by MicWood Furnitures",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "office",
    name: "Office",
    tagline: "Desks and seating for considered, focused work.",
    description:
      "Home and executive office pieces that hold their composure — quiet hardware, real timber, no shortcuts.",
    heroImage: {
      src: "/images/rooms/office/desk-white-lacquer-leather-trim.jpeg",
      alt: "A white lacquer desk with leather trim in the Lavish Haus office collection",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Weather-ready pieces without compromising on craft.",
    description:
      "Teak frames and outdoor-grade weaves, engineered for the South African climate and built to age well.",
    heroImage: {
      src: "/images/rooms/living-room/console-table-round-mirror-brass-legs.jpeg",
      alt: "A console table with brass legs and round mirror",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "custom-furniture",
    name: "Custom Furniture",
    tagline: "Bespoke pieces designed and built to your specification.",
    description:
      "Work directly with the MicWood Furnitures workshop on one-of-a-kind pieces — from dimensions to timber selection to finish.",
    heroImage: {
      src: "/images/rooms/bedroom/bed-green-velvet-chevron-headboard.jpeg",
      alt: "A custom green velvet chevron headboard by MicWood Furnitures",
      width: 1600,
      height: 1000,
    },
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
