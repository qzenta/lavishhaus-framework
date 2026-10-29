import type { Metadata } from "next";
import Image from "next/image";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaSection } from "@/components/shared/cta-section";
import { catalogImage } from "@/lib/catalog-image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description:
    "Lavish Haus is the furniture showroom and customer-facing brand of MicWood Furnitures, offering statement beds, TV walls, dining sets and bespoke pieces in Johannesburg.",
  alternates: { canonical: "/about" },
};

// Copy limited to facts on file (docs/lavishhaus-facts.md F-01, F-16, F-19).
const workshopImage = catalogImage(
  "dining-chairs-tufted",
  "Beige upholstered dining chairs with button-tufted backs in the workshop"
);

export default function AboutPage() {
  return (
    <div>
      <Hero
        size="compact"
        eyebrow="Our story"
        title="About Lavish Haus"
        description="A furniture showroom brand, with MicWood Furnitures behind every piece."
        image={catalogImage("bed-faceted-02", "Bed with an oversized beige faceted-panel headboard on the showroom floor")}
      />

      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-charcoal">
          <p>
            Lavish Haus is a furniture showroom and the customer-facing brand of{" "}
            {siteConfig.manufacturer}. It&apos;s where you come to see the pieces, talk through
            what your space needs and choose what {siteConfig.manufacturer} will make for you.
          </p>
          <p>
            Our range centres on statement pieces: upholstered beds with tall, tailored
            headboards, feature TV walls, dining sets, consoles and kitchen islands. Many of
            the pieces on this site can be adjusted in size, covering or finish, and we take on
            fully bespoke work too.
          </p>
          <p>
            We work on a quotation basis. Tell us what you&apos;re looking for and we&apos;ll
            prepare a no-obligation quote for your specification.
          </p>
        </div>
      </div>

      <section className="bg-warm-black">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-4/5 max-h-[560px] overflow-hidden">
            <Image
              src={workshopImage.src}
              alt={workshopImage.alt}
              fill
              placeholder="blur"
              blurDataURL={workshopImage.blurDataURL}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <SectionHeading
            tone="dark"
            eyebrow="The manufacturer"
            title={`Made by ${siteConfig.manufacturer}`}
            description={`Lavish Haus pieces are made by ${siteConfig.manufacturer}, our manufacturing partner. For custom work, we agree the details with you before anything is made.`}
          />
        </div>
      </section>

      <CtaSection
        title="See it in person"
        description="Contact us to arrange a showroom visit, or start with a quote request."
        primaryCta={{ label: "Visit the Showroom", href: "/showroom" }}
        secondaryCta={{ label: "Request a Quote", href: "/quote" }}
      />
    </div>
  );
}
