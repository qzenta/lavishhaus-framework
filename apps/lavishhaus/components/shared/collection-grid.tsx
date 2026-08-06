import { CollectionCard } from "@/components/shared/collection-card";
import type { Collection } from "@/types/catalog";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  if (collections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Collections in this category are coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </div>
  );
}
