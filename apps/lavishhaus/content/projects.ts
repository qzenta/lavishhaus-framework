import { placeholderImage } from "@/lib/placeholder-image";
import type { Project } from "@/types/catalog";

export const projects: Project[] = [
  {
    slug: "houghton-family-residence",
    title: "Houghton Family Residence",
    location: "Houghton, Johannesburg",
    category: "Residential",
    summary:
      "A full living, dining and bedroom fit-out for a family home, anchored by the Aurelia sectional and a 10-seat Hollis dining table.",
    coverImage: placeholderImage("lh-project-houghton", "Houghton family residence living room fit-out", 1600, 1100),
    gallery: [
      placeholderImage("lh-project-houghton-1", "Houghton residence living room"),
      placeholderImage("lh-project-houghton-2", "Houghton residence dining room"),
      placeholderImage("lh-project-houghton-3", "Houghton residence main bedroom"),
    ],
  },
  {
    slug: "sandton-executive-office",
    title: "Sandton Executive Office",
    location: "Sandton, Johannesburg",
    category: "Commercial",
    summary:
      "Custom Carrow desks and boardroom seating for a financial services office, matched to the building's existing timber panelling.",
    coverImage: placeholderImage("lh-project-sandton", "Sandton executive office custom desk fit-out", 1600, 1100),
    gallery: [
      placeholderImage("lh-project-sandton-1", "Sandton office reception"),
      placeholderImage("lh-project-sandton-2", "Sandton office boardroom"),
    ],
  },
  {
    slug: "camps-bay-outdoor-terrace",
    title: "Camps Bay Outdoor Terrace",
    location: "Camps Bay, Cape Town",
    category: "Residential",
    summary:
      "A Solano modular lounge configuration built for an exposed coastal terrace, tested through a full South African summer.",
    coverImage: placeholderImage("lh-project-campsbay", "Camps Bay outdoor terrace with Solano lounge setting", 1600, 1100),
    gallery: [
      placeholderImage("lh-project-campsbay-1", "Camps Bay terrace at sunset"),
      placeholderImage("lh-project-campsbay-2", "Camps Bay terrace lounge detail"),
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
