import { getImage, srcSetFor, variantUrl } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  // Tells the browser the rendered width so a phone fetches the 400 px file.
  sizes: string;
  // Hero and first-row images: load eagerly with high priority.
  priority?: boolean;
  // Sizing is the caller's: "h-auto w-full" in flow, "size-full object-cover" to fill a box.
  className?: string;
};

// Gallery images from the pre-built WebP variants. Gallery photos never go
// through next/image (Vercel Hobby transformation quota).
export function Picture({ src, alt, sizes, priority = false, className = "" }: Props) {
  const image = getImage(src);
  const largest = image.widths[image.widths.length - 1];
  const fallback = image.widths.find((w) => w >= 800) ?? largest;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- variants are pre-built by scripts/images.ts
    <img
      src={variantUrl(src, fallback)}
      srcSet={srcSetFor(src, image.widths)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={{ backgroundImage: `url(${image.blur})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={className}
    />
  );
}
