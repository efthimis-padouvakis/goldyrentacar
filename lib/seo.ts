import type { Metadata } from "next";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { COMPANY, SITE_URL } from "@/lib/site";

export const CONTENT_UPDATED = "2026-10-24";

export function localizedUrl(locale: Locale, path = "") {
  return `${SITE_URL}/${locale}${path}`;
}

export function hreflangAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = localizedUrl(locale, path);
  languages["x-default"] = localizedUrl("en", path);
  return languages;
}

interface PageMetadataInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}

export function pageMetadata({ locale, path, title, description, absoluteTitle, noindex }: PageMetadataInput): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      url,
      title,
      description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export function businessJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY.name,
    url: localizedUrl(locale),
    logo: `${SITE_URL}/img/brand/logo.svg`,
    image: `${SITE_URL}/img/fleet/citroen-c3-aircross-2026.avif`,
    description,
    telephone: COMPANY.phone.replace(/\s/g, ""),
    email: COMPANY.email,
    priceRange: `€${COMPANY.priceFrom}+`,
    currenciesAccepted: "EUR",
    hasMap: COMPANY.mapUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.locality,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Crete" },
    sameAs: [COMPANY.social.facebook, COMPANY.social.instagram],
    availableLanguage: locales.map((l) => localeMeta[l].name),
    brand: { "@type": "Brand", name: COMPANY.name },
    knowsAbout: ["Car rental in Crete", "Heraklion Airport car hire", "Chania Airport car hire", "Airport transfers"],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.name,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/\{karpadu\}/g, "Karpadu") },
    })),
  };
}
