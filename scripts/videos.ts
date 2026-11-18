// Encodes reels for the site: H.264 720x1280 (9:16), 30 fps, AAC audio, faststart,
// plus a WebP poster frame (<slug>.poster.webp). Already-encoded reels are skipped.
//   npm run videos                              inputs/reels/ → public/videos/
//   npm run videos -- --in inputs/reels/world-cup-fans --out public/gallery/2026-world-cup-fans
//   npm run videos -- --crf 30 --force          re-encode smaller if a reel lands over 3 MB
//   npm run videos -- --only <slug>,<slug> ...  limit any of the above to some reels
//   npm run videos -- --posters ...             only redo the poster frames of encoded reels
// The poster is the most contrasty of five frames from 10 to 70 percent of the way in.
// Needs ffmpeg: on PATH (Windows: winget install Gyan.FFmpeg), or its path in FFMPEG.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

const { values } = parseArgs({
  options: {
    in: { type: "string", default: "inputs/reels" },
    out: { type: "string", default: path.join("public", "videos") },
    crf: { type: "string", default: "28" },
    force: { type: "boolean", default: false },
    only: { type: "string" },
    posters: { type: "boolean", default: false },
  },
});
const only = values.only ? new Set(values.only.split(",").map((s) => s.trim())) : null;
const FFMPEG = process.env.FFMPEG ?? "ffmpeg";
const MAX_BYTES = 3 * 1024 * 1024;
const VIDEO = /\.(mp4|mov|m4v|webm)$/i;

if (spawnSync(FFMPEG, ["-version"]).error) {
  console.error("ffmpeg not found. Install it (Windows: winget install Gyan.FFmpeg) or set FFMPEG to its path, then rerun.");
  process.exit(1);
}

// stdout carries the poster frame as PNG (over 1 MB at 720x1280), hence the larger buffer.
const ffmpeg = (args: string[]) =>
  execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: ["ignore", "pipe", "inherit"],
    maxBuffer: 64 * 1024 * 1024,
  });

// ffmpeg prints "Duration: 00:00:15.14" for its input; this build may have no ffprobe.
function durationSeconds(file: string) {
  const probe = spawnSync(FFMPEG, ["-hide_banner", "-i", file], { encoding: "utf8" });
  const match = /Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/.exec(probe.stderr);
  return match ? Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) : 0;
}

// Samples a few frames and keeps the one with the most contrast (highest spread of
// pixel values), which skips black intros and washed-out fades.
async function writePoster(video: string, poster: string) {
  const duration = durationSeconds(video);
  let best: { frame: Buffer; score: number } | null = null;
  for (const share of [0.1, 0.25, 0.4, 0.55, 0.7]) {
    const at = Math.max(0.5, duration * share).toFixed(2);
    const frame = ffmpeg(["-ss", at, "-i", video, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"]);
    const { channels } = await sharp(frame).stats();
    const score = channels.slice(0, 3).reduce((sum, c) => sum + c.stdev, 0);
    if (!best || score > best.score) best = { frame, score };
  }
  await sharp(best!.frame).webp({ quality: 75 }).toFile(poster);
}

mkdirSync(values.out, { recursive: true });
const sources = existsSync(values.in) ? readdirSync(values.in).filter((f) => VIDEO.test(f)).sort() : [];
let encoded = 0;

for (const file of sources) {
  const source = path.join(values.in, file);
  const slug = file.replace(VIDEO, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const video = path.join(values.out, `${slug}.mp4`);
  const poster = path.join(values.out, `${slug}.poster.webp`);

  if (only && !only.has(slug)) continue;
  if (values.posters) {
    if (!existsSync(video)) continue;
    await writePoster(video, poster);
    console.log(`  poster ${slug}`);
    continue;
  }
  if (!values.force && existsSync(video) && existsSync(poster) && statSync(video).mtimeMs > statSync(source).mtimeMs) {
    console.log(`  skip   ${slug}`);
    continue;
  }

  ffmpeg([
    "-i", source,
    "-vf", "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=black,fps=30",
    "-c:v", "libx264", "-preset", "slow", "-crf", values.crf, "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-ac", "2",
    "-movflags", "+faststart",
    video,
  ]);
  await writePoster(video, poster);

  const { size } = statSync(video);
  const seconds = Math.round(durationSeconds(video));
  console.log(`  done   ${slug}  ${Math.round(size / 1024)} KB, ${seconds}s`);
  if (size > MAX_BYTES) console.warn(`  warn   ${slug} is over 3 MB; rerun with --crf 30 --force, or trim the reel`);
  encoded++;
}

console.log(`videos: ${encoded} encoded from ${values.in} into ${values.out}`);
