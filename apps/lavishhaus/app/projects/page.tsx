import type { Metadata } from "next";

import { Hero } from "@/components/shared/hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProjectCard } from "@/components/shared/project-card";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects & Gallery",
  description:
    "A gallery of residential and commercial spaces furnished by Lavish Haus across South Africa.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div>
      <Hero
        size="compact"
        eyebrow="Projects"
        title="Spaces We've Furnished"
        description="A gallery of completed residential and commercial projects across South Africa."
        image={{
          src: "/images/rooms/bedroom/bed-grey-lacquer-gold-mirror-stripe-02-wide.jpeg",
          alt: "Grey lacquer bed with gold mirror-stripe headboard styled in a finished bedroom",
          width: 2000,
          height: 1500,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Breadcrumbs items={[{ name: "Projects", href: "/projects" }]} />
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
