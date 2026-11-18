import { Fragment } from "react";

// Drawn rather than typed: the ✳ character turns into an emoji on some phones.
function Asterisk() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-5 size-[0.55em] shrink-0 text-white/70">
      <path
        d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// CSS-only scrolling strip on the eagle's colours. Two identical halves slide by
// -50% for a seamless loop; screen readers hear the items once.
export function Marquee({ items }: { items: string[] }) {
  const run = (copy: number) => (
    <span aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: 3 }, (_, repeat) => (
        <span key={repeat} aria-hidden={repeat > 0 || undefined} className="flex items-center">
          {items.map((item) => (
            <Fragment key={item}>
              <span>{item}</span>
              <Asterisk />
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden bg-linear-to-r from-ember-500 via-crimson-600 to-plum-700 py-3 font-display text-2xl tracking-wider whitespace-nowrap text-white uppercase sm:text-3xl">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
