import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  // Gold is reserved for the Captures album and trophy moments, on black.
  gold?: boolean;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, lead, gold = false, className = "" }: Props) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${gold ? "text-gold-400" : "text-crimson-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-2 font-display text-5xl leading-none tracking-wide uppercase sm:text-6xl ${gold ? "text-gold-400" : ""}`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-3 max-w-prose ${gold ? "text-white/80" : "text-ink-900/75"}`}>{lead}</p>}
    </div>
  );
}
