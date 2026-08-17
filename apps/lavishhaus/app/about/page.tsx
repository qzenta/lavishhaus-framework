import type { Metadata } from "next";
import Image from "next/image";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stats } from "@/components/shared/stats";
import { CtaSection } from "@/components/shared/cta-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description:
    "Lavish Haus is the retail showroom brand of MicWood Furnitures, bringing hand-built, premium furniture to homes and businesses across South Africa.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "2026", label: "Founded" },
  { value: "1", label: "Johannesburg Showroom" },
  { value: "15-Yr", label: "Structural Guarantee" },
  { value: "100%", label: "Made to Order" },
];

export default function AboutPage() {
  const heroImage = {
    src: "/images/rooms/bedroom/bed-black-velvet-arch-headboard-white-dresser.jpeg",
    alt: "A black velvet arch headboard bed styled with a white dresser — Lavish Haus craftsmanship",
    width: 1500,
    height: 2000,
  };

  return (
    <div>
      <div className="relative h-[46vh] min-h-[340px] overflow-hidden bg-warm-black">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-8">
          <span className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
            Our Story
          </span>
          <h1 className="mt-2 font-heading text-4xl text-ivory sm:text-5xl">About Lavish Haus</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-charcoal">
          <p>
            Lavish Haus is a newly established premium furniture showroom, built on a simple
            idea: furniture should be made properly, or not at all.
          </p>
          <p>
            Every piece we sell is manufactured by {siteConfig.manufacturer}, the workshop
            behind Lavish Haus. Lavish Haus is the customer-facing showroom and retail brand —
            the place you come to see, feel and choose what {siteConfig.manufacturer} will build
            for you.
          </p>
          <p>
            Our first showroom is opening in Johannesburg, built to let you experience materials
            and finishes in person before committing to a piece that will live in your home for
            decades.
          </p>
          <p>
            We work in solid, sustainably sourced timber and full-grain leather, favouring
            traditional joinery over shortcuts, and we stand behind that work with a structural
            guarantee on every frame we build.
          </p>
        </div>

        <div className="mt-16">
          <Stats stats={stats} />
        </div>
      </div>

      <section className="relative overflow-hidden bg-warm-black">
        <Image
          src="/images/rooms/bedroom/bed-grey-lacquer-gold-mirror-stripe-01.jpeg"
          alt="Detail of hand-finished joinery on a Lavish Haus bed frame"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-black via-warm-black/85 to-warm-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="The Workshop"
            title={`Every piece is built by ${siteConfig.manufacturer}`}
            description="Manufacturing is handled entirely in-house by our workshop partner — no outsourcing, no drop-shipped components."
            className="[&_h2]:text-ivory [&_p]:text-ivory/70"
          />
        </div>
      </section>

      <CtaSection
        title="See it in person"
        description="Book a visit to the Johannesburg showroom to experience materials and finishes first-hand."
        primaryCta={{ label: "Visit the Showroom", href: "/showroom" }}
        secondaryCta={{ label: "Request a Quote", href: "/quote" }}
      />
    </div>
  );
}
