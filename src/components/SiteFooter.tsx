import Link from "next/link";
import { Crest } from "@/components/Crest";
import { InstagramIcon, MapPinIcon, MessageIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { club, sponsors } from "@/lib/data";
import { addressLine, buildDate, clubWhatsapp, mapsLink } from "@/lib/site";

const footerNavLinks = [
  { href: "/", label: "HOME" },
  { href: "/#off-the-pitch", label: "OFF THE PITCH" },
  { href: "/#squads", label: "SQUADS" },
  { href: "/#world-cup", label: "WORLD CUP" },
  { href: "/#sponsors", label: "SPONSORS" },
];

export function SiteFooter() {
  const sponsorNames = sponsors.filter((s) => s.active).map((s) => s.name);
  const whatsapp = clubWhatsapp(`Hi ${club.name}, `);

  return (
    <footer className="border-t border-ink-900/10 bg-[#f9f9f7] text-[#1c1c1c]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        {/* Main Grid: "KEEP PLAYING." on the left, navigation & contact on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Big Statement Headline */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight uppercase select-none">
              <span className="block text-[#1c1c1c]">KEEP</span>
              <span className="block text-[#5a7837]">PLAYING.</span>
            </h2>

            {/* Club Identity Details Preserved */}
            <div className="mt-8 flex items-center gap-4">
              <Crest sizes="48px" decorative className="size-12 shrink-0 drop-shadow-sm" />
              <div>
                <p className="font-display text-xl tracking-wider uppercase text-[#1c1c1c]">
                  {club.name}
                </p>
                <p className="text-xs text-[#666] tracking-wide">
                  {club.identityLine}
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Section Navigation Links */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest text-[#5a7837] uppercase mb-4">
              MENU
            </h3>
            <ul className="flex flex-col gap-3 text-xs font-semibold tracking-wider text-[#333] uppercase">
              {footerNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#5a7837]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Connect, Socials & Actions */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-[#5a7837] uppercase mb-4">
                CONNECT
              </h3>
            </div>

            {/* Quick Action Buttons (WhatsApp / Instagram / Maps) */}
            <div className="flex flex-wrap gap-2.5">
              {whatsapp && (
                <ButtonLink href={whatsapp} icon={<MessageIcon />} className="text-xs py-2 px-3.5">
                  WhatsApp
                </ButtonLink>
              )}
              <ButtonLink
                href={club.instagram}
                variant="secondary"
                icon={<InstagramIcon />}
                className="text-xs py-2 px-3.5"
              >
                Instagram
              </ButtonLink>
            </div>

            {/* Location & Map Link */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 text-xs text-[#555] transition-colors hover:text-[#5a7837]"
            >
              <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-[#5a7837]" />
              <address className="not-italic leading-relaxed">{addressLine}</address>
            </a>
          </div>
        </div>

        {/* Sponsor line if any */}
        {sponsorNames.length > 0 && (
          <p className="mt-14 border-t border-ink-900/10 pt-6 text-xs text-[#666]">
            With thanks to our sponsors: {sponsorNames.join(" · ")}
          </p>
        )}

        {/* Bottom Bar: Location Credits, Copyright & Developer attribution */}
        <div className="mt-8 flex flex-col gap-3 border-t border-ink-900/10 pt-6 text-[0.7rem] sm:text-xs text-[#777] uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between">
          <p>
            MANKADA PALLIPURAM, MALAPPURAM, KERALA
          </p>
          <div className="flex items-center gap-4">
            <p>
              © SPORTING FC PALLIPPADI {buildDate.slice(0, 4)}
            </p>
            <span>·</span>
            <a
              href="https://droxdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="normal-case transition-colors hover:text-[#1c1c1c]"
            >
              Built by Drox.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
