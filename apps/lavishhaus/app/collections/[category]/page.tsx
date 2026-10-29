import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
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
    // Hidden categories have no photography yet; keep them out of search.
    robots: category.hidden ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
      images: category.heroImage ? [category.heroImage.src] : undefined,
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
          {collectionsInCategory.length > 0 ? (
            <CollectionGrid collections={collectionsInCategory} />
          ) : (
            <div className="max-w-xl border border-border bg-card p-8">
              <p className="leading-relaxed text-muted-foreground">{category.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-none bg-charcoal px-6 py-5 text-ivory hover:bg-warm-black">
                  <Link href="/quote">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-none px-6 py-5">
                  <Link href="/collections">Browse all collections</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CtaSection
        title={`Considering a piece for your ${category.name.toLowerCase()}?`}
        description="Tell us what you have in mind and we'll be in touch to discuss sizes, finishes and a no-obligation quote."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
      />
    </div>
  );
}
