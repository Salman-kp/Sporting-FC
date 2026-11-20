"use client";

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of the pitch"
      className="group inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold tracking-wider text-[#1c1c1c] uppercase shadow-sm transition-all duration-300 hover:border-[#5a7837] hover:bg-stone-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
    >
      <span>TOP OF THE PITCH</span>
      <span className="text-[#5a7837] transition-transform duration-300 group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}

