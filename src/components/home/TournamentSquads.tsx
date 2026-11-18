import { TournamentSquadsClient } from "@/components/home/TournamentSquadsClient";
import { home } from "@/lib/data";
import { slideFor } from "@/lib/images";
import { folderPhotos } from "@/lib/media";

export function TournamentSquads() {
  const { title, folder, captions } = home.squads;
  const photos = folderPhotos(folder, captions, title);
  if (!photos.length) return null;

  const slides = photos.map((photo) => slideFor(photo.src, photo.alt));

  return (
    <TournamentSquadsClient
      title={title}
      photos={photos}
      slides={slides}
    />
  );
}
