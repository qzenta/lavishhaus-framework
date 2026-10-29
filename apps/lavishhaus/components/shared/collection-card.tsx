import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getCategoryBySlug } from "@/content/categories";
import type { Collection } from "@/types/catalog";

export function CollectionCard({ collection }: { collection: Collection }) {
  const category = getCategoryBySlug(collection.categorySlug);

  return (
    <Link
      href={`/collections/${collection.categorySlug}/${collection.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-sand">
        <Image
          src={collection.heroImage.src}
          alt={collection.heroImage.alt}
          fill
          placeholder={collection.heroImage.blurDataURL ? "blur" : "empty"}
          blurDataURL={collection.heroImage.blurDataURL}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {category ? (
          <Badge className="absolute top-3 left-3 rounded-none border-none bg-ivory/90 text-charcoal">
            {category.name}
          </Badge>
        ) : null}
      </div>
      <div className="mt-4">
        <h3 className="font-heading text-xl text-charcoal group-hover:text-walnut">
          {collection.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{collection.tagline}</p>
        {collection.products.length > 0 ? (
          <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
            {collection.products.length} {collection.products.length === 1 ? "piece" : "pieces"}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
