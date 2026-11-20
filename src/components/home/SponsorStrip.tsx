import { SponsorCard } from "@/components/SponsorCard";
import { ButtonLink } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { club, sponsors } from "@/lib/data";

// Title sponsor large, main sponsors medium, partners in an aligned row.
export function SponsorStrip() {
  const active = sponsors.filter((s) => s.active);
  const titleSponsor = active.find((s) => s.tier === "title");
  const main = active.filter((s) => s.tier === "main");
  const partners = active.filter((s) => s.tier === "partner");

  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="scroll-mt-20 bg-[#f9f9f7] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <RevealOnScroll direction="up">
          {/* Two-column layout: title left, sponsors right — cleanly aligned without unwanted gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: Title & CTA block (aligned flush with site container) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest text-[#5a7837] uppercase">
                04 / PART OF THE CLUB
              </p>
              <h2
                id="sponsors-title"
                className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight uppercase"
              >
                <span className="block text-[#1c1c1c]">OUR</span>
                <span className="block text-[#5a7837]">SPONSORS.</span>
              </h2>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#555]">
                The businesses and members who back the club, on the turf and on every page of this site.
              </p>
              <div className="pt-2">
                <ButtonLink href={club.instagram} variant="secondary">
                  Become a sponsor
                </ButtonLink>
              </div>
            </div>

            {/* RIGHT: Sponsor cards cleanly formatted */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {titleSponsor && (
                <div className="max-w-md">
                  <TiltCard3D maxTilt={6} scale={1.02}>
                    <SponsorCard sponsor={titleSponsor} size="lg" />
                  </TiltCard3D>
                </div>
              )}

              {main.length > 0 && (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {main.map((sponsor) => (
                    <li key={sponsor.name}>
                      <TiltCard3D maxTilt={6} scale={1.02}>
                        <SponsorCard sponsor={sponsor} size="md" />
                      </TiltCard3D>
                    </li>
                  ))}
                </ul>
              )}

              {partners.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-900/75 uppercase">Partners</h3>
                  <ul className="flex flex-wrap gap-4">
                    {partners.map((sponsor) => (
                      <li key={sponsor.name} className="w-full sm:w-64 max-w-xs">
                        <TiltCard3D maxTilt={6} scale={1.02}>
                          <SponsorCard sponsor={sponsor} size="md" mono />
                        </TiltCard3D>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
