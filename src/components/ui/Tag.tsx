import type { ReactNode } from "react";

const tones = {
  default: "bg-ink-900/8 text-ink-900",
  live: "bg-crimson-600 text-white",
  // Gold is 2.3:1 on white: only on the black Captures band.
  gold: "text-gold-400 ring-1 ring-inset ring-gold-400/60",
} as const;

export function Tag({ tone = "default", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
