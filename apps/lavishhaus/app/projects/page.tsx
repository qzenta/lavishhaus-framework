import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
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
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }]} />
      <div className="mt-6">
        <SectionHeading
          eyebrow="Projects"
          title="Spaces we've furnished"
          description="A gallery of completed residential and commercial projects."
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
