import { catalogImage } from "@/lib/catalog-image";
import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "TV walls, consoles, coffee tables and seating.",
    description:
      "Feature TV walls, consoles, coffee tables and classic seating for the room you gather in.",
    heroImage: catalogImage("tv-marble-01", "Marble-effect fluted TV wall with a lit glass display cabinet"),
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Statement headboards, beds and bedroom suites.",
    description:
      "Upholstered beds with statement headboards, and suites with coordinated chests and pedestals.",
    heroImage: catalogImage("bed-champagne-diamond", "Tall champagne diamond-tufted headboard framed in slim metallic trim"),
  },
  {
    slug: "dining",
    name: "Dining Room",
    tagline: "Dining tables, upholstered chairs and benches.",
    description: "Dining tables, upholstered chairs and benches, sized and finished for your space.",
    heroImage: catalogImage("dining-black-fluted", "Black gloss oval dining table with aubergine upholstered chairs and bench"),
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    tagline: "Islands and cabinetry for the heart of the home.",
    description: "Kitchen islands and cabinetry, designed and fitted to your space.",
    heroImage: catalogImage("kitchen-island-fluted", "Kitchen island with a fluted front and stone-look top beside taupe cabinetry"),
  },
  {
    slug: "office",
    name: "Office",
    tagline: "Desks and storage for focused work.",
    description: "Desks and storage for the home office and study.",
    heroImage: catalogImage("desk-white-pedestal", "White desk with a built-in four-drawer pedestal"),
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Outdoor pieces, made to order.",
    description:
      "We're photographing our outdoor range. Tell us what you have in mind and we'll talk you through the options.",
    // No outdoor photography yet (docs/lavishhaus-assets.md). Kept reachable at
    // its URL but left out of navigation and listings until photos arrive.
    hidden: true,
  },
  {
    slug: "custom-furniture",
    name: "Custom Furniture",
    tagline: "Bespoke pieces designed around your space.",
    description:
      "Built-in wall units, panelled headboard walls, kitchen islands and one-off pieces, designed with you and made by MicWood Furnitures.",
    heroImage: catalogImage("tv-led-02", "Built-in TV wall unit with slatted side panel and lit floating shelves"),
  },
];

export const visibleCategories = categories.filter((category) => !category.hidden);

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
