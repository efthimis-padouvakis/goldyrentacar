import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { HeadsetIcon, PinIcon, SparkleIcon } from "@/components/icons";
import { fleet } from "@/lib/fleet";
import { getDictionary } from "@/lib/i18n";
import { locales } from "@/lib/i18n/config";
import { localeFrom } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo";
import { stations } from "@/lib/stations";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: t.meta.aboutTitle, description: t.meta.aboutDescription });
}

const VALUE_ICONS = [PinIcon, SparkleIcon, HeadsetIcon];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const stats = [
    { value: String(new Set(fleet.map((car) => car.name)).size), label: t.about.stats.models },
    { value: String(stations.length), label: t.about.stats.points },
    { value: String(locales.length), label: t.about.stats.languages },
    { value: "24/7", label: t.about.stats.support },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.meta.siteName}
        title={t.about.title}
        lead={t.about.lead}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.about, href: `/${locale}/about` },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div className="prose-goldy">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[radial-gradient(110%_90%_at_50%_100%,var(--color-sand-200),var(--color-sand-50)_75%)] ring-1 ring-sand-200">
          <Image src="/img/brand/cars/jaguar-i-pace-ev400-2022.avif" alt="Jaguar I-Pace EV400, Goldy Rent a Car" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-8" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-sand-200 ring-1 ring-sand-200 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 sm:p-8">
              <dt className="text-sm font-semibold text-ink/55">{stat.label}</dt>
              <dd className="mt-1 text-4xl font-extrabold tracking-tight text-sea-800 sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {t.about.values.map((value, index) => {
            const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
            return (
              <div key={value.title} className="rounded-3xl border border-sand-200 bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-sea-50 text-2xl text-sea-700">
                  <Icon />
                </span>
                <h2 className="mt-5 text-xl font-bold text-ink">{value.title}</h2>
                <p className="mt-2 leading-relaxed text-ink/65">{value.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${locale}#search`} className="rounded-full bg-gold-400 px-7 py-3.5 font-extrabold text-sea-950 transition hover:bg-gold-300">
            {t.home.ctaButton}
          </Link>
          <Link href={`/${locale}/contact`} className="rounded-full border border-sand-300 bg-white px-7 py-3.5 font-bold text-ink hover:border-sea-300">
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </>
  );
}
