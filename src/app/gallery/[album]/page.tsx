import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AlbumViewer } from "@/components/AlbumViewer";
import { Picture } from "@/components/Picture";
import { ShareButton } from "@/components/ShareButton";
import { albums, club, getAlbum } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { slideFor } from "@/lib/images";

export function generateStaticParams() {
  return albums.map((album) => ({ album: album.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[album]">): Promise<Metadata> {
  const album = getAlbum((await params).album);
  if (!album) return {};
  return {
    title: `${album.title} photos`,
    description: `${album.title}: ${album.images.length} photos from ${club.name}, the arts and sports club in Mankada Pallipuram, Malappuram.`,
    alternates: { canonical: `/gallery/${album.slug}` },
    openGraph: { images: [album.cover] },
  };
}

// The album depends on URL data (the slug), so it sits behind <Suspense>: a click
// from another page shows the skeleton at once while the prerendered album
// streams in. Page loads get the full static HTML.
export default function AlbumPage({ params }: PageProps<"/gallery/[album]">) {
  return (
    <Suspense fallback={<AlbumSkeleton />}>
      <Album params={params} />
    </Suspense>
  );
}

function AlbumSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-site animate-pulse px-4 py-10 sm:px-8">
      <div className="h-4 w-48 rounded-full bg-ink-900/10" />
      <div className="mt-8 h-14 w-3/4 max-w-md rounded-card bg-ink-900/10" />
      <div className="mt-4 h-4 w-40 rounded-full bg-ink-900/10" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="aspect-4/5 rounded-card bg-ink-900/10" />
        ))}
      </div>
    </div>
  );
}

async function Album({ params }: { params: PageProps<"/gallery/[album]">["params"] }) {
  const album = getAlbum((await params).album);
  if (!album) notFound();

  const captures = album.kind === "captures";
  const slides = album.images.map((image) => slideFor(image.src, image.alt));

  return (
    <div className="mx-auto max-w-site px-4 py-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-900/75">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-ink-900">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/gallery" className="transition-colors hover:text-ink-900">
              Gallery
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink-900">
            {album.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-6xl leading-none tracking-wide uppercase sm:text-7xl">{album.title}</h1>
          {/* Captures' one gold accent: a rule, because gold text fails contrast on white. */}
          {captures && <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded-full bg-gold-400" />}
          <p className="mt-2 text-sm text-ink-900/75">
            {formatDate(album.date)} · {album.images.length} photos
          </p>
          <p className="mt-3 max-w-prose text-ink-900/80">{album.description}</p>
        </div>
        <ShareButton title={`${album.title} · ${club.name}`} path={`/gallery/${album.slug}`} />
      </header>

      <AlbumViewer slides={slides} title={album.title}>
        <ul className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {album.images.map((image, i) => (
            <li key={image.src} className="mb-3 break-inside-avoid">
              <a href={image.src} data-index={i} className="group block overflow-hidden rounded-card shadow-card">
                <Picture
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1200px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  priority={i < 4}
                  className={`h-auto w-full transition-transform duration-300 group-hover:scale-[1.03] ${captures ? "grayscale" : ""}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </AlbumViewer>
    </div>
  );
}
