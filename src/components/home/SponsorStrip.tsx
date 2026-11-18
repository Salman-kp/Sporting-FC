import { SponsorCard } from "@/components/SponsorCard";
import { ButtonLink } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { club, sponsors } from "@/lib/data";

// Title sponsor large, main sponsors medium, partners in a monochrome row.
export function SponsorStrip() {
  const active = sponsors.filter((s) => s.active);
  const titleSponsor = active.find((s) => s.tier === "title");
  const main = active.filter((s) => s.tier === "main");
  const partners = active.filter((s) => s.tier === "partner");

  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="scroll-mt-20 bg-[#f9f9f7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Two-column layout: title left, sponsors right — matching 06_sponsors.jpg */}
        <RevealOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT: Title block */}
            <div className="lg:col-span-5 lg:pl-8 xl:pl-12">
              <p className="text-xs font-semibold tracking-widest text-[#5a7837] uppercase mb-4">
                04 / PART OF THE CLUB
              </p>
              <h2
                id="sponsors-title"
                className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight uppercase"
              >
                <span className="block text-[#1c1c1c]">OUR</span>
                <span className="block text-[#5a7837]">SPONSORS.</span>
              </h2>
              <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-[#555]">
                The businesses and members who back the club, on the turf and on every page of this site.
              </p>
              {/* Instagram until the /sponsors page and the sponsorship WhatsApp number exist. */}
              {/* <div className="mt-4 flex justify-end"> */}
              <ButtonLink href={club.instagram} variant="secondary">
                Become a sponsor
              </ButtonLink>
              {/* </div> */}
            </div>


            {/* RIGHT: Sponsor cards + button */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {titleSponsor && (
                <div className="max-w-md">
                  <SponsorCard sponsor={titleSponsor} size="lg" />
                </div>
              )}
              {main.length > 0 && (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {main.map((sponsor) => (
                    <li key={sponsor.name}>
                      <SponsorCard sponsor={sponsor} size="md" />
                    </li>
                  ))}
                </ul>
              )}
              {partners.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-900/75 uppercase">Partners</h3>
                  <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {partners.map((sponsor) => (
                      <li key={sponsor.name}>
                        <SponsorCard sponsor={sponsor} size="md" mono />
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
