import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Goldy Rent a Car – Crete",
    short_name: "Goldy",
    description: "Car rental in Crete with pick-up at Heraklion and Chania airport.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfaf6",
    theme_color: "#0f3e41",
    icons: [{ src: "/img/brand/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
