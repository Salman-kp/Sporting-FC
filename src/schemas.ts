// Schemas for every file in src/data. The site parses each file with these at
// build time (src/lib/data.ts) and `npm run check` runs them before dev and build,
// so a bad entry fails loudly instead of shipping.
//
// Keep this file free of path aliases and non-erasable TypeScript: Node runs it
// directly from scripts/check-data.ts.
import { z } from "zod";

const isoDate = z.iso.date();
const year = z.number().int().min(2000).max(2100);
const publicPath = z.string().regex(/^\/[^\s]+$/, "must be a path under public/, starting with /");
// A [bracketed] value is a fact the club has not supplied yet; `npm run check` lists them.
const placeholder = z.string().regex(/^\[.+\]$/, "must be a [bracketed] placeholder");
const whatsappNumber = z.union([
  z.string().regex(/^91\d{10}$/, "must be 91 followed by the 10-digit mobile number"),
  placeholder,
]);

const place = z.object({
  name: z.string().min(1),
  mapsUrl: z.url().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
});

export const clubSchema = z.object({
  name: z.string().min(1),
  alternateName: z.string().min(1),
  identityLine: z.string().min(1),
  tagline: z.string().min(1),
  founded: year,
  siteUrl: z.url(),
  instagram: z.url(),
  email: z.union([z.email(), placeholder]),
  whatsapp: whatsappNumber,
  address: z.object({
    street: z.string().min(1),
    locality: z.string().min(1),
    district: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.union([z.string().regex(/^\d{6}$/), placeholder]),
    country: z.literal("IN"),
  }),
  areaServed: z.array(z.string().min(1)).min(1),
  grounds: z.object({ roots: place, home: place }),
});

export const albumKinds = ["standard", "captures", "memories"] as const;
export const albumSchema = z.object({
  slug: z.string().regex(/^\d{4}-[a-z0-9]+(-[a-z0-9]+)*$/, "must look like 2026-spl-final"),
  // captures: the yearly black-and-white album with the gold title; memories: the Marikkals-ground album
  kind: z.enum(albumKinds).default("standard"),
  title: z.string().min(1),
  date: isoDate,
  cover: publicPath,
  description: z.string().min(1),
  images: z
    .array(
      z.object({
        src: publicPath,
        alt: z.string().min(1, "every image needs alt text"),
      }),
    )
    .min(1)
    .max(500),
});
export const albumsSchema = z.array(albumSchema);

export const videoSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  date: isoDate,
  src: publicPath,
  poster: publicPath,
  instagramUrl: z.url(),
  duration: z.number().int().positive(),
});
export const videosSchema = z.array(videoSchema).max(12);

export const sponsorTiers = ["title", "main", "partner", "supporter"] as const;
export const sponsorSchema = z
  .object({
    name: z.string().min(1),
    tier: z.enum(sponsorTiers),
    role: z.string().min(1).optional(),
    logo: publicPath,
    link: z.url(),
    since: year,
    active: z.boolean(),
  })
  .refine((s) => s.tier === "supporter" || s.role, {
    message: "title, main and partner sponsors need a role label",
    path: ["role"],
  });
export const sponsorsSchema = z.array(sponsorSchema).superRefine((list, ctx) => {
  const active = (tier: string) => list.filter((s) => s.active && s.tier === tier).length;
  if (active("title") > 1) ctx.addIssue({ code: "custom", message: "only one active title sponsor" });
  if (active("main") > 4) ctx.addIssue({ code: "custom", message: "at most four active main sponsors" });
});

export const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1).optional(),
  photo: publicPath.optional(),
  since: year.optional(),
  officeBearer: z.boolean(),
  order: z.number().int(),
});
export const membersSchema = z.array(memberSchema);

// A list, so the Next up card can roll over to the following entry on its own.
export const nextItemSchema = z.object({
  title: z.string().min(1),
  date: isoDate,
  time: z.string().regex(/^\d{2}:\d{2}$/, "24-hour time, like 19:30").optional(),
  venue: z.string().min(1),
  mapLink: z.url().optional(),
  posterImage: publicPath.optional(),
  presentedBy: z.string().min(1).optional(),
});
export const nextSchema = z.array(nextItemSchema);

export const packageSchema = z.object({
  name: z.string().min(1),
  price: z.number().int().positive().nullable(),
  period: z.string().min(1).optional(),
  includes: z.array(z.string().min(1)).min(1),
  highlight: z.boolean().optional(),
});
export const packagesSchema = z.array(packageSchema).max(3);

export const splSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  format: z.string().min(1),
  venue: z.string().min(1),
  season: z.object({
    year,
    startDate: isoDate.optional(),
    endDate: isoDate.optional(),
    fixtures: publicPath.optional(),
  }),
  editions: z.array(
    z.object({
      year,
      champion: z.string().min(1),
      runnerUp: z.string().min(1),
      poster: publicPath.optional(),
    }),
  ),
});

export const eventCategories = ["football", "fan-culture", "community", "arts"] as const;
export const eventSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: isoDate,
  category: z.enum(eventCategories),
  description: z.string().min(1),
  album: z.string().optional(),
});
export const eventsSchema = z.array(eventSchema);

export const areaSchema = z.array(
  z.object({
    place: z.string().min(1),
    text: z.string().min(1),
    album: z.string().optional(),
  }),
);

export const intentIds = ["donate", "sponsor", "host", "help", "report"] as const;
export const intentSchema = z.object({
  id: z.enum(intentIds),
  label: z.string().min(1),
  description: z.string().min(1),
  whatsappNumber: whatsappNumber,
  prefilledText: z.string().min(1),
  note: z.string().min(1).optional(),
});
export const intentsSchema = z.array(intentSchema).length(intentIds.length);

const homeImage = { image: publicPath, alt: z.string().min(1, "every image needs alt text") };

// Home sections that show everything in a folder of public/gallery, in file-name
// order (src/lib/media.ts). Captions are a photo's alt text or a reel's spoken
// label, by file name.
const folderName = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "a folder in public/gallery, like football-team");
const captions = z.record(z.string(), z.string().min(1)).default({});

export const homeSchema = z.object({
  // The hero photo crossfades through these, picked from all the gallery folders.
  // The first is the one search engines and slow connections see.
  hero: z.object({
    slides: z.array(z.object(homeImage)).min(1).max(8),
    seconds: z.number().int().min(3).max(15).default(6),
  }),
  // Off the pitch: the brotherhood side of the club (winners' visits, weddings,
  // outings), as two drifting rows of photos right after the hero.
  moments: z.object({
    title: z.string().min(1),
    folder: folderName,
    captions,
  }),
  // Tournament squads: the club's squads, kids to seniors, at other clubs' tournaments.
  squads: z.object({
    title: z.string().min(1),
    folder: folderName,
    // Photos shown before the "Show all" button.
    initial: z.number().int().positive().default(12),
    captions,
  }),
  // The World Cup wall: photos and reels (<name>.mp4 with <name>.poster.webp).
  fanZone: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    lead: z.string().min(1),
    // The section background: a photo in a gallery folder, shown under a dark overlay.
    background: publicPath,
    folder: folderName,
    captions,
  }),
});

export const updateFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: isoDate,
  description: z.string().min(1).max(155),
  cover: publicPath.optional(),
});

// File name in src/data → schema; scripts/check-data.ts walks this map.
export const dataFiles = {
  "club.json": clubSchema,
  "home.json": homeSchema,
  "albums.json": albumsSchema,
  "videos.json": videosSchema,
  "sponsors.json": sponsorsSchema,
  "members.json": membersSchema,
  "next.json": nextSchema,
  "packages.json": packagesSchema,
  "spl.json": splSchema,
  "events.json": eventsSchema,
  "area.json": areaSchema,
  "intents.json": intentsSchema,
} as const;

export type Club = z.infer<typeof clubSchema>;
export type Home = z.infer<typeof homeSchema>;
export type Album = z.infer<typeof albumSchema>;
export type Video = z.infer<typeof videoSchema>;
export type Sponsor = z.infer<typeof sponsorSchema>;
export type Member = z.infer<typeof memberSchema>;
export type NextItem = z.infer<typeof nextItemSchema>;
export type Package = z.infer<typeof packageSchema>;
export type Spl = z.infer<typeof splSchema>;
export type ClubEvent = z.infer<typeof eventSchema>;
export type Intent = z.infer<typeof intentSchema>;
export type UpdateFrontmatter = z.infer<typeof updateFrontmatterSchema>;
