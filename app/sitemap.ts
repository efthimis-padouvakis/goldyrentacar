import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { locationPages } from "@/lib/locations";
import { CONTENT_UPDATED, hreflangAlternates, localizedUrl } from "@/lib/seo";
import { NO_CARD_PATH } from "@/lib/site";

const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: NO_CARD_PATH, priority: 0.9, changeFrequency: "monthly" },
  { path: "/fleet", priority: 0.9, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  ...locationPages.map((page) => ({ path: `/locations/${page.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  { path: "/crete-driving-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, page.path),
      lastModified: CONTENT_UPDATED,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: hreflangAlternates(page.path) },
    })),
  );
}
