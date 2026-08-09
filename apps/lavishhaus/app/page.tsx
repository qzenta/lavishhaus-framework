import type { Metadata } from "next";
import { Hammer, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { Hero } from "@/components/shared/hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CollectionGrid } from "@/components/shared/collection-grid";
import { FeatureCard } from "@/components/shared/feature-card";
import { ProjectCard } from "@/components/shared/project-card";
import { Testimonials } from "@/components/shared/testimonials";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { BrandPillars } from "@/components/shared/brand-pillars";
import { InstagramFeedPlaceholder } from "@/components/shared/instagram-feed-placeholder";
import { CtaSection } from "@/components/shared/cta-section";
import { getFeaturedCollections } from "@/content/collections";
import { projects } from "@/content/projects";
import { testimonials, processSteps } from "@/content/testimonials";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const whyLavishHaus = [
  {
    icon: Hammer,
    title: "Hand-Built Craftsmanship",
    description:
      "Every piece is built to order by MicWood Furnitures — no mass production, no shortcuts in the joinery.",
  },
  {
    icon: Leaf,
    title: "Considered Materials",
    description:
      "Solid, FSC-certified timber and full-grain leather, chosen to age well rather than simply look new.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    description:
      "Structural frames carry a 15-year guarantee, backed by a workshop that stands behind its own joinery.",
  },
  {
    icon: Sparkles,
    title: "Bespoke, When You Need It",
    description:
      "From a single custom dimension to a full room commission, our design team works directly with the workshop.",
  },
];

export default function HomePage() {
  const featuredCollections = getFeaturedCollections();

  return (
    <>
      <Hero
        eyebrow="Johannesburg Showroom Opening Soon"
        title="Luxury Crafted. Timeless Living."
        description="Premium furniture crafted for homes, offices and commercial spaces — designed with restraint, built to last."
        image={{
          src: "/images/hero-living-room.png",
          alt: "A styled living room with cognac leather Chesterfield sofa, walnut side tables and charcoal paneled walls",
          width: 1920,
          height: 1200,
        }}
        primaryCta={{ label: "Shop by Room", href: "/collections" }}
        secondaryCta={{ label: "Request a Quote", href: "/quote" }}
      />

      <BrandPillars />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Featured Collections"
          title="Pieces worth living with"
          description="A first look at the collections defining the Lavish Haus range."
        />
        <div className="mt-12">
          <CollectionGrid collections={featuredCollections} />
        </div>
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Why Lavish Haus"
            title="Craftsmanship you can see and feel"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyLavishHaus.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Recently completed spaces"
          description="A glimpse into homes and businesses furnished by Lavish Haus."
        />
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="From first enquiry to final placement"
          align="center"
          className="mx-auto"
        />
        <div className="mt-14">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="bg-sand/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading eyebrow="Follow Along" title="@lavishhaus" align="center" className="mx-auto" />
          <div className="mt-10">
            <InstagramFeedPlaceholder />
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to furnish your space?"
        description="Tell us about your project and our team will prepare a detailed, no-obligation quote."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        secondaryCta={{ label: "Visit the Showroom", href: "/showroom" }}
      />
    </>
  );
}
