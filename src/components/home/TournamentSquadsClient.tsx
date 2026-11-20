"use client";

import { useRef, useState, useEffect } from "react";
import { AlbumViewer, type Slide } from "@/components/AlbumViewer";
import { Picture } from "@/components/Picture";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
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
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  if (!photos.length) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  const updateScrollProgress = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  };

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
    updateScrollProgress();
  };

  return (
    <section
      id="squads"
      aria-labelledby="squads-title"
      className="scroll-mt-20 bg-[#f9f9f7] text-[#1c1c1c] py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Intro Row */}
        <RevealOnScroll direction="up">
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
                Trophies, tournament nights, and squad lineups across Malappuram sevens. Select any photo to step inside the archive.
              </p>

              {/* View Switcher & Carousel Navigation Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Mode toggle */}
                <div className="inline-flex rounded-full border border-stone-300 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode("carousel")}
                    aria-label="Carousel filmstrip view"
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-wider uppercase transition-all duration-200 ${
                      viewMode === "carousel"
                        ? "bg-[#5a7837] text-white shadow-sm"
                        : "text-[#555] hover:text-[#1c1c1c]"
                    }`}
                  >
                    FILMSTRIP
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="All squads grid view"
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-wider uppercase transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-[#5a7837] text-white shadow-sm"
                        : "text-[#555] hover:text-[#1c1c1c]"
                    }`}
                  >
                    WALL ({photos.length})
                  </button>
                </div>

                {/* Left/Right scroll controls (only visible in carousel mode) */}
                {viewMode === "carousel" && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={scrollLeft}
                      aria-label="Scroll left"
                      className="grid size-9 sm:size-10 place-items-center rounded-full border border-stone-300 bg-white text-[#1c1c1c] shadow-sm transition-all hover:border-[#5a7837] hover:bg-stone-50 active:scale-95"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={scrollRight}
                      aria-label="Scroll right"
                      className="grid size-9 sm:size-10 place-items-center rounded-full border border-stone-300 bg-white text-[#1c1c1c] shadow-sm transition-all hover:border-[#5a7837] hover:bg-stone-50 active:scale-95"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <AlbumViewer slides={slides} title={title} albumParam="squads_photo">
        {/* CAROUSEL FILMSTRIP MODE */}
        {viewMode === "carousel" ? (
          <div className="relative">
            {/* Horizontal Filmstrip */}
            <div
              ref={scrollRef}
              onScroll={updateScrollProgress}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-8 pb-4 pt-2 scroll-smooth [scrollbar-width:none] snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
            >
              {photos.map((photo, i) => (
                <div
                  key={photo.file}
                  className="snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[320px]"
                >
                  <TiltCard3D maxTilt={8} scale={1.03} glareOpacity={0.25}>
                    <a
                      href={photo.src}
                      data-index={i}
                      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/8 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] hover:ring-black/15 transition-all duration-300"
                    >
                      <Picture
                        src={photo.src}
                        alt={photo.alt}
                        sizes="(min-width: 768px) 320px, (min-width: 640px) 280px, 240px"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Squad badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[0.62rem] font-semibold text-white/90 backdrop-blur-md">
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Hover caption overlay */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                        <span className="text-[0.62rem] font-bold tracking-widest text-[#658b41] uppercase mb-0.5">
                          SPORTING FC SQUAD
                        </span>
                        <p className="text-xs text-white line-clamp-2 font-medium leading-snug">
                          {photo.alt}
                        </p>
                      </div>
                    </a>
                  </TiltCard3D>
                </div>
              ))}
            </div>

            {/* Scroll Progress Bar at the bottom */}
            <div className="mx-auto mt-6 max-w-xs px-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full bg-[#5a7837] rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(8, scrollProgress)}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ALL SQUADS GRID / WALL MODE */
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
              {photos.map((photo, i) => (
                <div key={photo.file} className="mb-4 sm:mb-6 break-inside-avoid">
                  <TiltCard3D maxTilt={7} scale={1.02} glareOpacity={0.22}>
                    <a
                      href={photo.src}
                      data-index={i}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-stone-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/8 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] hover:ring-black/15 transition-all duration-300"
                    >
                      <Picture
                        src={photo.src}
                        alt={photo.alt}
                        sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Squad badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[0.62rem] font-semibold text-white/90 backdrop-blur-md">
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Hover caption overlay */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                        <span className="text-[0.62rem] font-bold tracking-widest text-[#658b41] uppercase mb-0.5">
                          SPORTING FC SQUAD
                        </span>
                        <p className="text-xs sm:text-sm text-white line-clamp-2 font-medium leading-snug">
                          {photo.alt}
                        </p>
                      </div>
                    </a>
                  </TiltCard3D>
                </div>
              ))}
            </div>
          </div>
        )}
      </AlbumViewer>
    </section>
  );
}
