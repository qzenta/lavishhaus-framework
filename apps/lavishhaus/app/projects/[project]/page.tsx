import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { GalleryLightbox } from "@/components/shared/gallery-lightbox";
import { CtaSection } from "@/components/shared/cta-section";
import { getProjectBySlug, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.coverImage.src],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) notFound();

  return (
    <div>
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden bg-warm-black">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-8">
          <span className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
            {project.category}
          </span>
          <h1 className="mt-2 font-heading text-4xl text-ivory sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-ivory/75">{project.location}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Projects", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` },
          ]}
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal">{project.summary}</p>

        <div className="mt-12">
          <GalleryLightbox images={project.gallery} />
        </div>
      </div>

      <CtaSection
        title="Furnishing a similar space?"
        description="Tell us about your project and we'll help you select the right pieces and finishes."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
      />
    </div>
  );
}
