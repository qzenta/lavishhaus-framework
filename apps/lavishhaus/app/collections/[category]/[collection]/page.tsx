import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";

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
import { collectionPageJsonLd } from "@/lib/structured-data";

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

const whatsappHref = (text: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;

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
  const path = `/collections/${collection.categorySlug}/${collection.slug}`;
  const url = `${siteConfig.url}${path}`;
  const quoteHref = `/quote?collection=${collection.slug}`;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd({
              name: collection.name,
              description: collection.description,
              url,
              image: collection.heroImage.src,
              items: collection.products.map((p) => ({
                name: p.name,
                description: p.shortDescription,
                image: p.images[0].src,
              })),
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

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <Breadcrumbs
          items={[
            { name: "Collections", href: "/collections" },
            { name: category.name, href: `/collections/${category.slug}` },
            { name: collection.name, href: path },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {collection.description}
            </p>

            {collection.products.length > 0 ? (
              <>
                <h2 className="mt-14 font-heading text-2xl text-charcoal">
                  Pieces in this collection
                </h2>
                <ul className="mt-8 space-y-14">
                  {collection.products.map((product) => (
                    <li
                      key={product.slug}
                      id={product.slug}
                      className="grid scroll-mt-28 grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-2 sm:gap-10"
                    >
                      <GalleryLightbox
                        images={product.images}
                        layout="feature"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      />
                      <div className="sm:pt-2">
                        <h3 className="font-heading text-2xl text-charcoal">{product.name}</h3>
                        <p className="mt-3 leading-relaxed text-muted-foreground">
                          {product.shortDescription}
                        </p>
                        {product.dimensions?.length ? (
                          <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                            {product.dimensions.map((dimension) => (
                              <div key={dimension.label}>
                                <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                                  {dimension.label}
                                </dt>
                                <dd className="text-charcoal">{dimension.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button
                            asChild
                            className="rounded-none bg-charcoal px-5 py-5 text-ivory hover:bg-warm-black"
                          >
                            <Link href={`${quoteHref}&piece=${product.slug}`}>Request a Quote</Link>
                          </Button>
                          <Button asChild variant="outline" className="rounded-none px-5 py-5">
                            <a
                              href={whatsappHref(
                                `Hi Lavish Haus, I'd like to ask about the ${product.name} (${url}#${product.slug}).`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="size-4" aria-hidden="true" />
                              Ask on WhatsApp
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2 className="mt-14 font-heading text-2xl text-charcoal">Gallery</h2>
                <div className="mt-6">
                  <GalleryLightbox images={collection.gallery} />
                </div>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card p-6">
              <h2 className="font-heading text-lg text-charcoal">Enquire about this collection</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Pricing depends on size, covering and finish. Send us a quote request and
                we&apos;ll be in touch to talk it through.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full rounded-none bg-charcoal py-5 text-ivory hover:bg-warm-black"
                >
                  <Link href={quoteHref}>Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-none py-5">
                  <a
                    href={whatsappHref(`Hi Lavish Haus, I'd like to enquire about ${collection.name} (${url}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Enquire on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 py-2 text-sm text-charcoal underline-offset-4 hover:underline"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            {collection.materials?.length ? (
              <div className="mt-10">
                <h2 className="font-heading text-lg text-charcoal">Materials</h2>
                <ul className="mt-3 space-y-3">
                  {collection.materials.map((material) => (
                    <li key={material.name}>
                      <p className="text-sm font-medium text-charcoal">{material.name}</p>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {collection.finishes?.length ? (
              <div className="mt-10">
                <h2 className="font-heading text-lg text-charcoal">Finishes</h2>
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
            ) : null}
          </aside>
        </div>

        {relatedCollections.length > 0 && (
          <div className="mt-24">
            <h2 className="font-heading text-2xl text-charcoal">You may also like</h2>
            <div className="mt-8">
              <CollectionGrid collections={relatedCollections} />
            </div>
          </div>
        )}
      </div>

      <CtaSection
        title="Have a question before you enquire?"
        description="Read our FAQs, or get in touch by phone, email or WhatsApp."
        primaryCta={{ label: "View FAQs", href: "/faqs" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </div>
  );
}
