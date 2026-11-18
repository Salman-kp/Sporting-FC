"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Crest } from "@/components/Crest";
import { InstagramIcon } from "@/components/icons";
import { Picture } from "@/components/Picture";
import { club, home } from "@/lib/data";

export function Hero() {
  const slides = home.hero.slides;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideNum = String(currentIndex + 1).padStart(2, "0");
  const totalNum = String(slides.length).padStart(2, "0");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-black text-white"
    >
      {/* Background slide images */}
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <Picture
              src={slide.image}
              alt={slide.alt}
              sizes="100vw"
              priority={idx === 0}
              className="size-full object-cover object-center brightness-75 contrast-110"
            />
          </div>
        ))}
        {/* Subtle dark overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-black/40 to-black/90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-between px-4 pt-20 pb-6 sm:px-8 sm:pt-28 sm:pb-10">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-white/80 pt-2">
          <div className="font-mono text-xs sm:text-sm tracking-wider">
            <span className="text-white">{slideNum}</span>
            <span className="text-white/40"> / </span>
            <span className="text-white/60">{totalNum}</span>
          </div>
          <div className="tracking-[0.2em] sm:tracking-[0.25em] text-[0.65rem] sm:text-xs text-white/85">
            MANKADA PALLIPPURAM · MALAPPURAM
          </div>
        </div>

        {/* Centerpiece Crest & Responsive Stacked Title */}
        <div className="my-auto flex flex-col items-center justify-center text-center py-4 sm:py-0">
          <div className="relative mb-3 sm:mb-4">
            <div className="relative z-10 transition-transform duration-500 hover:scale-105">
              <Crest
                sizes="(max-width: 640px) 80px, 140px"
                decorative
                priority
                className="size-20 sm:size-32 md:size-36 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

          <h1
            id="hero-title"
            className="flex flex-col items-center select-none font-display leading-[0.88] tracking-tight uppercase text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]"
          >
            <span className="text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">SPORTING</span>
            <span className="text-white/90 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">FC</span>
            <span className="text-[#658b41] drop-shadow-[0_3px_16px_rgba(0,0,0,0.9)]">PALLIPPADI</span>
          </h1>
        </div>

        {/* Bottom Bar: Follow Button & Controls nicely positioned on mobile */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-end gap-4 sm:gap-0">
          {/* EST Year */}
          <div className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase hidden sm:block">
            EST. {club.founded}
          </div>

          {/* Follow on Instagram button */}
          <div className="flex justify-center order-1 sm:order-none">
            <Link
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-[0.75rem] font-semibold tracking-widest text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-black/75 hover:scale-105"
            >
              <InstagramIcon className="size-4 text-white/90" />
              <span>FOLLOW THE CLUB</span>
            </Link>
          </div>

          {/* Slide Arrow Controls */}
          <div className="flex justify-between sm:justify-end items-center gap-2 order-2 sm:order-none">
            <span className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase sm:hidden">
              EST. {club.founded}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous image"
                className="grid size-9 sm:size-10 place-items-center rounded-sm border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/80 active:scale-95"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next image"
                className="grid size-9 sm:size-10 place-items-center rounded-sm border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/80 active:scale-95"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
