import type { MetadataRoute } from "next";
import { albums, club } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = club.siteUrl.replace(/\/$/, "");

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/styleguide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic Album Galleries
  for (const album of albums) {
    routes.push({
      url: `${baseUrl}/gallery/${album.slug}`,
      lastModified: new Date(album.date),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return routes;
}
