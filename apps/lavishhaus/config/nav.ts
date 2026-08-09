export interface NavCategory {
  label: string;
  slug: string;
  description: string;
}

export const collectionCategories: NavCategory[] = [
  {
    label: "Living Room",
    slug: "living-room",
    description: "Sofas, sectionals and coffee tables built for gathering.",
  },
  {
    label: "Bedroom",
    slug: "bedroom",
    description: "Beds, headboards and nightstands for restful spaces.",
  },
  {
    label: "Dining Room",
    slug: "dining",
    description: "Tables and chairs crafted for long, unhurried evenings.",
  },
  {
    label: "Kitchen",
    slug: "kitchen",
    description: "Islands, cabinetry and surfaces built for the heart of the home.",
  },
  {
    label: "Office",
    slug: "office",
    description: "Desks and seating for considered, focused work.",
  },
  {
    label: "Outdoor",
    slug: "outdoor",
    description: "Weather-ready pieces without compromising on craft.",
  },
  {
    label: "Custom Furniture",
    slug: "custom-furniture",
    description: "Bespoke pieces designed and built to your specification.",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Shop by Room", href: "/collections" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Projects", href: "/projects" },
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
    { label: "Projects", href: "/projects" },
    { label: "Showroom", href: "/showroom" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
