"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { PauseIcon, PlayIcon, SoundOffIcon } from "@/components/icons";
import { formatDate, formatDuration } from "@/lib/format";
import type { Video } from "@/schemas";

// Reels play with sound and one at a time: starting one stops the one before.
// A click (or Enter/Space) on a reel pauses it, and plays it again.
type Playing = { el: HTMLVideoElement; stop: () => void };
let current: Playing | null = null;

function claim(next: Playing) {
  if (current && current.el !== next.el) current.stop();
  current = next;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// No autoplay under reduced motion or Save-Data: the reel waits for a click.
function autoplayAllowed() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !window.matchMedia(REDUCED_MOTION).matches && !connection?.saveData;
}

// Caption and frame colours for light pages and for dark sections (the World Cup wall).
const tones = {
  light: {
    frame: "bg-ink-900/10 shadow-card",
    muted: "text-ink-900/75",
    body: "text-ink-900/80",
    title: "hover:text-crimson-600",
  },
  dark: {
    frame: "bg-white/5 ring-1 ring-inset ring-white/10",
    muted: "text-white/70",
    body: "text-white/80",
    title: "text-white hover:text-white/80",
  },
} as const;

// A reel from videos.json gets a caption (title, date, Instagram link). A bare reel,
// such as a file on the World Cup wall, has only its file, poster and spoken label.
type Reel = Video | Pick<Video, "src" | "poster" | "title">;

type Props = {
  video: Reel;
  // Starts by itself, with sound, when it scrolls into view. Give it to the first reel only.
  autoPlay?: boolean;
  tone?: keyof typeof tones;
  className?: string;
};

export function ReelPlayer({ video, autoPlay = false, tone = "light", className = "" }: Props) {
  const colours = tones[tone];
  const listed = "instagramUrl" in video ? video : null;
  const ref = useRef<HTMLVideoElement>(null);
  // Whether the reel should be playing while it is in view. A click or another reel
  // starting turns it off; scrolling away only pauses.
  const wantsPlay = useRef(false);
  // When the browser blocks sound, the first tap anywhere turns it on; that same
  // tap on this reel must not also pause it.
  const unmutedAt = useRef(0);
  const descriptionId = useId();
  const allowed = useSyncExternalStore(subscribe, autoplayAllowed, () => true);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    wantsPlay.current = autoPlay && allowed;
  }, [autoPlay, allowed]);

  // Browsers allow sound only after the visitor has interacted with the page. If
  // the autoplay is refused, play muted and turn the sound on at the first tap,
  // click or key press anywhere.
  async function start(fromAutoplay: boolean) {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    try {
      await el.play();
      setNeedsTap(false);
    } catch (error) {
      if (!fromAutoplay || (error as DOMException).name !== "NotAllowedError") return;
      el.muted = true;
      try {
        await el.play();
        setNeedsTap(true);
      } catch {
        // Even muted playback refused: the poster and play button stay.
      }
    }
  }

  useEffect(() => {
    if (!needsTap) return;
    const unmute = () => {
      const el = ref.current;
      if (el && !el.paused) {
        el.muted = false;
        unmutedAt.current = performance.now();
      }
      setNeedsTap(false);
    };
    const options = { capture: true, once: true } as const;
    window.addEventListener("pointerdown", unmute, options);
    window.addEventListener("keydown", unmute, options);
    return () => {
      window.removeEventListener("pointerdown", unmute, options);
      window.removeEventListener("keydown", unmute, options);
    };
  }, [needsTap]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          if (wantsPlay.current && el.paused) void start(true);
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: [0, 0.6] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.pause();
      if (current?.el === el) current = null;
    };
    // start() only reads refs, so the observer is set up once.
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (performance.now() - unmutedAt.current < 800) return;
    if (el.paused) {
      wantsPlay.current = true;
      void start(false);
    } else {
      wantsPlay.current = false;
      el.pause();
    }
  }

  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className={`relative aspect-9/16 overflow-hidden rounded-card ${colours.frame}`}>
        {failed ? (
          <p className={`absolute inset-0 grid place-items-center p-6 text-center text-sm ${colours.muted}`}>
            This reel cannot play here right now.
          </p>
        ) : (
          <>
            <video
              ref={ref}
              src={video.src}
              poster={video.poster}
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              className="size-full object-cover"
              onPlay={(event) => {
                const el = event.currentTarget;
                claim({
                  el,
                  stop: () => {
                    wantsPlay.current = false;
                    el.pause();
                  },
                });
                setPlaying(true);
              }}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? `Pause ${video.title}` : `Play ${video.title}`}
              aria-describedby={listed?.description ? descriptionId : undefined}
              className="group on-dark absolute inset-0 grid cursor-pointer place-items-center focus-visible:-outline-offset-4"
            >
              {/* Icon only, with a soft shadow to read on any frame: play while paused,
                  pause on hover or focus while playing. */}
              <span className="text-3xl text-white drop-shadow-[0_2px_8px_rgb(0_0_0/0.7)]">
                {playing ? (
                  <PauseIcon className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                ) : (
                  <PlayIcon className="translate-x-0.5" />
                )}
              </span>
            </button>
            {needsTap && (
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/75 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                <SoundOffIcon /> Tap for sound
              </span>
            )}
          </>
        )}
      </div>
      {listed && (
        <figcaption>
          <a
            href={listed.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-display text-2xl tracking-wide uppercase transition-colors ${colours.title}`}
          >
            {listed.title}
            <span className="sr-only"> (watch on Instagram, opens in a new tab)</span>
          </a>
          <p className={`text-sm ${colours.muted}`}>
            {formatDate(listed.date)} · {formatDuration(listed.duration)}
          </p>
          {listed.description && (
            <p id={descriptionId} className={`mt-1 text-sm ${colours.body}`}>
              {listed.description}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
