"use client";

import { useRef } from "react";
import { AlbumViewer, type Slide } from "@/components/AlbumViewer";
import { Picture } from "@/components/Picture";
import type { FolderPhoto } from "@/lib/media";

export function TournamentSquadsClient({
  title,
  photos,
  slides,
}: {
  title: string;
  photos: FolderPhoto[];
  slides: Slide[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!photos.length) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section
      id="squads"
      aria-labelledby="squads-title"
      className="scroll-mt-20 bg-[#f9f9f7] text-[#1c1c1c] py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-3 text-xs font-semibold tracking-widest text-[#5a7837] uppercase">
            02 / ON THE PITCH
          </div>

          <div className="lg:col-span-6">
            <h2
              id="squads-title"
              className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.88] tracking-tight uppercase"
            >
              <span className="block text-[#5a7837]">THE</span>
              <span className="block text-[#5a7837]">SQUADS.</span>
            </h2>
          </div>

          <div className="lg:col-span-3 lg:pt-4 flex flex-col justify-between gap-6">
            <p className="text-xs sm:text-sm leading-relaxed text-[#555] font-normal">
              Every photograph holds a different chapter of the club. Select a collection and step inside.
            </p>

            {/* Carousel Navigation Arrow Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="grid size-11 place-items-center rounded-full border border-stone-300 bg-white text-[#1c1c1c] shadow-sm transition-all hover:border-[#5a7837] hover:bg-stone-50 active:scale-95"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Scroll right"
                className="grid size-11 place-items-center rounded-full border border-stone-300 bg-white text-[#1c1c1c] shadow-sm transition-all hover:border-[#5a7837] hover:bg-stone-50 active:scale-95"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="text-xs font-semibold tracking-wider text-[#5a7837] uppercase ml-2">
                {photos.length} PHOTOS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Two-Row Horizontal Snap Carousel / Filmstrip */}
      <AlbumViewer slides={slides} title={title} albumParam="squads_photo">
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-8 pb-6 pt-2 scroll-smooth [scrollbar-width:none] snap-x snap-mandatory"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.file}
              className="snap-start shrink-0 w-[220px] sm:w-[260px] md:w-[300px] transition-transform duration-300 hover:-translate-y-1"
            >
              <a
                href={photo.src}
                data-index={i}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card bg-stone-200 shadow-card ring-1 ring-black/5 hover:shadow-xl"
              >
                <Picture
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 768px) 300px, (min-width: 640px) 260px, 220px"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                  <span className="text-xs text-white line-clamp-1 font-medium">{photo.alt}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </AlbumViewer>
    </section>
  );
}

