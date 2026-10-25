import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import el from "./dictionaries/el";
import de from "./dictionaries/de";
import fr from "./dictionaries/fr";
import it from "./dictionaries/it";
import nl from "./dictionaries/nl";
import pl from "./dictionaries/pl";

const dictionaries: Record<Locale, Dictionary> = { en, el, de, fr, it, nl, pl };

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
