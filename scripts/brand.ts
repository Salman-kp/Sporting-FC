// Turns the brand files in assets/brand into the site's images. Run after
// replacing either file:  npm run brand   (outputs are committed)
//   crest.png            → public/brand/crest-<w>.webp, transparent outside the shield
//                          (the hero shows it at 160 CSS px, so 480 covers 3x screens)
//                          → src/app/icon.png (tab icon), src/app/apple-icon.png (home
//                            screen; iOS needs an opaque background)
//   droxdev-wordmark.png → public/brand/droxdev-<w>.webp (already transparent; trimmed)
//   both                 → src/data/brand.json: src, srcSet, width, height of each
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "assets/brand/crest.png";
const WORDMARK = "assets/brand/droxdev-wordmark.png";
const WIDTHS = [160, 320, 480];

// Writes the WebP sizes of an image and returns its entry for brand.json.
async function variants(image: Buffer, name: string) {
  const { width, height } = await sharp(image).metadata();
  for (const w of WIDTHS) {
    await sharp(image).resize({ width: w }).webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(`public/brand/${name}-${w}.webp`);
  }
  const largest = WIDTHS[WIDTHS.length - 1];
  return {
    src: `/brand/${name}-${largest}.webp`,
    srcSet: WIDTHS.map((w) => `/brand/${name}-${w}.webp ${w}w`).join(", "),
    width: largest,
    height: Math.round((height / width) * largest),
  };
}

// Gaps in the border strokes narrower than twice this are sealed before the fill.
const SEAL = 10;

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const isPaper = (p: number) => data[p * 4] > 235 && data[p * 4 + 1] > 235 && data[p * 4 + 2] > 235;

// Square max (dilate) or min (erode) filter on a 0/1 mask, done as two 1D passes.
function morph(mask: Uint8Array, radius: number, grow: boolean) {
  const pass = (src: Uint8Array, horizontal: boolean) => {
    const out = new Uint8Array(src.length);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let hit = grow ? 0 : 1;
        for (let d = -radius; d <= radius && hit === (grow ? 0 : 1); d++) {
          const nx = horizontal ? x + d : x;
          const ny = horizontal ? y : y + d;
          const v = nx < 0 || ny < 0 || nx >= width || ny >= height ? 0 : src[ny * width + nx];
          if (grow ? v : !v) hit = grow ? 1 : 0;
        }
        out[y * width + x] = hit;
      }
    }
    return out;
  };
  return pass(pass(mask, true), false);
}

// The ink of the crest, closed (dilate then erode) so the border is a sealed wall
// with its outer edge where it was.
const ink = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) ink[p] = isPaper(p) ? 0 : 1;
const wall = morph(morph(ink, SEAL, true), SEAL, false);

// Flood-fill the paper inwards from the edges, stopping at the wall. The shield's
// own white is enclosed, so it stays.
const outside = new Uint8Array(width * height);
const queue: number[] = [];
const visit = (x: number, y: number) => {
  const p = y * width + x;
  if (!outside[p] && !wall[p] && isPaper(p)) {
    outside[p] = 1;
    queue.push(p);
  }
};
for (let x = 0; x < width; x++) {
  visit(x, 0);
  visit(x, height - 1);
}
for (let y = 0; y < height; y++) {
  visit(0, y);
  visit(width - 1, y);
}
while (queue.length) {
  const p = queue.pop()!;
  const x = p % width;
  const y = (p - x) / width;
  if (x > 0) visit(x - 1, y);
  if (x < width - 1) visit(x + 1, y);
  if (y > 0) visit(x, y - 1);
  if (y < height - 1) visit(x, y + 1);
}

// Pixels within 2 px of the paper are anti-aliased against white: un-blend them
// (colour to alpha) so the edge stays clean on tinted backgrounds.
const near = (p: number, mask: Uint8Array) => {
  const x = p % width;
  return (x > 0 && mask[p - 1]) || (x < width - 1 && mask[p + 1]) || mask[p - width] || mask[p + width];
};
const firstRing = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) if (!outside[p] && near(p, outside)) firstRing[p] = 1;
const rim = firstRing.slice();
for (let p = 0; p < width * height; p++) if (!outside[p] && near(p, firstRing)) rim[p] = 1;

for (let p = 0; p < width * height; p++) {
  const i = p * 4;
  if (outside[p]) {
    data[i + 3] = 0;
  } else if (rim[p]) {
    const alpha = Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]) / 255;
    if (alpha === 0) {
      data[i + 3] = 0;
      continue;
    }
    for (let k = 0; k < 3; k++) data[i + k] = Math.round((data[i + k] - 255 * (1 - alpha)) / alpha);
    data[i + 3] = Math.round(alpha * 255);
  }
}

const cut = await sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
const trimmed = await sharp(cut).trim().png().toBuffer();
const { width: tw, height: th } = await sharp(trimmed).metadata();

await mkdir("public/brand", { recursive: true });
const crest = await variants(trimmed, "crest");
const droxdev = await variants(await sharp(WORDMARK).trim().png().toBuffer(), "droxdev");
await writeFile("src/data/brand.json", JSON.stringify({ crest, droxdev }, null, 2) + "\n");

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
await sharp(trimmed).resize({ width: 192, height: 192, fit: "contain", background: transparent }).png().toFile("src/app/icon.png");
await sharp(trimmed)
  .resize({ width: 150, height: 150, fit: "contain", background: "#ffffff" })
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile("src/app/apple-icon.png");

console.log(`brand: crest ${tw}×${th} and Drox.dev wordmark → ${WIDTHS.join(", ")} px WebP, brand.json, icon.png, apple-icon.png`);
