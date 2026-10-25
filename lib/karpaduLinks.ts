import links from "@/lib/data/karpadu-links.json";
import type { Locale } from "@/lib/i18n/config";
import { KARPADU_URL } from "@/lib/site";

export type KarpaduPage = keyof typeof links;

export function karpaduHref(page: KarpaduPage, locale: Locale, campaign = "goldyrentacar") {
  const url = new URL(`${KARPADU_URL}/${locale}${links[page][locale]}`);
  url.searchParams.set("utm_source", campaign);
  url.searchParams.set("utm_medium", "referral");
  return url.toString();
}

export const ISLAND_LINKS: KarpaduPage[] = ["athens", "santorini", "mykonos", "rhodes", "corfu", "thessaloniki"];
