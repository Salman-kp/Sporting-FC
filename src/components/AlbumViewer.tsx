"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, DownloadIcon } from "@/components/icons";

export type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet: string;
  fallback: string;
};

// Custom event to trigger re-render on photo state changes
const CHANGE = "album-viewer-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

const control =
  "grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20";

export function AlbumViewer({
  slides,
  title,
  albumParam = "photo",
  children,
}: {
  slides: Slide[];
  title: string;
  albumParam?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const currentParamValue = new URLSearchParams(search).get(albumParam);
  const photo = Number(currentParamValue);
  const index = Number.isInteger(photo) && photo >= 1 && photo <= slides.length ? photo - 1 : null;
  const slide = index === null ? null : slides[index];

  function setPhoto(idx: number | null, mode: "push" | "replace") {
    const url = new URL(window.location.href);
    if (idx === null) url.searchParams.delete(albumParam);
    else url.searchParams.set(albumParam, String(idx + 1));
    if (mode === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CHANGE));
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (index === null && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = "";
      pushed.current = false;
      opener.current?.focus();
    }
  }, [index]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  // Preload neighbours
  useEffect(() => {
    if (index === null || slides.length < 2) return;
    for (const step of [-1, 1]) {
      const next = slides[(index + step + slides.length) % slides.length];
      const image = new Image();
      image.sizes = "100vw";
      image.srcset = next.srcSet;
    }
  }, [index, slides]);

  function open(at: number, from: HTMLElement) {
    opener.current = from;
    pushed.current = true;
    setPhoto(at, "push");
  }

  function close() {
    if (pushed.current) window.history.back();
    else setPhoto(null, "replace");
  }

  function go(step: number) {
    if (index !== null) setPhoto((index + step + slides.length) % slides.length, "replace");
  }

  function onGridClick(event: MouseEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-index]");
    if (!link) return;
    event.preventDefault();
    open(Number(link.dataset.index), link);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
  }

  function onTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  }

  return (
    <>
      <div onClick={onGridClick}>{children}</div>
      <dialog
        ref={dialogRef}
        aria-label={`${title} photo viewer`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={onKeyDown}
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-ink-900 p-0 text-white"
      >
        {slide && index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p aria-live="polite" className="text-sm text-white/80 tabular-nums">
                Photo {index + 1} of {slides.length}
              </p>
              <div className="flex gap-2">
                <a href={slide.src} download aria-label="Download this photo" className={control}>
                  <DownloadIcon />
                </a>
                <button type="button" onClick={close} aria-label="Close the photo viewer" className={control}>
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div
              className="flex min-h-0 flex-1 items-center justify-center px-2"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={(event) => event.target === event.currentTarget && close()}
            >
              <img
                src={slide.fallback}
                srcSet={slide.srcSet}
                sizes="100vw"
                alt={slide.alt}
                className="max-h-full max-w-full select-none object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="line-clamp-2 text-sm text-white/90">{slide.alt}</p>
              {slides.length > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={control}>
                    <ChevronLeftIcon />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Next photo" className={control}>
                    <ChevronRightIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
