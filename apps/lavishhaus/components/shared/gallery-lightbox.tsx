"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { CatalogImage } from "@/types/catalog";

export function GalleryLightbox({ images }: { images: CatalogImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length
    );
  const showNext = () =>
    setActiveIndex((current) => (current === null ? null : (current + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative aspect-square overflow-hidden bg-sand focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-warm-black p-0 sm:rounded-none"
        >
          <DialogTitle className="sr-only">
            {activeIndex !== null ? images[activeIndex].alt : "Gallery image"}
          </DialogTitle>
          {activeIndex !== null ? (
            <div className="relative aspect-4/3 w-full">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery"
                className="absolute top-3 right-3 rounded-full bg-ivory/10 p-2 text-ivory hover:bg-ivory/20"
              >
                <X className="size-5" />
              </button>
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory hover:bg-ivory/20"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory hover:bg-ivory/20"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
