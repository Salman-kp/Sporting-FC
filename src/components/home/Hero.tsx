"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { InteractiveCrest3D } from "@/components/home/InteractiveCrest3D";
import { InstagramIcon } from "@/components/icons";
import { Picture } from "@/components/Picture";
import { club, home } from "@/lib/data";

export function Hero() {
  const slides = home.hero.slides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, [slides.length]);

  // Automatic slide interval (7 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Subtle 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const slideNum = String(currentIndex + 1).padStart(2, "0");
  const totalNum = String(slides.length).padStart(2, "0");

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-black text-white [perspective:1200px]"
    >
      {/* Background slide images with subtle 3D counter-parallax & Ken Burns effect */}
      <div
        className="absolute inset-0 -z-10 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(1.08) translate3d(${-mouseOffset.x * 14}px, ${-mouseOffset.y * 14}px, 0)`,
        }}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className={`size-full transition-transform ease-out duration-7000 ${
                  isActive ? "scale-105" : "scale-100"
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
            </div>
          );
        })}

        {/* Cinematic dark lighting overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-black/40 to-black/90" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-between px-4 pt-24 pb-6 sm:px-8 sm:pt-28 sm:pb-10 [transform-style:preserve-3d]">
        {/* Top Info Bar with animated slide timeline */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-white/80 pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="font-mono text-xs sm:text-sm tracking-wider">
              <span className="text-white">{slideNum}</span>
              <span className="text-white/40"> / </span>
              <span className="text-white/60">{totalNum}</span>
            </div>
            {/* 7-Second Progress Bar */}
            <div className="h-[2px] w-16 overflow-hidden rounded-full bg-white/20">
              <div
                key={progressKey}
                className="h-full bg-[#658b41] rounded-full animate-[progress_7s_linear_forwards]"
                style={{
                  animation: "heroProgress 7s linear forwards",
                }}
              />
            </div>
          </div>
          <div className="tracking-[0.2em] sm:tracking-[0.25em] text-[0.65rem] sm:text-xs text-white/85">
            MANKADA PALLIPPURAM · MALAPPURAM
          </div>
        </div>

        {/* Centerpiece 3D Crest & Responsive Stacked Title with depth elevation */}
        <div
          className="my-auto pointer-events-none flex flex-col items-center justify-center text-center py-4 sm:py-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 20px)`,
          }}
        >
          <div className="relative mb-3 sm:mb-4 pointer-events-auto">
            <InteractiveCrest3D />
          </div>

          <h1
            id="hero-title"
            className="flex flex-col items-center select-none font-display leading-[0.88] tracking-tight uppercase text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] transition-transform duration-700 hover:scale-[1.01]"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)",
            }}
          >
            <span className="text-white">SPORTING</span>
            <span className="text-white/90">FC</span>
            <span className="text-[#658b41] drop-shadow-[0_4px_24px_rgba(101,139,65,0.45)]">
              PALLIPPADI
            </span>
          </h1>
        </div>

        {/* Bottom Bar: Follow Button, Scroll Prompt & Controls */}
        <div
          className="relative z-30 flex flex-col sm:grid sm:grid-cols-3 sm:items-end gap-4 sm:gap-0 pointer-events-auto"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          {/* EST Year */}
          <div className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase hidden sm:block">
            EST. {club.founded}
          </div>

          {/* Center: Follow on Instagram & Scroll Cue */}
          <div className="flex flex-col items-center gap-4 order-1 sm:order-none">
            <Link
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-30 inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/60 px-5 py-2.5 text-[0.75rem] font-semibold tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-black/85 hover:scale-105 active:scale-95 shadow-lg"
            >
              <InstagramIcon className="size-4 text-white/90 transition-transform duration-300 group-hover:scale-110" />
              <span>FOLLOW THE CLUB</span>
            </Link>

            {/* Subtle animated scroll prompt */}
            <a
              href="#off-the-pitch"
              className="hidden lg:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 group select-none"
            >
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-white/80 font-medium">
                SCROLL TO EXPLORE
              </span>
              <div className="h-6 w-3.5 rounded-full border border-white/40 flex items-start justify-center p-0.5">
                <div className="size-1 rounded-full bg-[#658b41] animate-bounce" />
              </div>
            </a>
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
                className="grid size-9 sm:size-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:border-white/60 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-md"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next image"
                className="grid size-9 sm:size-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:border-white/60 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-md"
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
