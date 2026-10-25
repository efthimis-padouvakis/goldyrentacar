import type { Metadata } from "next";
import FleetGrid from "@/components/FleetGrid";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SearchForm from "@/components/SearchForm";
import { CheckIcon } from "@/components/icons";
import { fleet } from "@/lib/fleet";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/fleet">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/fleet", title: t.meta.fleetTitle, description: t.meta.fleetDescription });
}

export default async function FleetPage({ params }: PageProps<"/[lang]/fleet">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.fleet.title,
    url: localizedUrl(locale, "/fleet"),
    itemListElement: fleet.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Car",
        name: `${car.name} ${car.year}`,
        brand: { "@type": "Brand", name: car.name.split(" ")[0] },
        image: `${SITE_URL}${car.image}`,
        vehicleModelDate: String(car.year),
        vehicleTransmission: car.transmission,
        fuelType: car.fuel,
        seatingCapacity: car.seats,
        bodyType: car.size,
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <PageHero
        eyebrow={t.meta.siteName}
        title={t.fleet.title}
        lead={t.fleet.intro}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.fleet, href: `/${locale}/fleet` },
        ]}
      >
        <div id="search" className="mt-10 scroll-mt-28 rounded-[1.75rem] bg-white p-3 shadow-lift ring-1 ring-black/5 sm:p-4">
          <SearchForm locale={locale} t={{ search: t.search, common: t.common }} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <FleetGrid cars={fleet} t={{ car: t.car, common: t.common, fleet: t.fleet, meta: t.meta }} allLabel={t.results.all} href="#search" />
        <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-sand-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <ul className="grid gap-x-8 gap-y-2 text-sm font-semibold text-ink/80 sm:grid-cols-2">
            {t.home.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="text-sea-600" /> {item}
              </li>
            ))}
          </ul>
          <p className="max-w-sm text-sm text-ink/55">{t.fleet.note}</p>
        </div>
      </section>
    </>
  );
}
