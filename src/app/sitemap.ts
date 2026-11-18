import type { MetadataRoute } from "next";
import { club } from "@/lib/data";

// Grows with each route in the Build phase (album images and reels included).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: club.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
