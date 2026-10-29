import { visibleCategories } from "@/content/categories";

export interface NavCategory {
  label: string;
  slug: string;
  description: string;
}

// Derived from content/categories.ts so menu copy and category pages can't drift.
export const collectionCategories: NavCategory[] = visibleCategories.map((category) => ({
  label: category.name,
  slug: category.slug,
  description: category.tagline,
}));

export interface NavLink {
  label: string;
  href: string;
}

/** The entry whose href is COLLECTIONS_HREF renders as the categories dropdown. */
export const COLLECTIONS_HREF = "/collections";

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: COLLECTIONS_HREF },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Showroom", href: "/showroom" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  collections: collectionCategories.map((c) => ({
    label: c.label,
    href: `/collections/${c.slug}`,
  })),
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Showroom", href: "/showroom" },
    { label: "FAQs", href: "/faqs" },
    { label: "Request a Quote", href: "/quote" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
