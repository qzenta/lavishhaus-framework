import type { CatalogImage } from "@/types/catalog";

/**
 * Placeholder imagery only — swap for real Lavish Haus photography before launch.
 * Deterministic seeds keep the same "photo" across renders and page loads.
 */
export function placeholderImage(
  seed: string,
  alt: string,
  width = 1200,
  height = 900
): CatalogImage {
  return {
    src: `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`,
    alt,
    width,
    height,
  };
}
