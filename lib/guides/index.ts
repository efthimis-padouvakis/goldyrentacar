import type { Locale } from "@/lib/i18n/config";
import de from "./de";
import el from "./el";
import en from "./en";
import fr from "./fr";
import it from "./it";
import nl from "./nl";
import pl from "./pl";

// Long-form copy for a location page, per locale. A locale without a guide keeps the short
// intro + tip from lib/locations.ts, so a page is never half translated.
// Rules: CarRentalNext/docs/seo.md (title ≤ 60, description 120–165, FAQ answers ≤ 320, real drive times).
export interface PlaceGuide {
  /** Short place name for section headings, e.g. "Heraklion Airport" */
  place: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  points: string[];
  pickup: { title: string; text: string };
  nearby: { name: string; time: string; text: string }[];
  trips: { title: string; time: string; text: string }[];
  tips: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

export type GuideSet = Record<string, PlaceGuide>;

const guides: Partial<Record<Locale, GuideSet>> = { en, de, el, fr, it, nl, pl };

export function getGuide(slug: string, locale: Locale): PlaceGuide | null {
  return guides[locale]?.[slug] ?? null;
}
