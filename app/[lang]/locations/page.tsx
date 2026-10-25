import type { Metadata } from "next";
import Link from "next/link";
import BeyondCrete from "@/components/BeyondCrete";
import CreteMap from "@/components/CreteMap";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, PlaneIcon, ShipIcon, TownIcon } from "@/components/icons";
import { fill, getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { locationPages } from "@/lib/locations";
import { pageMetadata } from "@/lib/seo";
import { REGIONS, regionName, stationLabel, stationRegion, stations } from "@/lib/stations";

export async function generateMetadata({ params }: PageProps<"/[lang]/locations">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/locations", title: t.meta.locationsTitle, description: t.meta.locationsDescription });
}

const KIND_ICONS = { Airport: PlaneIcon, Port: ShipIcon, Downtown: TownIcon };
const TYPE_ORDER = { Airport: 0, Port: 1, Downtown: 2 };

export default async function LocationsPage({ params }: PageProps<"/[lang]/locations">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const labels = { pattern: t.search.stationPattern, types: t.search.stationTypes };

  return (
    <>
      <PageHero
        eyebrow={t.meta.siteName}
        title={t.locations.title}
        lead={t.locations.intro}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.locations, href: `/${locale}/locations` },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="rounded-[2rem] border border-sand-200 bg-white px-4 py-10 sm:px-10 sm:py-14">
          <CreteMap locale={locale} t={t} className="mx-auto max-w-5xl" />
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-gold-400 ring-2 ring-white" /> {t.locations.popular}
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-sea-600/60" /> {t.locations.others}
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">{t.locations.popular}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locationPages.map((page) => {
            const Icon = KIND_ICONS[page.kind];
            return (
              <Link
                key={page.slug}
                href={`/${locale}/locations/${page.slug}`}
                className="group flex flex-col rounded-3xl border border-sand-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sand-300 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-sea-50 text-2xl text-sea-700 transition group-hover:bg-sea-800 group-hover:text-gold-300">
                  <Icon />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{fill(t.locations.rentIn, { place: page.copy[locale].name })}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/60">{page.copy[locale].intro}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-sea-700">
                  {fill(t.locations.searchIn, { place: page.copy[locale].name })} <ArrowRightIcon className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <h2 className="mt-20 text-3xl font-extrabold tracking-tight text-ink">{t.locations.allPoints}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region) => {
            const list = stations
              .filter((s) => stationRegion(s) === region)
              .sort((a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type] || (a.names[locale] ?? a.names.en).localeCompare(b.names[locale] ?? b.names.en, locale));
            return (
              <div key={region} className="rounded-3xl border border-sand-200 bg-white p-6">
                <h3 className="flex items-baseline justify-between text-lg font-bold text-ink">
                  {regionName(region, locale)}
                  <span className="text-xs font-semibold text-ink/40">{list.length}</span>
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-ink/75">
                  {list.map((s) => {
                    const Icon = KIND_ICONS[s.type];
                    return (
                      <li key={s.id} className="flex items-center gap-2.5">
                        <Icon className={`shrink-0 ${s.type === "Downtown" ? "text-ink/30" : "text-sea-600"}`} />
                        {stationLabel(s, locale, labels)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <BeyondCrete locale={locale} t={t} />
    </>
  );
}
