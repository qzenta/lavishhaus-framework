import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/catalog";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden bg-sand">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <span className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
          {project.category}
        </span>
        <h3 className="mt-1 font-heading text-xl text-charcoal group-hover:text-walnut">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
      </div>
    </Link>
  );
}
