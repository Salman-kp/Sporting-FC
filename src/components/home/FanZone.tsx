import type { CSSProperties } from "react";
import { Picture } from "@/components/Picture";
import { ReelPlayer } from "@/components/ReelPlayer";
import { StadiumAtmosphere } from "@/components/home/StadiumAtmosphere";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { home } from "@/lib/data";
import { folderMedia } from "@/lib/media";

// The World Cup section: the one dark section on the white site, over its own
// background photo (home.json → fanZone.background), and a wall of every photo and
// reel in the section's folder (fanZone.folder) in file-name order, nothing grouped
// or sorted.

type Css = CSSProperties & Record<`--${string}`, string>;

// Hover glows cycle through the four teams' colours; decoration only.
const GLOWS = ["#FFDF00", "#74ACDF", "#DA291C", "#009C3B"];

const lift =
  "rounded-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-18px_var(--glow)]";

// The section background: the photo from home.json under a light 40% shade, plus a
// darker fade only behind the heading, so white text over the brightest parts of
// the photo stays above 4.5:1 (at least 58% shade where the intro text sits).
// Decorative.
function Backdrop({ src }: { src: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-night-950">
      <Picture src={src} alt="" sizes="100vw" className="size-full object-cover" />
      <div className="absolute inset-0 bg-night-950/40" />
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-linear-to-b from-night-950/85 via-night-950/60 to-transparent" />
    </div>
  );
}

export function FanZone() {
  const { eyebrow, title, lead, background, folder, captions } = home.fanZone;
  const tiles = folderMedia(folder, captions, title);
  // Only the first reel on the wall starts by itself; the rest wait for a click.
  const firstReel = tiles.find((tile) => tile.kind === "reel")?.file;

  return (
    <section id="world-cup" aria-labelledby="fanzone-title" className="on-dark relative isolate scroll-mt-28 overflow-hidden py-20 text-white sm:py-28 lg:scroll-mt-20">
      <Backdrop src={background} />
      <StadiumAtmosphere />

      <div className="relative mx-auto max-w-site px-4 sm:px-8">
        <RevealOnScroll direction="up">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/85 uppercase">{eyebrow}</p>
          <h2 id="fanzone-title" className="mt-3 max-w-3xl font-display text-6xl leading-[0.88] tracking-wide uppercase sm:text-8xl">
            {title}
          </h2>
          <p className="mt-6 max-w-prose text-white/90">{lead}</p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll direction="up" delayMs={150}>
        <ul className="mx-auto mt-12 max-w-site columns-2 gap-4 px-4 sm:px-8 md:columns-3 lg:columns-4">
          {tiles.map((tile, i) => (
            <li
              key={tile.file}
              className="mb-4 break-inside-avoid"
              style={{ "--glow": GLOWS[i % GLOWS.length] } as Css}
            >
              <TiltCard3D maxTilt={7} scale={1.02} glareOpacity={0.25}>
                {tile.kind === "reel" ? (
                  <div className={lift}>
                    <ReelPlayer
                      video={{ src: tile.src, poster: tile.poster, title: tile.label }}
                      autoPlay={tile.file === firstReel}
                      tone="dark"
                    />
                  </div>
                ) : (
                  <figure className={`${lift} group overflow-hidden ring-1 ring-white/10`}>
                    <Picture
                      src={tile.src}
                      alt={tile.alt}
                      sizes="(min-width: 1200px) 280px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>
                )}
              </TiltCard3D>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
