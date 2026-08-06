import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

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
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden bg-warm-black">
        <Image
          src={category.heroImage.src}
          alt={category.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-8">
          <h1 className="font-heading text-4xl text-ivory sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-xl text-ivory/75">{category.description}</p>
        </div>
      </div>

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
