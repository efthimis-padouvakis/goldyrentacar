import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeyondCrete from "@/components/BeyondCrete";
import CreteMap, { CreteOutline } from "@/components/CreteMap";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import SearchForm from "@/components/SearchForm";
import { ArrowRightIcon, CheckIcon, CompassIcon, PlaneIcon, ShipIcon, TownIcon } from "@/components/icons";
import { fill, getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { getLocationPage, locationPages } from "@/lib/locations";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { getStation } from "@/lib/stations";
import { COMPANY, SITE_URL } from "@/lib/site";

const KIND_ICONS = { Airport: PlaneIcon, Port: ShipIcon, Downtown: TownIcon };

export async function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/locations/[slug]">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) return {};
  const t = getDictionary(locale);
  const place = page.copy[locale].name;
  return pageMetadata({
    locale,
    path: `/locations/${slug}`,
    title: fill(t.meta.locationTitle, { place }),
    description: fill(t.meta.locationDescription, { place }),
  });
}

export default async function LocationPage({ params }: PageProps<"/[lang]/locations/[slug]">) {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) notFound();
  const t = getDictionary(locale);
  const copy = page.copy[locale];
  const station = getStation(page.stationId);
  const title = fill(t.locations.rentIn, { place: copy.name });
  const Icon = KIND_ICONS[page.kind];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Car rental",
    name: title,
    description: copy.intro,
    url: localizedUrl(locale, `/locations/${slug}`),
    provider: { "@id": `${SITE_URL}/#business`, name: COMPANY.name },
    areaServed: station
      ? { "@type": "Place", name: copy.name, geo: { "@type": "GeoCoordinates", latitude: station.lat, longitude: station.lng } }
      : { "@type": "Place", name: copy.name },
    offers: { "@type": "Offer", priceCurrency: "EUR", price: COMPANY.priceFrom, priceSpecification: { "@type": "UnitPriceSpecification", price: COMPANY.priceFrom, priceCurrency: "EUR", unitCode: "DAY" } },
  };

  return (
    <>
      <JsonLd data={placeJsonLd} />
      <section className="relative isolate overflow-hidden border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-14">
          <Breadcrumbs
            crumbs={[
              { name: t.nav.home, href: `/${locale}` },
              { name: t.nav.locations, href: `/${locale}/locations` },
              { name: copy.name, href: `/${locale}/locations/${slug}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                <Icon className="text-sm" /> {t.search.groups[page.kind]}
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/65">{copy.intro}</p>
            </div>
            <div className="rounded-[2rem] border border-sand-200 bg-white px-4 py-8 sm:px-8">
              <CreteMap locale={locale} t={t} highlight={page.stationId} labels="highlight" />
            </div>
          </div>
          <div id="search" className="mt-10 scroll-mt-28 rounded-[1.75rem] bg-white p-3 shadow-lift ring-1 ring-black/5 sm:p-4">
            <h2 className="px-2 pb-3 pt-1 text-base font-extrabold text-ink sm:text-lg">{fill(t.locations.searchIn, { place: copy.name })}</h2>
            <SearchForm locale={locale} t={{ search: t.search, common: t.common }} initial={{ pickup: page.stationId }} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-sand-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{fill(t.locations.why, { place: copy.name })}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.locations.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 rounded-2xl bg-sand-50 p-4 text-ink/80 ring-1 ring-sand-200">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sea-600 text-xs text-white">
                    <CheckIcon />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-sea-900 p-6 text-white sm:p-8">
            <CreteOutline tone="dark" className="pointer-events-none absolute -bottom-10 -right-16 w-[30rem] opacity-50" />
            <p className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
              <CompassIcon className="text-sm" /> {t.locations.tip}
            </p>
            <p className="relative mt-3 max-w-xl text-lg leading-relaxed text-white/85">{copy.tip}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-sand-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-ink">{t.locations.others}</h2>
          <ul className="mt-4 divide-y divide-sand-100">
            {locationPages
              .filter((other) => other.slug !== slug)
              .map((other) => {
                const OtherIcon = KIND_ICONS[other.kind];
                return (
                  <li key={other.slug}>
                    <Link href={`/${locale}/locations/${other.slug}`} className="group flex items-center gap-3 py-3 font-semibold text-ink hover:text-sea-700">
                      <OtherIcon className="shrink-0 text-sea-600" />
                      <span className="flex-1">{fill(t.locations.rentIn, { place: other.copy[locale].name })}</span>
                      <ArrowRightIcon className="text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-sea-600" />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      <BeyondCrete locale={locale} t={t} creteLink={page.karpadu} />
    </>
  );
}
