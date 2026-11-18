// Reads the manifest written by scripts/images.ts.
import type { Slide } from "@/components/AlbumViewer";
import manifest from "@/data/generated/images.json";

export type ProcessedImage = {
  width: number;
  height: number;
  widths: number[];
  blur: string;
};

const entries = manifest as unknown as Record<string, ProcessedImage>;

export const hasImage = (src: string) => src in entries;

export function getImage(src: string): ProcessedImage {
  const entry = entries[src];
  if (!entry) {
    throw new Error(`No processed image for ${src}. Check the path, then run "npm run images".`);
  }
  return entry;
}

// /gallery/2026-spl/001-final.jpg → /img/2026-spl/001-final-800.webp
export const variantUrl = (src: string, width: number) =>
  src.replace(/^\/gallery\//, "/img/").replace(/\.[^.]+$/, `-${width}.webp`);

export const srcSetFor = (src: string, widths: number[]) =>
  widths.map((w) => `${variantUrl(src, w)} ${w}w`).join(", ");

// What the photo viewer (AlbumViewer) needs for one gallery photo.
export function slideFor(src: string, alt: string): Slide {
  const image = getImage(src);
  return {
    src,
    alt,
    width: image.width,
    height: image.height,
    srcSet: srcSetFor(src, image.widths),
    fallback: variantUrl(src, image.widths[image.widths.length - 1]),
  };
}
