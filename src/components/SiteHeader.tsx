"use client";

import { useState } from "react";
import Link from "next/link";
import { Crest } from "@/components/Crest";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/#off-the-pitch", label: "OFF THE PITCH" },
  { href: "/#squads", label: "SQUADS" },
  { href: "/#world-cup", label: "WORLD CUP" },
  { href: "/#sponsors", label: "SPONSORS" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        {/* Brand identity: Crest + SPORTING */}
        <Link href="/" className="flex items-center gap-2 group">
          <Crest sizes="36px" decorative className="size-8 sm:size-9 drop-shadow-md transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-lg tracking-wider text-white uppercase sm:text-2xl drop-shadow">
            SPORTING
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-9 text-[0.82rem] font-semibold tracking-wider text-white/90">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-1 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#658b41] after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-white/90 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Modal */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 px-5 py-6 backdrop-blur-xl animate-in fade-in duration-200">
          <ul className="flex flex-col gap-4 text-sm font-semibold tracking-widest text-white/90">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#658b41] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
