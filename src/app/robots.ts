import type { MetadataRoute } from "next";
import { club } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${club.siteUrl}/sitemap.xml`,
  };
}
