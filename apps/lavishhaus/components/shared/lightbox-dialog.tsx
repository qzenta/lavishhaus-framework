"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { CatalogImage } from "@/types/catalog";

export function LightboxDialog({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  returnFocusTo,
}: {
  images: CatalogImage[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl border-none bg-warm-black p-0 sm:rounded-none"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") onPrev();
          if (event.key === "ArrowRight") onNext();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusTo.current?.focus();
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
              onClick={onClose}
              aria-label="Close gallery"
              className="absolute top-3 right-3 rounded-full bg-warm-black/60 p-2 text-ivory hover:bg-warm-black/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-warm-black/60 p-2 text-ivory hover:bg-warm-black/80 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
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
  );
}
