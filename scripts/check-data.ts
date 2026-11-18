// Validates every file in src/data before dev and build.
//   npm run check              errors fail, placeholders and missing files warn
//   npm run check -- --strict  placeholders and missing files fail too (run before launch)
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { dataFiles, type Album, type ClubEvent, type Home } from "../src/schemas.ts";

const strict = process.argv.includes("--strict");
const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const soft = (message: string) => (strict ? errors : warnings).push(message);

const MALAYALAM = /[ഀ-ൿ]/;
const PLACEHOLDER = /\[[^\]]+\]/;
const ASSET = /^\/[^\s]+\.[a-z0-9]{2,5}$/i;

function scan(value: unknown, where: string) {
  if (typeof value === "string") {
    if (MALAYALAM.test(value)) errors.push(`${where}: Malayalam text is not allowed on the site`);
    if (PLACEHOLDER.test(value)) soft(`${where}: unfilled placeholder ${JSON.stringify(value)}`);
    if (ASSET.test(value) && !existsSync(path.join(root, "public", value))) soft(`${where}: file not found public${value}`);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => scan(item, `${where}.${i}`));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) scan(item, `${where}.${key}`);
  }
}

const parsed: Record<string, unknown> = {};

for (const [file, schema] of Object.entries(dataFiles)) {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path.join(root, "src", "data", file), "utf8"));
  } catch (error) {
    errors.push(`${file}: ${(error as Error).message}`);
    continue;
  }
  const result = (schema as z.ZodType).safeParse(raw);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${file} → ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    continue;
  }
  parsed[file] = result.data;
  scan(raw, file);
}

const albums = (parsed["albums.json"] ?? []) as Album[];
const albumSlugs = new Set<string>();
for (const album of albums) {
  if (albumSlugs.has(album.slug)) errors.push(`albums.json: duplicate slug "${album.slug}"`);
  albumSlugs.add(album.slug);
  const folder = `/gallery/${album.slug}/`;
  for (const image of album.images) {
    if (!image.src.startsWith(folder)) errors.push(`albums.json → ${album.slug}: ${image.src} is outside ${folder}`);
  }
  if (!album.images.some((image) => image.src === album.cover)) {
    errors.push(`albums.json → ${album.slug}: cover ${album.cover} is not one of the album's images`);
  }
}

const albumRefs = [
  ...((parsed["events.json"] ?? []) as ClubEvent[]).map((e) => ({ file: "events.json", album: e.album })),
  ...((parsed["area.json"] ?? []) as { album?: string }[]).map((a) => ({ file: "area.json", album: a.album })),
];
for (const { file, album } of albumRefs) {
  if (album && !albumSlugs.has(album)) errors.push(`${file}: album "${album}" does not exist in albums.json`);
}

// Home sections that show whatever is in a folder: check each folder and its captions.
const home = parsed["home.json"] as Home | undefined;
// Only the World Cup wall plays reels; the other sections show photos only.
const folderSections = home
  ? [
      { name: "moments", reels: false, ...home.moments },
      { name: "squads", reels: false, ...home.squads },
      { name: "fanZone", reels: true, ...home.fanZone },
    ]
  : [];
for (const { name, reels, folder, captions } of folderSections) {
  const dir = path.join(root, "public", "gallery", folder);
  const media = existsSync(dir) ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|mp4)$/i.test(f)) : [];
  if (!media.length) errors.push(`home.json → ${name}: no photos or reels in public/gallery/${folder}`);
  for (const file of reels ? media.filter((f) => f.endsWith(".mp4")) : []) {
    if (!media.includes(file.replace(/\.mp4$/, ".poster.webp"))) {
      soft(`home.json → ${name}: ${file} has no poster; run npm run videos -- --posters (see README)`);
    }
  }
  for (const file of Object.keys(captions)) {
    if (!media.includes(file)) errors.push(`home.json → ${name}.captions: "${file}" is not in public/gallery/${folder}`);
  }
}

for (const message of warnings) console.warn(`  warn   ${message}`);
for (const message of errors) console.error(`  error  ${message}`);
const files = Object.keys(dataFiles).length;
console.log(`data: ${files} files checked, ${errors.length} errors, ${warnings.length} warnings${strict ? " (strict)" : ""}`);
if (errors.length) process.exit(1);
