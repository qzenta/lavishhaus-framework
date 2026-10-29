import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/types/catalog";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    // Only confirmed accounts (see config/site.ts).
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${siteConfig.url}${path}`);

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteConfig.showroom.name,
    image: absoluteUrl(siteConfig.ogImage),
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.showroom.streetAddress,
      addressLocality: siteConfig.showroom.addressLocality,
      addressRegion: siteConfig.showroom.addressRegion,
      postalCode: siteConfig.showroom.postalCode,
      addressCountry: siteConfig.showroom.addressCountry,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Collection pages are quote-only (no prices), so they're described as a
 * CollectionPage listing its pieces rather than as Products with Offers,
 * which would need a price to be valid.
 */
export function collectionPageJsonLd(params: {
  name: string;
  description: string;
  url: string;
  image: string;
  items: { name: string; description: string; image: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: params.url,
    image: absoluteUrl(params.image),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: params.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.name,
          description: item.description,
          image: absoluteUrl(item.image),
        },
      })),
    },
  };
}
