import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CollectionGrid } from "@/components/shared/collection-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { categories, getCategoryBySlug } from "@/content/categories";
import { getCollectionsByCategory } from "@/content/collections";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
      images: [category.heroImage.src],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const collectionsInCategory = getCollectionsByCategory(category.slug);

  return (
    <div>
      <Hero
        size="compact"
        title={category.name}
        description={category.description}
        image={category.heroImage}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Collections", href: "/collections" },
            { name: category.name, href: `/collections/${category.slug}` },
          ]}
        />
        <div className="mt-10">
          <CollectionGrid collections={collectionsInCategory} />
        </div>
      </div>

      <CtaSection
        title={`Considering a piece from ${category.name}?`}
        description="Request a detailed, no-obligation quote and our team will respond within one business day."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
      />
    </div>
  );
}
