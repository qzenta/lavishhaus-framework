import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for using the ${siteConfig.name} website and requesting quotes.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
      <h1 className="mt-6 font-heading text-4xl text-charcoal">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-charcoal">
        <section>
          <h2 className="font-heading text-xl text-charcoal">Use of This Website</h2>
          <p className="mt-3 text-muted-foreground">
            This website is provided by {siteConfig.name} to showcase furniture collections
            manufactured by {siteConfig.manufacturer} and to facilitate quote requests. It does
            not currently support online purchases, payments or checkout.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Quotes &amp; Pricing</h2>
          <p className="mt-3 text-muted-foreground">
            Prices are not published on this website as most pieces are made to order. Quotes
            provided in response to a request are valid for the period stated in the quote and
            do not constitute a binding order until confirmed in writing.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Intellectual Property</h2>
          <p className="mt-3 text-muted-foreground">
            All content on this website, including images, text and designs, is the property of{" "}
            {siteConfig.name} and {siteConfig.manufacturer} and may not be reproduced without
            permission.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Limitation of Liability</h2>
          <p className="mt-3 text-muted-foreground">
            While we make every effort to represent our products accurately, materials such as
            solid timber may vary naturally in grain and colour. {siteConfig.name} is not liable
            for minor variations between photography and delivered pieces.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Contact Us</h2>
          <p className="mt-3 text-muted-foreground">
            Questions about these terms can be directed to{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
