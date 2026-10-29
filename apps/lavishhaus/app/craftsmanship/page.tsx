import type { Metadata } from "next";
import Image from "next/image";
import { MessageSquare, PencilRuler, Ruler, Truck } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaSection } from "@/components/shared/cta-section";
import { catalogImage } from "@/lib/catalog-image";

export const metadata: Metadata = {
  title: "Craftsmanship — Our Process",
  description:
    "How a Lavish Haus piece goes from enquiry to delivery: consultation, specification, manufacture by MicWood Furnitures, and placement.",
  alternates: { canonical: "/craftsmanship" },
};

// Process only — no material certifications, joinery claims or timelines
// until the client confirms them (docs/lavishhaus-facts.md F-06, F-07, F-21).
const processStages = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consultation",
    description:
      "Every order starts with a conversation about your space, how you use it and the look you're after. Photos, sketches and measurements all help.",
  },
  {
    icon: PencilRuler,
    step: "02",
    title: "Specification",
    description:
      "We agree the piece with you — size, shape, covering and finish — and confirm it in a written quote before anything is made.",
  },
  {
    icon: Ruler,
    step: "03",
    title: "Manufacture",
    description:
      "Your piece is made to your specification by MicWood Furnitures, our manufacturing partner.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivery & Placement",
    description: "Delivery and placement are arranged with you and confirmed in your quote.",
  },
];

// Details visible in the client's own photographs.
const details = [
  {
    name: "Tailored upholstery",
    description: "Button-tufted, diamond-tufted and channelled upholstery on headboards and chairs.",
    image: catalogImage("dining-chairs-tufted", "Button-tufted upholstered dining chairs in the workshop"),
  },
  {
    name: "Panelled headboard walls",
    description: "Headboards that run the full width of the wall, from faceted panels to horizontal channels.",
    image: catalogImage("bed-faceted-03", "Beige faceted-panel headboard spanning the wall behind a bed"),
  },
  {
    name: "Fluted and gloss finishes",
    description: "Fluted fronts and pedestals with gloss tops on consoles, coffee tables and dining tables.",
    image: catalogImage("coffee-tables-pebble", "Black gloss coffee tables on fluted pedestal bases"),
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <Hero
        size="compact"
        eyebrow="Our process"
        title="Made to your specification"
        description="From the first conversation to placement in your home — how a Lavish Haus piece comes together."
        image={catalogImage("bed-grey-channel-mirror", "Grey channel-tufted headboard between mirrored slat panels with a bolster bench")}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="From brief to delivery"
          title="How your piece comes to life"
          align="center"
          className="mx-auto"
        />
        <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {processStages.map((stage) => (
            <li key={stage.step} className="flex gap-5">
              <div className="flex size-14 shrink-0 items-center justify-center border border-walnut/30 bg-sand/40">
                <stage.icon className="size-6 text-walnut" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-walnut uppercase">
                  Step {stage.step}
                </p>
                <h3 className="mt-1 font-heading text-xl text-charcoal">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="In the detail"
            title="What sets the pieces apart"
            description="A few of the details you'll see across the range."
          />
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.name}>
                <div className="relative aspect-4/5 overflow-hidden bg-sand">
                  <Image
                    src={detail.image.src}
                    alt={detail.image.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={detail.image.blurDataURL}
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg text-charcoal">{detail.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Have something specific in mind?"
        description="Share a photo, a sketch or your measurements and we'll talk you through the options."
        primaryCta={{ label: "Start a Custom Enquiry", href: "/quote?collection=bespoke-commissions" }}
        secondaryCta={{ label: "Browse Collections", href: "/collections" }}
      />
    </>
  );
}
