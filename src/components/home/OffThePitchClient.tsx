"use client";

import { useState } from "react";
import { AlbumViewer, type Slide } from "@/components/AlbumViewer";
import { Picture } from "@/components/Picture";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import type { FolderPhoto } from "@/lib/media";

function MomentCard({
  photo,
  index,
}: {
  photo: FolderPhoto;
  index: number;
}) {
  return (
    <div className="mb-4 sm:mb-6 break-inside-avoid">
      <TiltCard3D maxTilt={7} scale={1.02} glareOpacity={0.22}>
        <a
          href={photo.src}
          data-index={index}
          className="group relative block w-full overflow-hidden rounded-2xl bg-stone-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/8 transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] hover:ring-black/15 cursor-pointer"
        >
          <div className="relative overflow-hidden">
            <Picture
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient caption reveal on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 sm:p-5">
              <span className="text-[0.65rem] font-bold tracking-widest text-[#658b41] uppercase mb-1">
                MOMENT {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-snug">
                {photo.alt}
              </p>
            </div>
          </div>
        </a>
      </TiltCard3D>
    </div>
  );
}

export function OffThePitchClient({
  title,
  photos,
  slides,
}: {
  title: string;
  photos: FolderPhoto[];
  slides: Slide[];
}) {
  const [showAll, setShowAll] = useState(false);

  if (!photos.length) return null;

  // Show 12 generous full-width photos initially, or all when expanded
  const visiblePhotos = showAll ? photos : photos.slice(0, 12);

  return (
    <section
      id="off-the-pitch"
      aria-labelledby="moments-title"
      className="scroll-mt-20 bg-[#f9f9f7] text-[#1c1c1c] py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Intro Row */}
        <RevealOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-16">
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

            <div className="lg:col-span-3 lg:pt-4 flex flex-col justify-between gap-4">
              <p className="text-xs sm:text-sm leading-relaxed text-[#555] font-normal">
                More than a game. A club that shows up for its people, celebrates every wedding, victory, and keeps the whole Pallipuram community united.
              </p>
              <div className="text-xs font-semibold tracking-wider text-[#5a7837] uppercase">
                {photos.length} COMMUNITY MOMENTS
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Full-width, Gapless Masonry Grid */}
        <AlbumViewer slides={slides} title={title} albumParam="offthepitch_photo">
          <RevealOnScroll direction="up" delayMs={100}>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
              {visiblePhotos.map((photo, i) => (
                <MomentCard key={photo.file} photo={photo} index={i} />
              ))}
            </div>
          </RevealOnScroll>

          {/* Expand / Collapse Button Bar */}
          {photos.length > 12 && (
            <div className="mt-12 sm:mt-16 text-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="group inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-7 py-3 text-xs font-semibold tracking-widest text-[#1c1c1c] uppercase shadow-sm transition-all duration-300 hover:border-[#5a7837] hover:bg-stone-50 hover:shadow-md active:scale-95 cursor-pointer"
              >
                <span>
                  {showAll
                    ? "SHOW LESS PHOTOS"
                    : `VIEW ALL ${photos.length} PHOTOS (+${photos.length - 12} MORE)`}
                </span>
                <span className={`text-[#5a7837] transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
            </div>
          )}
        </AlbumViewer>
      </div>
    </section>
  );
}

