import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuoteForm } from "@/components/shared/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a detailed, no-obligation quote for any Lavish Haus collection or a custom furniture commission.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Request a Quote", href: "/quote" }]} />
      <div className="mt-6">
        <SectionHeading
          eyebrow="Request a Quote"
          title="Let's price your piece"
          description="Share a few details and our team will respond with a detailed quote within one business day. There's no obligation to purchase."
        />
      </div>
      <div className="mt-12">
        <QuoteForm defaultCollection={collection} />
      </div>
    </div>
  );
}
