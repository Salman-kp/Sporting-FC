import type { MetadataRoute } from "next";
import { club } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = club.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
