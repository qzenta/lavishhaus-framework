import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CategoryCard } from "@/components/shared/category-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { visibleCategories } from "@/content/categories";

export const metadata: Metadata = {
  title: "Furniture Collections",
  description:
    "Browse Lavish Haus furniture by room: upholstered beds, bedroom suites, TV walls, consoles, dining sets, kitchen islands, desks and custom furniture made by MicWood Furnitures.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Collections", href: "/collections" }]} />
      <div className="mt-6">
        <SectionHeading
          level="h1"
          eyebrow="Furniture collections"
          title="Browse by room"
          description="Explore the range by space, or start a custom enquiry for something made around your room."
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
