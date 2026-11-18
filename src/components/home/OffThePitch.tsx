import { AlbumViewer } from "@/components/AlbumViewer";
import { Picture } from "@/components/Picture";
import { home } from "@/lib/data";
import { slideFor } from "@/lib/images";
import { folderPhotos, type FolderPhoto } from "@/lib/media";

// Compact asymmetric editorial rhythm designed for 10 small/medium photos visible together.
// We use a tight 5-column grid where images stay compact (140px - 220px wide),
// with gentle vertical shifts and alternating aspect ratios for the scattered scrapbook look.
const COMPACT_EDITORIAL = [
  { aspect: "aspect-[4/3]", offset: "sm:translate-y-2", size: "220px" },
  { aspect: "aspect-[3/4]", offset: "sm:-translate-y-4", size: "180px" },
  { aspect: "aspect-square", offset: "sm:translate-y-5", size: "190px" },
  { aspect: "aspect-[4/5]", offset: "sm:-translate-y-2", size: "180px" },
  { aspect: "aspect-[16/10]", offset: "sm:translate-y-4", size: "220px" },
  { aspect: "aspect-[3/4]", offset: "sm:-translate-y-3", size: "180px" },
  { aspect: "aspect-[4/3]", offset: "sm:translate-y-3", size: "200px" },
  { aspect: "aspect-square", offset: "sm:-translate-y-5", size: "180px" },
  { aspect: "aspect-[4/5]", offset: "sm:translate-y-4", size: "180px" },
  { aspect: "aspect-[16/11]", offset: "sm:-translate-y-2", size: "220px" },
];

function CompactPhotoCard({
  photo,
  index,
  cfg,
}: {
  photo: FolderPhoto;
  index: number;
  cfg: (typeof COMPACT_EDITORIAL)[0];
}) {
  return (
    <div className={`relative ${cfg.offset} transition-transform duration-300`}>
      <a
        href={photo.src}
        data-index={index}
        className="group relative block w-full overflow-hidden rounded-card bg-stone-200/90 shadow-card ring-1 ring-black/5 transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className={`${cfg.aspect} w-full overflow-hidden`}>
          <Picture
            src={photo.src}
            alt={photo.alt}
            sizes="(min-width: 1280px) 230px, (min-width: 1024px) 20vw, (min-width: 640px) 30vw, 50vw"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </a>
    </div>
  );
}

export function OffThePitch() {
  const { title, folder, captions } = home.moments;
  const photos = folderPhotos(folder, captions, title);
  if (!photos.length) return null;

  const slides = photos.map((photo) => slideFor(photo.src, photo.alt));

  // First 10 photos in the visible section
  const initialPhotos = photos.slice(0, 10);
  const remainingPhotos = photos.slice(10);

  return (
    <section
      id="off-the-pitch"
      aria-labelledby="moments-title"
      className="scroll-mt-20 bg-[#f9f9f7] text-[#1c1c1c] py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 sm:mb-20">
          <div className="lg:col-span-3 text-xs font-semibold tracking-widest text-[#5a7837] uppercase">
            01 / COMMUNITY
          </div>

          <div className="lg:col-span-6">
            <h2
              id="moments-title"
              className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight uppercase"
            >
              <span className="block text-[#1c1c1c]">OFF THE</span>
              <span className="block text-[#5a7837]">PITCH.</span>
            </h2>
          </div>

          <div className="lg:col-span-3 lg:pt-4 text-xs sm:text-sm leading-relaxed text-[#555] font-normal">
            More than a game. A club that shows up for its people, celebrates every win and keeps the whole community moving.
          </div>
        </div>

        {/* Compact, Scattered Editorial Grid (All 10 images fit compactly in view) */}
        <AlbumViewer slides={slides} title={title} albumParam="offthepitch_photo">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 items-center">
            {initialPhotos.map((photo, i) => {
              const cfg = COMPACT_EDITORIAL[i % COMPACT_EDITORIAL.length];
              return (
                <CompactPhotoCard
                  key={photo.file}
                  photo={photo}
                  index={i}
                  cfg={cfg}
                />
              );
            })}
          </div>

          {/* Show More Section (same compact, staggered styling) */}
          {remainingPhotos.length > 0 && (
            <div className="mt-14 text-center">
              <details className="group/details">
                <summary className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-2.5 text-xs font-semibold tracking-widest text-[#5a7837] uppercase shadow-sm transition-all hover:border-[#5a7837] hover:bg-stone-50">
                  <span className="group-open/details:hidden">
                    Show More Photos ({remainingPhotos.length})
                  </span>
                  <span className="hidden group-open/details:inline">Hide Photos</span>
                </summary>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 items-center animate-in fade-in duration-300">
                  {remainingPhotos.map((photo, i) => {
                    const cfg = COMPACT_EDITORIAL[(i + 10) % COMPACT_EDITORIAL.length];
                    return (
                      <CompactPhotoCard
                        key={photo.file}
                        photo={photo}
                        index={i + 10}
                        cfg={cfg}
                      />
                    );
                  })}
                </div>
              </details>
            </div>
          )}
        </AlbumViewer>
      </div>
    </section>
  );
}
