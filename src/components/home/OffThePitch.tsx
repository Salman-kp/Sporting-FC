import { OffThePitchClient } from "@/components/home/OffThePitchClient";
import { home } from "@/lib/data";
import { slideFor } from "@/lib/images";
import { folderPhotos } from "@/lib/media";

export function OffThePitch() {
  const { title, folder, captions } = home.moments;
  const photos = folderPhotos(folder, captions, title);
  if (!photos.length) return null;

  const slides = photos.map((photo) => slideFor(photo.src, photo.alt));

  return (
    <OffThePitchClient
      title={title}
      photos={photos}
      slides={slides}
    />
  );
}
