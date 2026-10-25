export const locales = ["en", "el", "de", "fr", "it", "nl", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { name: string; nativeName: string; ogLocale: string; intl: string }> = {
  en: { name: "English", nativeName: "English", ogLocale: "en_GB", intl: "en-GB" },
  el: { name: "Greek", nativeName: "Ελληνικά", ogLocale: "el_GR", intl: "el-GR" },
  de: { name: "German", nativeName: "Deutsch", ogLocale: "de_DE", intl: "de-DE" },
  fr: { name: "French", nativeName: "Français", ogLocale: "fr_FR", intl: "fr-FR" },
  it: { name: "Italian", nativeName: "Italiano", ogLocale: "it_IT", intl: "it-IT" },
  nl: { name: "Dutch", nativeName: "Nederlands", ogLocale: "nl_NL", intl: "nl-NL" },
  pl: { name: "Polish", nativeName: "Polski", ogLocale: "pl_PL", intl: "pl-PL" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
