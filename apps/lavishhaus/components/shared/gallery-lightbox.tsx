"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { CatalogImage } from "@/types/catalog";

/**
 * "grid" — square thumbnails (collection galleries).
 * "feature" — first image large, the rest as a thumbnail strip (one piece).
 */
export function GalleryLightbox({
  images,
  layout = "grid",
  sizes,
}: {
  images: CatalogImage[];
  layout?: "grid" | "feature";
  sizes?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length
    );
  const showNext = () =>
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));

  const thumb = (image: CatalogImage, index: number, className: string, thumbSizes: string) => (
    <button
      key={image.src + index}
      type="button"
      onClick={() => setActiveIndex(index)}
      aria-label={`View larger: ${image.alt}`}
      className={cn(
        "group relative overflow-hidden bg-sand focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        sizes={thumbSizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </button>
  );

  return (
    <>
      {layout === "feature" ? (
        <div className="space-y-3">
          {thumb(images[0], 0, "block aspect-4/5 w-full", sizes ?? "(min-width: 1024px) 40vw, 100vw")}
          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1).map((image, i) => thumb(image, i + 1, "aspect-square", "120px"))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) =>
            thumb(image, index, "aspect-square", sizes ?? "(min-width: 640px) 33vw, 50vw")
          )}
        </div>
      )}

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-warm-black p-0 sm:rounded-none"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") showPrev();
            if (event.key === "ArrowRight") showNext();
          }}
        >
          <DialogTitle className="sr-only">
            {activeIndex !== null ? images[activeIndex].alt : "Gallery image"}
          </DialogTitle>
          {activeIndex !== null ? (
            <div className="relative h-[80svh] w-full">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery"
                className="absolute top-3 right-3 rounded-full bg-warm-black/60 p-2 text-ivory hover:bg-warm-black/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-warm-black/60 p-2 text-ivory hover:bg-warm-black/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-warm-black/60 p-2 text-ivory hover:bg-warm-black/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                  <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-ivory/80" aria-live="polite">
                    {activeIndex + 1} / {images.length}
                  </p>
                </>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
