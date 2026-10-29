"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { CatalogImage } from "@/types/catalog";

// The dialog (Radix) is only downloaded the first time a photo is opened.
const LightboxDialog = dynamic(() => import("./lightbox-dialog").then((m) => m.LightboxDialog), {
  ssr: false,
});

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
  const [opened, setOpened] = useState(false);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

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
      onClick={(event) => {
        lastTrigger.current = event.currentTarget;
        setOpened(true);
        setActiveIndex(index);
      }}
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

      {opened ? (
        <LightboxDialog
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={showPrev}
          onNext={showNext}
          returnFocusTo={lastTrigger}
        />
      ) : null}
    </>
  );
}
