import { placeholderImage } from "@/lib/placeholder-image";
import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Sofas, sectionals and coffee tables built for gathering.",
    description:
      "Anchor pieces upholstered in performance fabrics and full-grain leather, designed to hold their shape and their welcome for decades.",
    heroImage: placeholderImage(
      "lh-living-room-hero",
      "A sunlit Lavish Haus living room with a tailored linen sofa",
      1600,
      1000
    ),
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Beds, headboards and nightstands for restful spaces.",
    description:
      "Upholstered frames and solid walnut casegoods, built quietly so the room can stay calm.",
    heroImage: placeholderImage(
      "lh-bedroom-hero",
      "A serene Lavish Haus bedroom with an upholstered walnut bed frame",
      1600,
      1000
    ),
  },
  {
    slug: "dining",
    name: "Dining",
    tagline: "Tables and chairs crafted for long, unhurried evenings.",
    description:
      "Solid timber dining tables and hand-finished chairs, sized for everyday meals and the evenings that run late.",
    heroImage: placeholderImage(
      "lh-dining-hero",
      "A walnut dining table set for guests in a Lavish Haus showroom vignette",
      1600,
      1000
    ),
  },
  {
    slug: "office",
    name: "Office",
    tagline: "Desks and seating for considered, focused work.",
    description:
      "Home and executive office pieces that hold their composure — quiet hardware, real timber, no shortcuts.",
    heroImage: placeholderImage(
      "lh-office-hero",
      "A minimalist walnut writing desk in a Lavish Haus office setting",
      1600,
      1000
    ),
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Weather-ready pieces without compromising on craft.",
    description:
      "Teak frames and outdoor-grade weaves, engineered for the South African climate and built to age well.",
    heroImage: placeholderImage(
      "lh-outdoor-hero",
      "A teak outdoor lounge setting on a covered patio",
      1600,
      1000
    ),
  },
  {
    slug: "custom-furniture",
    name: "Custom Furniture",
    tagline: "Bespoke pieces designed and built to your specification.",
    description:
      "Work directly with the MicWood Furnitures workshop on one-of-a-kind pieces — from dimensions to timber selection to finish.",
    heroImage: placeholderImage(
      "lh-custom-hero",
      "A craftsman finishing a custom timber furniture piece in the MicWood workshop",
      1600,
      1000
    ),
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
