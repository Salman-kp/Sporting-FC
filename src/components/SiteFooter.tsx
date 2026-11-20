import Link from "next/link";
import { Crest } from "@/components/Crest";
import { InstagramIcon, MapPinIcon, MessageIcon } from "@/components/icons";
import { BackToTop } from "@/components/ui/BackToTop";
import { club } from "@/lib/data";
import { addressLine, buildDate, clubWhatsapp, mapsLink } from "@/lib/site";

const footerNavLinks = [
  { href: "/", label: "HOME" },
  { href: "/#off-the-pitch", label: "OFF THE PITCH" },
  { href: "/#squads", label: "SQUADS" },
  { href: "/#world-cup", label: "WORLD CUP" },
  { href: "/#sponsors", label: "SPONSORS" },
];

export function SiteFooter() {
  const whatsapp = clubWhatsapp(`Hi ${club.name}, `);

  return (
    <footer className="border-t border-black/10 bg-[#f9f9f7] text-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        {/* Main Grid: Clean 3-Column Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-black/8">
          {/* Col 1: Brand & Club Identity */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link href="/" className="group inline-flex items-center gap-3 w-fit select-none">
              <Crest sizes="40px" decorative className="size-10 shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
              <div>
                <p className="font-display text-xl tracking-wider uppercase text-[#1c1c1c] transition-colors group-hover:text-[#5a7837]">
                  {club.name}
                </p>
                <p className="text-xs text-[#666] tracking-wide">
                  {club.identityLine}
                </p>
              </div>
            </Link>
            <p className="text-xs text-[#666] leading-relaxed max-w-sm pt-1">
              Arts & sports club in Mankada Pallipuram, Malappuram. Dedicated to sevens football, community brotherhood, and youth sports.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <p className="text-[0.7rem] font-bold tracking-widest text-[#5a7837] uppercase mb-3">
              EXPLORE
            </p>
            <ul className="flex flex-col gap-2 text-xs font-semibold tracking-wider text-[#444] uppercase">
              {footerNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-0.5 transition-colors hover:text-[#5a7837]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect & Ground Actions */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <p className="text-[0.7rem] font-bold tracking-widest text-[#5a7837] uppercase mb-1">
              CONNECT
            </p>

            <div className="flex flex-wrap gap-2">
              {/* Instagram */}
              <a
                href={club.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c1c1c] shadow-sm transition-all duration-200 hover:border-[#5a7837] hover:bg-stone-50 hover:text-[#5a7837]"
              >
                <InstagramIcon className="size-3.5" />
                <span>Instagram</span>
              </a>

              {/* WhatsApp */}
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c1c1c] shadow-sm transition-all duration-200 hover:border-[#5a7837] hover:bg-stone-50 hover:text-[#5a7837]"
                >
                  <MessageIcon className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}

              {/* Google Maps Location */}
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c1c1c] shadow-sm transition-all duration-200 hover:border-[#5a7837] hover:bg-stone-50 hover:text-[#5a7837]"
              >
                <MapPinIcon className="size-3.5 text-[#5a7837]" />
                <span>Ground Location</span>
              </a>
            </div>

            <p className="text-[0.72rem] text-[#777] pt-1">
              Ground: Marikkals FC Ground & Pallippadi Turf
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Location & Back To Top */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 text-[0.7rem] sm:text-xs text-[#777] uppercase tracking-wider">
          <p>
            MANKADA PALLIPURAM · MALAPPURAM, KERALA
          </p>

          <div className="flex items-center gap-6">
            <p>
              © SPORTING FC PALLIPPADI {buildDate.slice(0, 4)}
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
