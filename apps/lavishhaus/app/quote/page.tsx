import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuoteForm } from "@/components/shared/quote-form";
import { getCollectionBySlug } from "@/content/collections";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a no-obligation quote for any Lavish Haus collection or a custom furniture commission.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; piece?: string }>;
}) {
  const params = await searchParams;
  // Only accept known slugs from the query string.
  const collection = params.collection ? getCollectionBySlug(params.collection) : undefined;
  const piece = collection?.products.find((product) => product.slug === params.piece);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Request a Quote", href: "/quote" }]} />
      <div className="mt-6">
        <SectionHeading
          level="h1"
          eyebrow="Request a Quote"
          title="Let's price your piece"
          description="Share a few details and we'll be in touch to discuss your quote. There's no obligation to purchase."
        />
      </div>
      <div className="mt-12">
        <QuoteForm defaultCollection={collection?.slug} piece={piece?.name} />
      </div>
    </div>
  );
}
