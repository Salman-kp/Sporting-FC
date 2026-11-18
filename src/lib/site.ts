import { existsSync } from "node:fs";
import path from "node:path";
import { club } from "@/lib/data";
import { whatsappLink } from "@/lib/format";

// The menu links to sections of the home page (the user's change), so it works from
// any page. Each section has a scroll margin for the sticky header.
export const nav = [
  { href: "/#off-the-pitch", label: "Off the pitch" },
  { href: "/#squads", label: "Squads" },
  { href: "/#world-cup", label: "World Cup" },
  { href: "/#sponsors", label: "Sponsors" },
] as const;

// Set in next.config.ts: the build day in Kerala, YYYY-MM-DD. Server components
// cannot read the clock (Cache Components), so dated UI starts from this.
export const buildDate = process.env.BUILD_DATE ?? "2026-01-01";

export const isPlaceholder = (value: string) => /^\[.+\]$/.test(value);

// null until the club's number is in club.json, so WhatsApp buttons stay hidden
// rather than opening a chat picker.
export const clubWhatsapp = (text: string) => (isPlaceholder(club.whatsapp) ? null : whatsappLink(club.whatsapp, text));

export const addressLine = [club.address.street, club.address.district, club.address.region]
  .concat(isPlaceholder(club.address.postalCode) ? [] : [club.address.postalCode])
  .join(", ");

export const mapsLink =
  club.grounds.home.mapsUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${club.address.street}, ${club.address.district}, Kerala`)}`;

// For files the club supplies later (crest, sponsor logos): render a fallback until they exist.
export const publicFileExists = (file: string) => existsSync(path.join(process.cwd(), "public", file));
