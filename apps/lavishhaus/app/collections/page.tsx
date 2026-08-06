import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CategoryCard } from "@/components/shared/category-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/content/categories";

export const metadata: Metadata = {
  title: "Furniture Collections",
  description:
    "Browse Lavish Haus furniture collections — living room, bedroom, dining, office, outdoor and custom furniture, hand-built by MicWood Furnitures.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "Collections", href: "/collections" }]} />
      <div className="mt-6">
        <SectionHeading
          eyebrow="Furniture Collections"
          title="Browse by room"
          description="Every collection is built to order by MicWood Furnitures — explore by space, or start a custom commission."
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
