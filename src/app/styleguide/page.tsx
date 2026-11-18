import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, InstagramIcon, MessageIcon } from "@/components/icons";
import { Picture } from "@/components/Picture";
import { ReelPlayer } from "@/components/ReelPlayer";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { albums, club, sponsors, videos } from "@/lib/data";
import { getImage } from "@/lib/images";
import { contrast, contrastPairs, palette } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const typeScale = [
  { label: "Display XL · hero", className: "font-display text-7xl leading-[0.9] sm:text-9xl", text: "Floodlight" },
  { label: "Display L · H1", className: "font-display text-6xl leading-none sm:text-7xl", text: "Pallippadi League" },
  { label: "Display M · H2", className: "font-display text-4xl sm:text-5xl", text: "Fan culture" },
  { label: "Display S · card title", className: "font-display text-2xl", text: "Just a 7s night" },
  { label: "Body L · lead", className: "text-lg leading-relaxed", text: "Our squads on tour, the World Cup fan show and the people who back the club." },
  { label: "Body · paragraph", className: "text-base leading-relaxed", text: "Night turf matches under floodlights, flex boards for every World Cup, and the village around them." },
  { label: "Small · meta", className: "text-sm text-ink-900/75", text: "14 Jun 2026 · 0:15" },
  { label: "Eyebrow · label", className: "text-xs font-semibold tracking-[0.2em] uppercase text-crimson-600", text: "Arts & Sports Club" },
];

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-ink-900/10 py-12">
      <h2 id={`${id}-title`} className="font-display text-4xl tracking-wide uppercase">
        {title}
      </h2>
      {note && <p className="mt-2 max-w-prose text-sm text-ink-900/75">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  const album = albums[0];
  const sampleImage = album.images[0];
  const processed = getImage(sampleImage.src);
  const partner = sponsors[0];

  return (
    <div className="mx-auto max-w-site px-4 py-12 sm:px-8">
      <header className="pb-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-crimson-600 uppercase">{club.identityLine}</p>
        <h1 className="mt-3 font-display text-6xl leading-none tracking-wide uppercase sm:text-7xl">
          Styleguide
        </h1>
        <p className="mt-4 max-w-prose text-ink-900/80">
          Design tokens and shared components for {club.name}. This page is for the build team: it is not linked from
          the site and is not indexed.
        </p>
      </header>

      <Section id="colours" title="Colours" note="Sampled from the club crest. Tailwind's default palette is switched off; these are the only colours available.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {palette.map((colour) => (
            <li key={colour.name}>
              <div className={`h-24 rounded-card ring-1 ring-ink-900/15 ring-inset ${colour.swatch}`} />
              <p className="mt-2 font-semibold">{colour.name}</p>
              <p className="font-mono text-sm text-ink-900/75">{colour.hex}</p>
              <p className="mt-1 text-sm text-ink-900/75">{colour.use}</p>
            </li>
          ))}
          <li>
            <div className="h-24 rounded-card bg-white/80 shadow-card ring-1 ring-ink-900/10 ring-inset" />
            <p className="mt-2 font-semibold">White surface</p>
            <p className="font-mono text-sm text-ink-900/75">bg-white/80 shadow-card</p>
            <p className="mt-1 text-sm text-ink-900/75">Cards on the colour-washed page</p>
          </li>
        </ul>
      </Section>

      <Section id="contrast" title="Contrast" note="Text needs 4.5:1, including over the darkest point of the background washes. Gold fails on white, so it is used on black only.">
        <table className="w-full text-left text-sm">
          <thead className="text-ink-900/75">
            <tr>
              <th scope="col" className="py-2 pr-4 font-medium">Pair</th>
              <th scope="col" className="py-2 pr-4 font-medium">Ratio</th>
              <th scope="col" className="py-2 font-medium">Text</th>
            </tr>
          </thead>
          <tbody>
            {contrastPairs.map((pair) => {
              const ratio = contrast(pair.fg, pair.bg, "alpha" in pair ? pair.alpha : 1);
              return (
                <tr key={pair.label} className="border-t border-ink-900/10">
                  <td className="py-2 pr-4">{pair.label}</td>
                  <td className="py-2 pr-4 font-mono">{ratio.toFixed(1)}:1</td>
                  <td className="py-2">{ratio >= 4.5 ? <Tag>Pass</Tag> : <Tag tone="live">Fill only</Tag>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      <Section id="type" title="Type" note="Bebas Neue for display, always uppercase. Inter for everything else. Both self-hosted, no other families.">
        <ul className="space-y-8">
          {typeScale.map((step) => (
            <li key={step.label}>
              <p className="mb-1 font-mono text-xs text-ink-900/75">{step.label}</p>
              <p className={step.className.includes("font-display") ? `${step.className} tracking-wide uppercase` : step.className}>
                {step.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="buttons" title="Buttons and tags" note="One primary action per page. Every button is a link: WhatsApp, Instagram or an internal page.">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={club.instagram} icon={<InstagramIcon />}>
            Follow on Instagram
          </ButtonLink>
          <ButtonLink href="#buttons" variant="secondary" icon={<MessageIcon />}>
            WhatsApp the club
          </ButtonLink>
          <ButtonLink href="#buttons" variant="dark">
            Become a sponsor
          </ButtonLink>
          <a href="#buttons" className="inline-flex items-center gap-1 self-center font-semibold text-teal-800 underline-offset-4 hover:underline">
            Text link <ArrowUpRightIcon />
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Tag>7s night</Tag>
          <Tag tone="live">Live</Tag>
          <span className="rounded-full bg-black p-1">
            <Tag tone="gold">Captures 2025</Tag>
          </span>
        </div>
      </Section>

      <Section id="cards" title="Cards" note="4 px radius. Linked cards lift 4 px over 0.2 s on hover.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <Tag tone="live">Next up</Tag>
            <p className="mt-4 font-display text-3xl tracking-wide uppercase">Surface card</p>
            <p className="mt-2 text-sm text-ink-900/75">White at 80 percent over the washes, a 10 percent ink ring and a soft ink shadow.</p>
          </Card>
          <Card lift className="relative overflow-hidden text-white">
            <Picture
              src={sampleImage.src}
              alt={sampleImage.alt}
              sizes="(min-width: 640px) 33vw, 100vw"
              className="aspect-3/4 h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-900 to-transparent p-5 pt-16">
              <p className="font-display text-3xl tracking-wide uppercase">Pillar card</p>
              <p className="text-sm text-white/85">Photo, label and one line.</p>
            </div>
          </Card>
          <div>
            <Card tone="light" className="grid h-40 place-items-center p-5">
              <span className="font-display text-4xl tracking-wide uppercase">{partner.name}</span>
            </Card>
            <p className="mt-2 text-sm text-ink-900/75">{partner.role}</p>
            <p className="text-xs text-ink-900/75">Light card for sponsor logos; role label under every logo.</p>
          </div>
        </div>
      </Section>

      <Section
        id="picture"
        title="Picture"
        note="Pre-built WebP variants with srcset and sizes, a blur placeholder, and width and height set so the layout never shifts."
      >
        <Picture
          src={sampleImage.src}
          alt={sampleImage.alt}
          sizes="(min-width: 1200px) 1136px, calc(100vw - 2rem)"
          className="h-auto w-full rounded-card"
        />
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm text-ink-900/75">
          <dt>source</dt>
          <dd className="break-all">{sampleImage.src}</dd>
          <dt>original</dt>
          <dd>
            {processed.width}×{processed.height}
          </dd>
          <dt>variants</dt>
          <dd>{processed.widths.join(", ")} px</dd>
        </dl>
      </Section>

      <Section
        id="reel"
        title="Reel player"
        note="Muted autoplay when 60 percent in view, one reel at a time. Tap the video for sound. No autoplay under reduced motion or Save-Data. The sample reel has no video file yet, so it shows the unavailable state once played."
      >
        <ReelPlayer video={videos[0]} className="max-w-xs" />
      </Section>
    </div>
  );
}
