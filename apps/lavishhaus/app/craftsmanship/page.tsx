import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hammer, TreePine, Ruler, Truck } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaSection } from "@/components/shared/cta-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Craftsmanship — Our Process",
  description:
    "See how Lavish Haus furniture is designed, built and finished by MicWood Furnitures in Johannesburg — from timber selection to final placement.",
  alternates: { canonical: "/craftsmanship" },
};

const processStages = [
  {
    icon: Ruler,
    step: "01",
    title: "Design & Consultation",
    description:
      "Every commission starts with a conversation. We discuss your space, lifestyle and aesthetic — then translate your brief into detailed drawings with precise dimensions, materials and finish options.",
  },
  {
    icon: TreePine,
    step: "02",
    title: "Material Selection",
    description:
      "We source solid, FSC-certified hardwoods, full-grain leather hides and performance fabrics. Every material is chosen for how it ages — not just how it looks on day one.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Workshop Build",
    description:
      "Each piece is built to order by the MicWood Furnitures team in Johannesburg. Traditional joinery — mortise and tenon, dovetail, dowel — reinforced where needed, never replaced by shortcuts.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Finishing & Delivery",
    description:
      "Hand-applied finishes — oil, lacquer, upholstery — are inspected under natural light before the piece leaves the workshop. We deliver, position and ensure every detail is right in your space.",
  },
];

const materials = [
  {
    name: "Solid Walnut",
    description:
      "Dark, tight-grained hardwood that deepens with age. Our primary timber for dining tables, bed frames and desks.",
    image: "/images/rooms/living-room/console-table-elephant-sculptures.jpeg",
  },
  {
    name: "Full-Grain Leather",
    description:
      "Unprocessed top grain — marks and patina are the point, not defects. Used on headboards, sofas and desk surfaces.",
    image: "/images/rooms/bedroom/bed-cognac-leather-diamond-headboard.jpeg",
  },
  {
    name: "Brass & Gold Hardware",
    description:
      "Solid brass pulls, hinges and leg caps — lacquered to slow tarnish but left unlacquered on request for a living finish.",
    image: "/images/rooms/dining-room/dining-table-rose-gold-legs-8-chairs.jpeg",
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <Hero
        eyebrow="Our Process"
        title="Built by Hand. Finished with Care."
        description="From timber selection to final placement — every Lavish Haus piece is built to order by MicWood Furnitures in Johannesburg."
        image={{
          src: "/images/rooms/bedroom/bed-honeycomb-tufted-headboard-wood-frame.jpeg",
          alt: "A honeycomb-tufted headboard with exposed wood frame in the MicWood workshop",
          width: 1920,
          height: 1200,
        }}
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        secondaryCta={{ label: "Visit the Showroom", href: "/showroom" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="From Brief to Build"
          title="How your piece comes to life"
          description="A four-stage process refined over a decade of furniture making."
          align="center"
          className="mx-auto"
        />
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {processStages.map((stage) => (
            <div key={stage.step} className="flex gap-5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-none border border-gold/30 bg-sand/40">
                <stage.icon
                  className="size-6 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-gold uppercase">
                  Step {stage.step}
                </p>
                <h3 className="mt-1 font-heading text-xl text-charcoal">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Materials"
            title="Chosen to age, not just to look new"
            description="We work with a curated set of materials — each selected for character, durability and how it will look in ten years, not ten days."
          />
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {materials.map((material) => (
              <div key={material.name} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg text-charcoal">
                  {material.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {material.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">
            The Workshop
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory sm:text-4xl">
            MicWood Furnitures, Johannesburg
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/70">
            Every Lavish Haus piece is manufactured in our Johannesburg workshop.
            No outsourcing, no flat-pack assembly — the team that designs your
            piece is the team that builds and finishes it. This proximity gives
            us control over every joint, every edge and every surface.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gold text-charcoal hover:bg-gold/90 rounded-none px-8"
            >
              <Link href="/quote">Request a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-ivory/30 text-ivory hover:bg-ivory/10 rounded-none px-8"
            >
              <Link href="/showroom">Visit the Showroom</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Have something specific in mind?"
        description="Our design team works directly with the workshop on bespoke commissions — any size, any timber, any finish."
        primaryCta={{ label: "Start a Custom Order", href: "/quote" }}
        secondaryCta={{ label: "Browse Collections", href: "/collections" }}
      />
    </>
  );
}
