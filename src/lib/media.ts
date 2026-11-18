// Home-page sections that show "everything in a folder" (the World Cup fan show,
// Tournament squads) read public/gallery/<folder> at build time. Photos are
// processed by scripts/images.ts like any gallery folder; reels are <name>.mp4 with
// <name>.poster.webp from scripts/videos.ts.
import { readdirSync } from "node:fs";
import path from "node:path";
import { hasImage } from "@/lib/images";

export type FolderPhoto = { kind: "photo"; file: string; src: string; alt: string };
export type FolderReel = { kind: "reel"; file: string; src: string; poster: string; label: string };

const PHOTO = /\.(jpe?g|png|webp)$/i;
const POSTER = /\.poster\.webp$/i;

// Every photo and reel in the folder, in file-name order. A caption (by file name)
// is a photo's alt text or a reel's spoken label; files without one are named
// "<name>, photo 3" or "<name>, video 2".
export function folderMedia(folder: string, captions: Record<string, string>, name: string) {
  const files = readdirSync(path.join(process.cwd(), "public", "gallery", folder)).sort();
  let photos = 0;
  let reels = 0;
  return files.flatMap((file): (FolderPhoto | FolderReel)[] => {
    const src = `/gallery/${folder}/${file}`;
    if (file.endsWith(".mp4")) {
      reels += 1;
      const poster = file.replace(/\.mp4$/, ".poster.webp");
      return [
        {
          kind: "reel",
          file,
          src,
          poster: files.includes(poster) ? `/gallery/${folder}/${poster}` : "",
          label: captions[file] ?? `${name}, video ${reels}`,
        },
      ];
    }
    if (PHOTO.test(file) && !POSTER.test(file)) {
      // A photo dropped in while the dev server runs has no WebP sizes until
      // `npm run images`; skip it instead of failing the page. Builds always run
      // the image script first, so nothing is skipped on the live site.
      if (!hasImage(src)) {
        console.warn(`Skipping ${src}: not processed yet. Run "npm run images".`);
        return [];
      }
      photos += 1;
      return [{ kind: "photo", file, src, alt: captions[file] ?? `${name}, photo ${photos}` }];
    }
    return [];
  });
}

export const folderPhotos = (folder: string, captions: Record<string, string>, name: string) =>
  folderMedia(folder, captions, name).filter((item): item is FolderPhoto => item.kind === "photo");
