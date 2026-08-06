import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { placeholderImage } from "@/lib/placeholder-image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the Lavish Haus showroom in Johannesburg to experience our furniture collections, materials and finishes in person.",
  alternates: { canonical: "/showroom" },
};

export default function ShowroomPage() {
  const image = placeholderImage("lh-showroom", "Interior of the Lavish Haus Johannesburg showroom", 1600, 1100);
  const mapQuery = encodeURIComponent(
    `${siteConfig.showroom.streetAddress}, ${siteConfig.showroom.addressLocality}, South Africa`
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Showroom", href: "/showroom" }]} />
      <div className="mt-6">
        <SectionHeading
          eyebrow="Visit Us"
          title="The Lavish Haus Showroom"
          description="See materials, finishes and full-scale pieces in person before you commit."
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden bg-sand">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="font-medium text-charcoal">{siteConfig.showroom.name}</p>
              <p className="text-muted-foreground">
                {siteConfig.showroom.streetAddress}, {siteConfig.showroom.addressLocality},{" "}
                {siteConfig.showroom.addressRegion} {siteConfig.showroom.postalCode}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="font-medium text-charcoal">Opening Hours</p>
              <ul className="text-muted-foreground">
                {siteConfig.showroom.hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
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

          <Button asChild size="lg" className="w-fit rounded-none bg-charcoal py-6 text-ivory hover:bg-warm-black">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-16 aspect-video w-full overflow-hidden border border-border">
        <iframe
          title="Map to the Lavish Haus showroom"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
