"use client";

import { useState } from "react";
import { LinkIcon } from "@/components/icons";
import { ButtonIcon, buttonClass } from "@/components/ui/Button";

// Phones get the native share sheet; elsewhere the link is copied.
export function ShareButton({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = new URL(path, window.location.origin).href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The visitor closed the share sheet.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={share} className={buttonClass("secondary", "shrink-0")}>
      <ButtonIcon>
        <LinkIcon />
      </ButtonIcon>
      {copied ? "Link copied" : "Share album"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Album link copied" : ""}
      </span>
    </button>
  );
}
