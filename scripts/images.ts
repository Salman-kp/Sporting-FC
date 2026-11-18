// Builds responsive WebP variants for every gallery photo.
//   public/gallery/<album>/<photo>.jpg   originals (2000 px long edge, JPEG q80), committed
//   public/img/<album>/<photo>-<w>.webp  400/800/1200/1600 px variants, generated
//   src/data/generated/images.json       width, height, blur placeholder, variant widths
// Unchanged photos are skipped, so reruns are fast. Runs before dev and build.
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const SOURCE = path.join(root, "public", "gallery");
const OUTPUT = path.join(root, "public", "img");
const MANIFEST = path.join(root, "src", "data", "generated", "images.json");
const WIDTHS = [400, 800, 1200, 1600];
const QUALITY = 75;
const PHOTO = /\.(jpe?g|png|webp)$/i;
const POSTER = /\.poster\.webp$/i;

type Entry = {
  width: number;
  height: number;
  widths: number[];
  blur: string;
  mtimeMs: number;
  size: number;
};

const variantPath = (album: string, base: string, width: number) =>
  path.join(OUTPUT, album, `${base}-${width}.webp`);

async function readManifest(): Promise<Record<string, Entry>> {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

async function listFiles(dir: string): Promise<string[]> {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((e) => e.isFile()).map((e) => path.join(e.parentPath, e.name));
}

const previous = await readManifest();
const manifest: Record<string, Entry> = {};
const expected = new Set<string>();
let built = 0;
let reused = 0;

const albums = existsSync(SOURCE)
  ? (await readdir(SOURCE, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name)
  : [];

for (const album of albums.sort()) {
  // Reel posters (<slug>.poster.webp, from scripts/videos.ts) can share a folder with photos.
  const photos = (await readdir(path.join(SOURCE, album))).filter((f) => PHOTO.test(f) && !POSTER.test(f)).sort();
  for (const file of photos) {
    const source = path.join(SOURCE, album, file);
    const key = `/gallery/${album}/${file}`;
    const base = file.replace(PHOTO, "");
    const { mtimeMs, size } = await stat(source);

    const cached = previous[key];
    if (
      cached?.mtimeMs === mtimeMs &&
      cached.size === size &&
      cached.widths.every((w) => existsSync(variantPath(album, base, w)))
    ) {
      manifest[key] = cached;
      cached.widths.forEach((w) => expected.add(variantPath(album, base, w)));
      reused++;
      continue;
    }

    const meta = await sharp(source).metadata();
    const { width, height } = meta.autoOrient;
    const widths = WIDTHS.filter((w) => w < width);
    if (width <= WIDTHS[WIDTHS.length - 1]) widths.push(width);

    await mkdir(path.join(OUTPUT, album), { recursive: true });
    for (const w of widths) {
      const out = variantPath(album, base, w);
      await sharp(source, { autoOrient: true }).resize({ width: w }).webp({ quality: QUALITY }).toFile(out);
      expected.add(out);
    }
    const blur = await sharp(source, { autoOrient: true }).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();

    manifest[key] = {
      width,
      height,
      widths,
      blur: `data:image/webp;base64,${blur.toString("base64")}`,
      mtimeMs,
      size,
    };
    built++;
    console.log(`  built  ${key} (${width}×${height} → ${widths.join(", ")})`);
  }
}

let removed = 0;
for (const file of await listFiles(OUTPUT)) {
  if (!expected.has(file)) {
    await rm(file);
    removed++;
  }
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`images: ${built} built, ${reused} unchanged, ${removed} stale variants removed`);
