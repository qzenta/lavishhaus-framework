import type { Metadata } from "next";
import Image from "next/image";
import { CalendarClock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { catalogImage } from "@/lib/catalog-image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "The Lavish Haus showroom at 635 Ontdekkers Road, Delarey, Randburg. Contact us to arrange a visit and see pieces in person.",
  alternates: { canonical: "/showroom" },
};

// No photograph of the showroom itself exists yet (docs/lavishhaus-assets.md);
// this is a piece photographed on the showroom floor, and the alt says so.
const showroomFloor = catalogImage(
  "suite-grey-lacquer-02",
  "Grey gloss bedroom suite photographed on the Lavish Haus showroom floor"
);

export default function ShowroomPage() {
  const { showroom, contact } = siteConfig;
  const address = `${showroom.streetAddress}, ${showroom.addressLocality}, ${showroom.addressRegion} ${showroom.postalCode}`;
  const mapQuery = encodeURIComponent(`${showroom.streetAddress}, ${showroom.addressLocality}, South Africa`);
  const iconClass = "mt-1 size-5 shrink-0 text-walnut";

  return (
    <div>
      <Hero
        size="compact"
        eyebrow="Visit us"
        title="The Lavish Haus Showroom"
        description="See pieces, coverings and finishes in person before you commit."
        image={catalogImage("suite-grey-lacquer-01", "Grey gloss bedroom suite with channel-tufted headboard on the showroom floor")}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <Breadcrumbs items={[{ name: "Showroom", href: "/showroom" }]} />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden bg-sand">
            <Image
              src={showroomFloor.src}
              alt={showroomFloor.alt}
              fill
              placeholder="blur"
              blurDataURL={showroomFloor.blurDataURL}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-7">
            <div className="flex items-start gap-3">
              <MapPin className={iconClass} aria-hidden="true" />
              <address className="not-italic">
                <p className="font-medium text-charcoal">{showroom.name}</p>
                <p className="text-muted-foreground">{address}</p>
              </address>
            </div>

            <div className="flex items-start gap-3">
              <CalendarClock className={iconClass} aria-hidden="true" />
              <div>
                <p className="font-medium text-charcoal">Visiting</p>
                <p className="text-muted-foreground">{showroom.visitNote}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className={iconClass} aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-charcoal underline-offset-4 hover:underline">
                {contact.phone}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Mail className={iconClass} aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="text-charcoal underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none bg-charcoal py-6 text-ivory hover:bg-warm-black">
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi Lavish Haus, I'd like to arrange a showroom visit.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Arrange a Visit
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none py-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 aspect-4/3 w-full overflow-hidden border border-border sm:aspect-video">
          <iframe
            title="Map showing the Lavish Haus showroom on Ontdekkers Road, Randburg"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
