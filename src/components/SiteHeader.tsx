"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Crest } from "@/components/Crest";
import { InstagramIcon } from "@/components/icons";
import { club } from "@/lib/data";

const navLinks = [
  { href: "#", id: "home", label: "HOME" },
  { href: "#off-the-pitch", id: "off-the-pitch", label: "OFF THE PITCH" },
  { href: "#squads", id: "squads", label: "SQUADS" },
  { href: "#world-cup", id: "world-cup", label: "WORLD CUP" },
  { href: "#sponsors", id: "sponsors", label: "SPONSORS" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section as user scrolls
  useEffect(() => {
    const sectionIds = ["off-the-pitch", "squads", "world-cup", "sponsors"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 300) {
        setActiveSection("home");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent py-4 sm:py-5 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand identity: Crest + SPORTING */}
        <Link
          href="/"
          onClick={(e) => handleNavClick("home", e as unknown as React.MouseEvent<HTMLAnchorElement>)}
          className="group flex items-center gap-2.5 select-none focus-visible:outline-none"
        >
          <div className="relative grid place-items-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 group-active:scale-95">
            <Crest
              sizes="36px"
              decorative
              className="size-8 sm:size-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
            />
          </div>
          <span className="font-display text-lg tracking-wider text-white uppercase sm:text-2xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] transition-colors duration-300 group-hover:text-white/80">
            SPORTING
          </span>
        </Link>

        {/* Center Floating Glass Island (NO black background on navbar) */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`relative block rounded-full px-4 py-1.5 text-[0.78rem] lg:text-[0.82rem] font-semibold tracking-wider uppercase transition-all duration-300 ease-out select-none active:scale-95 ${isActive
                        ? "bg-white text-black shadow-[0_2px_14px_rgba(255,255,255,0.4)] scale-[1.02]"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Follow Button */}
          <Link
            href={club.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[0.72rem] font-semibold tracking-widest text-white uppercase backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:scale-95"
          >
            <InstagramIcon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>FOLLOW</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="relative grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/20 active:scale-90 md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-1.5 size-4">
              <span
                className={`h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0 translate-x-2" : "opacity-100"
                  }`}
              />
              <span
                className={`h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Modal */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${mobileMenuOpen ? "max-h-96 pt-3 px-4" : "max-h-0"
          }`}
      >
        <div className="rounded-2xl border border-white/20 bg-black/70 p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span>{item.label}</span>
                <span className="text-xs">{isActive ? "●" : "→"}</span>
              </a>
            );
          })}

          <div className="pt-2 border-t border-white/10 mt-1">
            <Link
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white text-black py-2.5 text-xs font-semibold tracking-widest uppercase shadow-md transition-transform active:scale-95"
            >
              <InstagramIcon className="size-4" />
              <span>FOLLOW SPORTING FC</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
