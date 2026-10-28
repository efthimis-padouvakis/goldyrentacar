import type { Locale } from "@/lib/i18n/config";
import de from "./de";
import el from "./el";
import en from "./en";
import fr from "./fr";
import it from "./it";
import nl from "./nl";
import pl from "./pl";

// Rental terms and privacy policy, per locale. English is the reference text: change it first,
// then carry the change to every translation so the versions never disagree.

/** A paragraph, or a bullet list when it is an array */
export type LegalBlock = string | string[];

export interface LegalSection {
  h: string;
  body: LegalBlock[];
}

export interface LegalDoc {
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalSet {
  contents: string;
  terms: LegalDoc;
  privacy: LegalDoc;
}

const legal: Record<Locale, LegalSet> = { en, el, de, fr, it, nl, pl };

export function getLegal(locale: Locale) {
  return legal[locale];
}
