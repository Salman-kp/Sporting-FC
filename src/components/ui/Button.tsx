import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-crimson-600 text-white shadow-crimson hover:bg-crimson-700",
  secondary: "bg-white/60 text-ink-900 ring-1 ring-inset ring-ink-900/25 hover:bg-white hover:ring-ink-900/50",
  dark: "bg-ink-900 text-white hover:bg-teal-800",
  // For the few dark areas: the Captures band and the photo viewer.
  onDark: "text-white ring-1 ring-inset ring-white/50 hover:bg-white/10 hover:ring-white",
} as const;

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant = "primary", className = "") =>
  `inline-flex min-h-12 items-center justify-center gap-2 rounded-card px-5 pt-1 font-display text-xl tracking-wide uppercase transition-colors duration-200 ${variants[variant]} ${className}`;

export const ButtonIcon = ({ children }: { children: ReactNode }) => <span className="-mt-1 text-lg">{children}</span>;

type Props = {
  href: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

// Every action on the site is a link (WhatsApp, Instagram, internal pages), so the
// button is always an anchor. External links open in a new tab and say so.
export function ButtonLink({ href, variant = "primary", icon, children, className = "" }: Props) {
  const classes = buttonClass(variant, className);
  const content = (
    <>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      {children}
    </>
  );

  if (/^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (/^(mailto|tel):/.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
