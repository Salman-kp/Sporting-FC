import type { MetadataRoute } from "next";
import { club } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: club.name,
    short_name: "Sporting FC",
    description: club.identityLine,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#152d37",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

