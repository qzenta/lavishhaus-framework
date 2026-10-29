import type { Metadata } from "next";
import { CalendarClock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContactForm } from "@/components/shared/contact-form";
import { catalogImage } from "@/lib/catalog-image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Lavish Haus by phone, email or WhatsApp, or arrange a visit to the showroom on Ontdekkers Road, Randburg.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact, showroom } = siteConfig;
  const iconClass = "mt-1 size-5 shrink-0 text-walnut";
  const linkClass = "text-charcoal underline-offset-4 hover:underline";

  return (
    <div>
      <Hero
        size="compact"
        eyebrow="Get in touch"
        title="Contact Lavish Haus"
        description="Questions about a piece, a custom commission or a showroom visit — we'd love to hear from you."
        image={catalogImage("console-brass-drawers", "White two-drawer console on a brass-tone frame beneath a round mirror")}
        imagePosition="50% 35%"
      />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="font-heading text-2xl text-charcoal">Talk to us directly</h2>
            <div className="flex items-start gap-3">
              <MessageCircle className={iconClass} aria-hidden="true" />
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone className={iconClass} aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className={iconClass} aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className={iconClass} aria-hidden="true" />
              <address className="text-muted-foreground not-italic">
                {showroom.streetAddress}, {showroom.addressLocality}, {showroom.addressRegion}{" "}
                {showroom.postalCode}
              </address>
            </div>
            <div className="flex items-start gap-3">
              <CalendarClock className={iconClass} aria-hidden="true" />
              <p className="text-muted-foreground">{showroom.visitNote}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl text-charcoal">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
