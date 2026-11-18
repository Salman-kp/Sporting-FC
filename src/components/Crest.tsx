import brand from "@/data/brand.json";
import { club } from "@/lib/data";

type Props = {
  // Rendered width, so phones fetch the 160 px file for the header.
  sizes: string;
  priority?: boolean;
  // Next to the club's name the crest adds nothing for screen readers.
  decorative?: boolean;
  className?: string;
};

// The club's crest, cut out by scripts/brand.ts from assets/brand/crest.png.
export function Crest({ sizes, priority = false, decorative = false, className = "" }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-built WebP sizes, see scripts/brand.ts
    <img
      src={brand.crest.src}
      srcSet={brand.crest.srcSet}
      sizes={sizes}
      width={brand.crest.width}
      height={brand.crest.height}
      alt={decorative ? "" : `${club.name} crest`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
