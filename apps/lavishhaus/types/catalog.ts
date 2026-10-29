export interface CatalogImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Material {
  name: string;
  description: string;
}

export interface Finish {
  name: string;
  swatch: string;
}

export interface Dimension {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  images: CatalogImage[];
  /** Only client-confirmed dimensions; omit rather than estimate. */
  dimensions?: Dimension[];
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Omitted when no real photography exists yet. */
  heroImage?: CatalogImage;
  /** Reachable by URL but left out of navigation, listings and the sitemap. */
  hidden?: boolean;
}

export interface Collection {
  slug: string;
  categorySlug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: CatalogImage;
  gallery: CatalogImage[];
  /** Only client-confirmed materials and finishes; omit rather than estimate. */
  materials?: Material[];
  finishes?: Finish[];
  products: Product[];
  relatedCollectionSlugs: string[];
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  category: string;
  summary: string;
  coverImage: CatalogImage;
  gallery: CatalogImage[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Quotes & Pricing" | "Custom Furniture" | "Delivery & Care";
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
