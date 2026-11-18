"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
}

export function StadiumAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef({ x: 50, y: 30, targetX: 50, targetY: 30 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize 35 gentle floating dust/light particles
    const particleCount = 35;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.1, // float gently upwards
      opacity: Math.random() * 0.4 + 0.1,
      maxOpacity: Math.random() * 0.5 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Mouse movement to gently shift floodlight
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        spotlightRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 100;
        spotlightRef.current.targetY = ((e.clientY - rect.top) / rect.height) * 100;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Intersection observer to stop rendering when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Animation Loop
    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        // Smoothly interpolate spotlight position
        spotlightRef.current.x += (spotlightRef.current.targetX - spotlightRef.current.x) * 0.05;
        spotlightRef.current.y += (spotlightRef.current.targetY - spotlightRef.current.y) * 0.05;

        // Draw ambient floodlight cone/glow
        const gradX = (spotlightRef.current.x / 100) * width;
        const gradY = (spotlightRef.current.y / 100) * height;
        const gradient = ctx.createRadialGradient(gradX, gradY, 40, gradX, gradY, width * 0.65);
        gradient.addColorStop(0, "rgba(255, 223, 0, 0.06)"); // Warm stadium gold tint
        gradient.addColorStop(0.35, "rgba(116, 172, 223, 0.035)"); // Argentina blue tint
        gradient.addColorStop(1, "rgba(6, 10, 19, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw and update floating dust particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity += p.pulseSpeed;

          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }

          // Wrap edges
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.opacity)})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255, 223, 0, 0.6)";
          ctx.fill();
        }
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full"
    />
  );
}

