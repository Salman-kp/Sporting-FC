"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  scale?: number;
}

export function TiltCard3D({
  children,
  className = "",
  maxTilt = 12,
  perspective = 900,
  glareOpacity = 0.28,
  scale = 1.025,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    glareAlpha: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      const rotateX = (0.5 - y) * maxTilt * 2;
      const rotateY = (x - 0.5) * maxTilt * 2;

      setStyle({
        rotateX,
        rotateY,
        scale,
        glareX: x * 100,
        glareY: y * 100,
        glareAlpha: glareOpacity,
        isHovered: true,
      });
    },
    [maxTilt, glareOpacity, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
      glareAlpha: 0,
      isHovered: false,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transform: `perspective(${perspective}px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale3d(${style.scale}, ${style.scale}, ${style.scale})`,
        transition: style.isHovered
          ? "transform 0.12s cubic-bezier(0.2, 0, 0, 1)"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* Card Content with subtle 3D lift */}
      <div className="relative size-full [transform-style:preserve-3d]">
        {children}

        {/* Specular glare shine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: style.glareAlpha,
            background: `radial-gradient(circle 240px at ${style.glareX}% ${style.glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}

