import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CatalogImage } from "@/types/catalog";

export function Hero({
  eyebrow,
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
  size = "large",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  image: CatalogImage;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  size?: "large" | "compact";
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-warm-black ${
        size === "large" ? "h-[88vh] min-h-[560px]" : "h-[48vh] min-h-[360px]"
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/40 to-warm-black/10" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
        {eyebrow ? (
          <span className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base text-ivory/75 sm:text-lg">
          {description}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <Button
                asChild
                size="lg"
                className="rounded-none bg-gold px-7 py-5 text-warm-black hover:bg-gold-muted"
              >
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none border-ivory/40 bg-transparent px-7 py-5 text-ivory hover:bg-ivory/10 hover:text-ivory"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
