import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { faqs } from "@/content/faqs";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about Lavish Haus furniture, quotes, custom commissions and delivery.",
  alternates: { canonical: "/faqs" },
};

const categoryOrder: (typeof faqs)[number]["category"][] = [
  "General",
  "Quotes & Pricing",
  "Custom Furniture",
  "Delivery & Care",
];

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Breadcrumbs items={[{ name: "FAQs", href: "/faqs" }]} />
      <div className="mt-6">
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />
      </div>

      <div className="mt-12 space-y-12">
        {categoryOrder.map((category) => {
          const items = faqs.filter((faq) => faq.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="font-heading text-xl text-charcoal">{category}</h2>
              <div className="mt-4">
                <FaqAccordion items={items} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
