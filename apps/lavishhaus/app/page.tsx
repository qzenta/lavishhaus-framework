import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, MessageCircle, PenTool, ReceiptText } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/shared/category-card";
import { CollectionGrid } from "@/components/shared/collection-grid";
import { FeatureCard } from "@/components/shared/feature-card";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { BrandPillars } from "@/components/shared/brand-pillars";
import { CtaSection } from "@/components/shared/cta-section";
import { Button } from "@/components/ui/button";
import { visibleCategories } from "@/content/categories";
import { getCollectionBySlug, getFeaturedCollections } from "@/content/collections";
import { processSteps } from "@/content/process";
import { catalogImage } from "@/lib/catalog-image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Statement Furniture, Johannesburg` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

// Every point here is backed by docs/lavishhaus-facts.md.
const whyLavishHaus = [
  {
    icon: Factory,
    title: "Made by MicWood Furnitures",
    description:
      "Lavish Haus is the showroom and customer-facing brand; MicWood Furnitures is the manufacturer behind each piece.",
  },
  {
    icon: PenTool,
    title: "Bespoke, When You Need It",
    description:
      "From a different size or colour to a fully built-in wall, tell us what your space needs.",
  },
  {
    icon: ReceiptText,
    title: "Quote First, No Obligation",
    description:
      "We price each piece for your specification, so you know exactly what you're getting before you commit.",
  },
  {
    icon: MessageCircle,
    title: "Talk to Us Your Way",
    description: "Request a quote online, call us, or send photos and ideas on WhatsApp.",
  },
];

const heroImage = catalogImage(
  "bed-navy-channel-wall",
  "Navy upholstered bed against a full-width ivory channel-tufted wall panel, with brass lamps on black bedside tables"
);
const bespokeImage = catalogImage(
  "tv-led-01",
  "Built-in light grey TV wall unit with LED-lit floating shelves and a glass display cabinet"
);

export default function HomePage() {
  // Three featured collections keep the grid even; bespoke work has its own section.
  const featuredCollections = getFeaturedCollections()
    .filter((c) => c.categorySlug !== "custom-furniture")
    .slice(0, 3);
  const bespoke = getCollectionBySlug("bespoke-commissions");

  return (
    <>
      <Hero
        eyebrow="Johannesburg showroom"
        title="Statement furniture, made for your home."
        description="Upholstered beds, TV walls, dining sets and bespoke pieces made by MicWood Furnitures. Browse the collections, then request a quote."
        image={heroImage}
        imagePosition="50% 40%"
        primaryCta={{ label: "Browse Collections", href: "/collections" }}
        secondaryCta={{ label: "Request a Quote", href: "/quote" }}
      />

      <BrandPillars />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Shop by room" title="Find the right piece" />
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
          >
            All collections
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-sand/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Featured collections"
            title="Pieces worth living with"
            description="A selection of beds, TV walls and dining pieces from the Lavish Haus range."
          />
          <div className="mt-12">
            <CollectionGrid collections={featuredCollections} />
          </div>
        </div>
      </section>

      {bespoke ? (
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative aspect-4/5 overflow-hidden bg-sand lg:order-2">
            <Image
              src={bespokeImage.src}
              alt={bespokeImage.alt}
              fill
              placeholder="blur"
              blurDataURL={bespokeImage.blurDataURL}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Custom furniture" title="Designed around your space" />
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              {bespoke.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-none bg-charcoal px-6 py-5 text-ivory hover:bg-warm-black"
              >
                <Link href="/quote?collection=bespoke-commissions">Start a Custom Enquiry</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none px-6 py-5">
                <Link href="/collections/custom-furniture/bespoke-commissions">See custom work</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-sand/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Why Lavish Haus"
            title="Considered from enquiry to delivery"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyLavishHaus.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From first enquiry to final placement"
          align="center"
          className="mx-auto"
        />
        <div className="mt-14">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <CtaSection
        title="Ready to furnish your space?"
        description="Tell us what you're looking for and we'll prepare a no-obligation quote."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
