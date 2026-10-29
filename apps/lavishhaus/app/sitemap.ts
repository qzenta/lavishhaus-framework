import type { MetadataRoute } from "next";

import { visibleCategories } from "@/content/categories";
import { collections } from "@/content/collections";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/collections",
    "/craftsmanship",
    "/showroom",
    "/faqs",
    "/quote",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const categoryRoutes = visibleCategories.map((category) => ({
    url: `${siteConfig.url}/collections/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: `${siteConfig.url}/collections/${collection.categorySlug}/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...collectionRoutes];
}
