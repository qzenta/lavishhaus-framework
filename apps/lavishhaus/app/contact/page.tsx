import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lavish Haus by phone, email, WhatsApp or in person at our Johannesburg showroom.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <div className="mt-6">
        <SectionHeading eyebrow="Get in Touch" title="Contact Lavish Haus" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-muted-foreground">
              {siteConfig.showroom.streetAddress}, {siteConfig.showroom.addressLocality},{" "}
              {siteConfig.showroom.addressRegion}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-charcoal hover:text-gold">
              {siteConfig.contact.phone}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <a href={`mailto:${siteConfig.contact.email}`} className="text-charcoal hover:text-gold">
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal hover:text-gold"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
