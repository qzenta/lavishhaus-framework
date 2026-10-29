import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CatalogImage } from "@/types/catalog";

/**
 * "large" — homepage first screen: full-bleed photo with overlaid copy on
 * mobile, an editorial split (copy left, photo right) from lg up, which suits
 * the mostly portrait client photography.
 * "compact" — page banner; renders as a plain dark band when no photo exists.
 */
export function Hero({
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
  primaryCta,
  secondaryCta,
  size = "large",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  image?: CatalogImage;
  imagePosition?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  size?: "large" | "compact";
}) {
  const large = size === "large";

  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-warm-black",
        large
          ? "min-h-[82svh] lg:grid lg:min-h-[min(84vh,760px)] lg:grid-cols-12 lg:items-stretch"
          : image
            ? "h-[44vh] min-h-[320px] max-h-[460px]"
            : "min-h-[240px]"
      )}
    >
      {image ? (
        <div
          className={cn(
            "absolute inset-0",
            large && "lg:relative lg:col-span-7 lg:col-start-6 lg:row-start-1"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "100vw"}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/75 to-warm-black/20",
              large && "lg:hidden"
            )}
          />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8",
          large
            ? "pt-28 pb-12 sm:pb-16 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:flex lg:max-w-none lg:flex-col lg:justify-center lg:py-20 lg:pr-12 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
            : "pt-24 pb-12 lg:pb-14"
        )}
      >
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
          {eyebrow ? (
            <p className="text-xs font-medium tracking-[0.25em] text-gold-muted uppercase">
              {eyebrow}
            </p>
          ) : null}
          {large ? (
            <h1 className="mt-4 max-w-xl font-heading text-[2.5rem] leading-[1.08] text-ivory sm:text-6xl lg:text-[3.6rem] xl:text-7xl">
              {title}
            </h1>
          ) : (
            <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-ivory sm:text-5xl">
              {title}
            </h1>
          )}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {primaryCta ? (
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-none bg-gold px-7 py-6 text-warm-black hover:bg-gold-muted sm:w-auto"
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-none border-ivory/50 bg-transparent px-7 py-6 text-ivory hover:bg-ivory/10 hover:text-ivory sm:w-auto"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
