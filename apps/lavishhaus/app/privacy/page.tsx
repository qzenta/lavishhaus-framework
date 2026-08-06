import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <h1 className="mt-6 font-heading text-4xl text-charcoal">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-charcoal">
        <section>
          <h2 className="font-heading text-xl text-charcoal">Information We Collect</h2>
          <p className="mt-3 text-muted-foreground">
            When you submit a quote request or contact form, we collect your name, email
            address, phone number and any details you provide about your project. We do not
            collect payment information, as {siteConfig.name} does not currently process
            payments online.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">How We Use Your Information</h2>
          <p className="mt-3 text-muted-foreground">
            We use the information you provide to respond to quote requests and enquiries, and
            to communicate with you about your order. We do not sell your personal information
            to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Data Storage &amp; Security</h2>
          <p className="mt-3 text-muted-foreground">
            Enquiry data is processed through our email and CRM providers and retained only as
            long as necessary to respond to your request and maintain our business records.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Your Rights</h2>
          <p className="mt-3 text-muted-foreground">
            Under the Protection of Personal Information Act (POPIA), you may request access
            to, correction of, or deletion of your personal information at any time by
            contacting us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-charcoal">Contact Us</h2>
          <p className="mt-3 text-muted-foreground">
            Questions about this policy can be directed to{" "}
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
