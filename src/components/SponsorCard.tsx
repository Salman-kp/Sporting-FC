import { Card } from "@/components/ui/Card";
import { publicFileExists } from "@/lib/site";
import type { Sponsor } from "@/schemas";

const heights = { lg: "h-40", md: "h-28", sm: "h-20" } as const;

type Props = {
  sponsor: Sponsor;
  size: keyof typeof heights;
  // Partners show in monochrome; supporters are greyscale with colour on hover.
  mono?: boolean;
};

// Logo on a light card so coloured logos stay legible, role label underneath.
export function SponsorCard({ sponsor, size, mono = false }: Props) {
  const hasLogo = publicFileExists(sponsor.logo);

  return (
    <a href={sponsor.link} target="_blank" rel="sponsored noopener noreferrer" className="group block">
      <Card tone="light" lift className={`grid place-items-center p-4 ${heights[size]}`}>
        {hasLogo ? (
          // eslint-disable-next-line @next/next/no-img-element -- sponsor logos are small SVG/PNG files
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={`max-h-full w-auto max-w-full object-contain ${mono ? "grayscale transition group-hover:grayscale-0" : ""}`}
          />
        ) : (
          <span className="text-center font-display text-3xl tracking-wide uppercase">{sponsor.name}</span>
        )}
      </Card>
      {sponsor.role && <span className="mt-2 block text-sm text-ink-900/75">{sponsor.role}</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
