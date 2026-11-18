import type { ReactNode } from "react";

const tones = {
  surface: "bg-white/80 ring-1 ring-inset ring-ink-900/10 shadow-card",
  band: "bg-teal-800 text-white",
  // Sponsor logos sit on solid white so coloured logos stay true.
  light: "bg-white ring-1 ring-inset ring-ink-900/10 shadow-card",
} as const;

type Props = {
  tone?: keyof typeof tones;
  lift?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({ tone = "surface", lift = false, className = "", children }: Props) {
  const hover = lift ? "transition-transform duration-200 hover:-translate-y-1" : "";
  return <div className={`rounded-card ${tones[tone]} ${hover} ${className}`}>{children}</div>;
}
