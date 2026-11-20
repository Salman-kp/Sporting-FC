import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { club } from "@/lib/data";
import "./globals.css";

// Every route must prerender to complete static HTML.
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
    default: `${club.name} | Arts & Sports Club, Mankada Pallipuram`,
    template: `%s | ${club.name}`,
  },
  description:
    "Official website of Sporting FC Pallippadi, Mankada Pallipuram, Malappuram: 7s football tournament squads, community moments, Pallippadi League, and World Cup fan culture.",
  applicationName: club.name,
  keywords: [
    "Sporting FC Pallippadi",
    "Sporting FC",
    "SFC Pallippadi",
    "Mankada Pallipuram",
    "Pallippuram football club",
    "Malappuram football club",
    "arts and sports club Malappuram",
    "7s football Malappuram",
    "Kerala sevens football",
    "Pallippadi League",
    "SPL",
    "Marikkals FC",
    "Manjeri football",
    "World Cup fan culture Malappuram",
  ],
  authors: [{ name: club.name, url: club.siteUrl }],
  creator: club.name,
  publisher: club.name,
  category: "Sports",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: club.siteUrl,
    title: `${club.name} | Arts & Sports Club, Malappuram`,
    description:
      "Official website of Sporting FC Pallippadi, Mankada Pallipuram, Malappuram: 7s football tournament squads, community moments, and World Cup fan culture.",
    siteName: club.name,
    images: [
      {
        url: "/brand/crest-480.webp",
        width: 480,
        height: 480,
        alt: `${club.name} Club Crest`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${club.name} | Arts & Sports Club, Malappuram`,
    description:
      "Official website of Sporting FC Pallippadi, Mankada Pallipuram, Malappuram: 7s football tournament squads, community moments, and World Cup fan culture.",
    images: ["/brand/crest-480.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "LbHVKb2TdCbn7ZRBsAFknu54ZFQIDVyTO7QYYM6M83k",
      "google9c9cdbdc6ed6c5a8",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

// Google Schema.org SportsOrganization Structured Data (JSON-LD)
const sportsOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["SportsOrganization", "SportsClub"],
  name: club.name,
  alternateName: [club.alternateName, "Sporting FC"],
  url: club.siteUrl,
  logo: `${club.siteUrl}/brand/crest-480.webp`,
  image: `${club.siteUrl}/brand/crest-480.webp`,
  description:
    "Arts and sports club in Mankada Pallipuram, Malappuram, Kerala: 7s football nights, tournament squads, community celebrations, and World Cup fan culture.",
  sport: "Football",
  foundingDate: String(club.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: club.address.street,
    addressLocality: club.address.locality,
    addressRegion: club.address.region,
    addressCountry: club.address.country,
  },
  location: {
    "@type": "Place",
    name: "Marikkals Ground & Pallippadi Turf",
    hasMap: "https://maps.app.goo.gl/iZfk1STQDpPVN6uaA",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.0609,
      longitude: 76.1217,
    },
  },
  areaServed: club.areaServed,
  sameAs: [club.instagram, "https://maps.app.goo.gl/iZfk1STQDpPVN6uaA"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsOrganizationJsonLd) }}
        />
      </head>
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
