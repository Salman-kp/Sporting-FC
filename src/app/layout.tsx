import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { club } from "@/lib/data";
import "./globals.css";

// Every route must prerender to complete static HTML. Anything time-based
// (Next up, copyright year) belongs in a client component or the build.
export const ensureStatic = "navigation";

const display = localFont({
  src: "../fonts/bebas-neue-latin-400.woff2",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
  adjustFontFallback: "Arial",
});

const body = localFont({
  src: "../fonts/inter-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(club.siteUrl),
  title: {
    default: `Arts & Sports Club, Malappuram | ${club.name}`,
    template: `%s | ${club.name}`,
  },
  description:
    "Arts and sports club in Mankada Pallipuram, Malappuram: 7s football nights, the Pallippadi League, World Cup fan culture and community events.",
  applicationName: club.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: club.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh font-sans text-ink-900">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
