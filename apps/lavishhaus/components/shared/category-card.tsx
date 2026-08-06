import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Category } from "@/types/catalog";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className="group relative flex aspect-4/5 overflow-hidden bg-charcoal"
    >
      <Image
        src={category.heroImage.src}
        alt={category.heroImage.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/20 to-transparent" />
      <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-6">
        <div>
          <h3 className="font-heading text-2xl text-ivory">{category.name}</h3>
          <p className="mt-1 max-w-[22ch] text-sm text-ivory/70">{category.tagline}</p>
        </div>
        <ArrowUpRight
          className="size-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
