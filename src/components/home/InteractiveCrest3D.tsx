"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import brand from "@/data/brand.json";
import { club } from "@/lib/data";

interface Props {
  className?: string;
}

export function InteractiveCrest3D({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Relative distance from center (-1 to 1)
    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    // Limit maximum 3D rotation to 18 degrees for subtle, premium feel
    const maxDeg = 18;
    const rotateY = Math.max(-maxDeg, Math.min(maxDeg, deltaX * maxDeg));
    const rotateX = Math.max(-maxDeg, Math.min(maxDeg, -deltaY * maxDeg));

    // Glare position on the crest face
    const glareX = Math.max(0, Math.min(100, 50 + deltaX * 40));
    const glareY = Math.max(0, Math.min(100, 50 + deltaY * 40));

    setCoords({ rotateX, rotateY, glareX, glareY, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCoords({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none [perspective:900px] ${className}`}
      style={{ touchAction: "manipulation" }}
    >
      {/* Dynamic 3D ambient shadow & club glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full opacity-60 blur-2xl transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(101,139,65,0.45) 0%, rgba(18,56,67,0.3) 50%, transparent 75%)",
          transform: `translate3d(${coords.rotateY * 1.5}px, ${-coords.rotateX * 1.5}px, -20px) scale(1.1)`,
        }}
      />

      {/* Floating 3D Badge Canvas with subtle ambient breathing */}
      <div className={coords.active ? "" : "animate-float-subtle"}>
        <div
          className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform cursor-pointer"
          style={{
            transform: `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateZ(10px)`,
          }}
        >
        {/* Crest Image with depth */}
        <img
          src={brand.crest.src}
          srcSet={brand.crest.srcSet}
          sizes="(max-width: 640px) 96px, 160px"
          width={brand.crest.width}
          height={brand.crest.height}
          alt={`${club.name} 3D crest`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="size-24 sm:size-36 md:size-40 object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.8)] transition-transform duration-300"
          style={{ transform: "translateZ(25px)" }}
        />

        {/* Specular Light Reflection / Glare layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            transform: "translateZ(30px)",
            opacity: coords.active ? 0.35 : 0.15,
            background: `radial-gradient(circle at ${coords.glareX}% ${coords.glareY}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  </div>
);
}
