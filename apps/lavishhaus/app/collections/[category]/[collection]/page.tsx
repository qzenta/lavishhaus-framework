import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { GalleryLightbox } from "@/components/shared/gallery-lightbox";
import { CollectionGrid } from "@/components/shared/collection-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { getCategoryBySlug } from "@/content/categories";
import {
  collections,
  getCollectionBySlug,
  getRelatedCollections,
} from "@/content/collections";
import { siteConfig } from "@/config/site";
import { productJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return collections.map((collection) => ({
    category: collection.categorySlug,
    collection: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; collection: string }>;
}): Promise<Metadata> {
  const { collection: collectionSlug } = await params;
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) return {};

  return {
    title: collection.name,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.categorySlug}/${collection.slug}` },
    openGraph: {
      title: `${collection.name} | ${siteConfig.name}`,
      description: collection.description,
      images: [collection.heroImage.src],
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ category: string; collection: string }>;
}) {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const collection = getCollectionBySlug(collectionSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!collection || !category || collection.categorySlug !== category.slug) {
    notFound();
  }

  const relatedCollections = getRelatedCollections(collection);
  const url = `${siteConfig.url}/collections/${collection.categorySlug}/${collection.slug}`;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: collection.name,
              description: collection.description,
              image: collection.heroImage.src,
              url,
            })
          ),
        }}
      />

      <Hero
        size="compact"
        eyebrow={category.name}
        title={collection.name}
        description={collection.tagline}
        image={collection.heroImage}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Collections", href: "/collections" },
            { name: category.name, href: `/collections/${category.slug}` },
            { name: collection.name, href: url },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl text-charcoal">The Collection</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {collection.description}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{collection.story}</p>

            <h2 className="mt-14 font-heading text-2xl text-charcoal">Gallery</h2>
            <div className="mt-6">
              <GalleryLightbox images={collection.gallery} />
            </div>

            {collection.products.length > 0 && (
              <>
                <h2 className="mt-14 font-heading text-2xl text-charcoal">Pieces in This Collection</h2>
                <div className="mt-6 space-y-8">
                  {collection.products.map((product) => (
                    <div
                      key={product.slug}
                      className="grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-sand">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <h3 className="font-heading text-lg text-charcoal">{product.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.shortDescription}
                        </p>
                        <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                          {product.dimensions.map((dimension) => (
                            <div key={dimension.label}>
                              <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                                {dimension.label}
                              </dt>
                              <dd className="text-charcoal">{dimension.value}</dd>
                            </div>
                          ))}
                        </dl>
                        {product.leadTime ? (
                          <p className="mt-3 text-xs text-muted-foreground">{product.leadTime}</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card p-6">
              <h3 className="font-heading text-lg text-charcoal">Enquire About This Collection</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pricing depends on your specification. Request a quote and we&apos;ll respond
                within one business day.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full rounded-none bg-charcoal py-5 text-ivory hover:bg-warm-black"
                >
                  <Link href={`/quote?collection=${collection.slug}`}>Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-none py-5">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                      `Hi Lavish Haus, I'd like to enquire about the ${collection.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Enquire on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg text-charcoal">Materials</h3>
              <ul className="mt-3 space-y-3">
                {collection.materials.map((material) => (
                  <li key={material.name}>
                    <p className="text-sm font-medium text-charcoal">{material.name}</p>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg text-charcoal">Finishes</h3>
              <ul className="mt-3 flex flex-wrap gap-3">
                {collection.finishes.map((finish) => (
                  <li key={finish.name} className="flex items-center gap-2">
                    <span
                      className="size-5 rounded-full border border-border"
                      style={{ backgroundColor: finish.swatch }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted-foreground">{finish.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {relatedCollections.length > 0 && (
          <div className="mt-24">
            <h2 className="font-heading text-2xl text-charcoal">Related Collections</h2>
            <div className="mt-8">
              <CollectionGrid collections={relatedCollections} />
            </div>
          </div>
        )}
      </div>

      <CtaSection
        title="Have a question before you enquire?"
        description="Visit the Johannesburg showroom to see finishes and materials in person."
        primaryCta={{ label: "Visit the Showroom", href: "/showroom" }}
        secondaryCta={{ label: "View FAQs", href: "/faqs" }}
      />
    </div>
  );
}
