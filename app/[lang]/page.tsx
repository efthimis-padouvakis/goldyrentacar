import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeyondCrete from "@/components/BeyondCrete";
import CreteMap, { CreteOutline } from "@/components/CreteMap";
import FaqList from "@/components/FaqList";
import FleetCard from "@/components/FleetCard";
import JsonLd from "@/components/JsonLd";
import SearchForm from "@/components/SearchForm";
import {
  ArrowRightIcon,
  BookIcon,
  CheckIcon,
  HeadsetIcon,
  InfinityIcon,
  LeafIcon,
  PlaneIcon,
  RefreshIcon,
  ShieldIcon,
  ShipIcon,
  TagIcon,
  TownIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { fleet } from "@/lib/fleet";
import { fill, getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { locationPages } from "@/lib/locations";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { COMPANY, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "", title: t.meta.homeTitle, description: t.meta.homeDescription, absoluteTitle: true });
}

const USP_ICONS = [PlaneIcon, ShieldIcon, RefreshIcon, HeadsetIcon, LeafIcon, TagIcon];
const TRUST_ICONS = [InfinityIcon, ShieldIcon, RefreshIcon, HeadsetIcon];
const KIND_ICONS = { Airport: PlaneIcon, Port: ShipIcon, Downtown: TownIcon };

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const faqItems = t.faq.items.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-deep text-white">
        <CreteOutline tone="dark" className="pointer-events-none absolute -right-16 top-32 -z-10 w-[50rem] opacity-50 max-lg:hidden" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-5 sm:px-6 sm:pb-40 sm:pt-14 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8 lg:pb-48 lg:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gold-200 ring-1 ring-white/15 backdrop-blur">
              <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              {t.home.heroEyebrow}
            </p>
            <h1 className="mt-3 max-w-2xl text-balance text-[2.15rem] font-extrabold leading-[1.03] tracking-tight sm:mt-6 sm:text-6xl lg:text-[4.25rem]">
              {t.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/70 max-sm:hidden">{t.home.heroSubtitle}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-2 text-sm font-bold text-gold-200 ring-1 ring-gold-400/30 sm:mt-8">
              <TagIcon className="text-gold-300" /> {fill(t.home.fromPrice, { price: COMPANY.priceFrom })}
            </p>
          </div>
          <div className="relative mt-6 hidden aspect-[16/10] lg:block">
            <div className="absolute inset-x-10 bottom-6 h-10 rounded-[50%] bg-black/50 blur-2xl" aria-hidden="true" />
            <Image
              src="/img/brand/cars/citroen-c3-aircross-2026.avif"
              alt="Citroën C3 Aircross Hybrid, Goldy Rent a Car Crete"
              fill
              priority
              sizes="(min-width: 1280px) 560px, 45vw"
              className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* Search */}
      <section aria-label={t.search.title} className="relative z-20 mx-auto -mt-20 max-w-7xl px-3 sm:-mt-32 sm:px-6 lg:-mt-36">
        <div id="search" className="scroll-mt-28 rounded-[1.75rem] bg-white p-3 shadow-float ring-1 ring-black/5 sm:p-4">
          <h2 className="px-2 pb-3 pt-1 text-base font-extrabold text-ink sm:text-lg">{t.search.title}</h2>
          <SearchForm locale={locale} t={{ search: t.search, common: t.common }} />
        </div>
        {/* On phones the subtitle sits under the form, so the form fits in the first screen */}
        <p className="mt-5 px-2 text-pretty leading-relaxed text-ink/65 sm:hidden">{t.home.heroSubtitle}</p>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 px-2 sm:gap-6 lg:grid-cols-4">
          {t.home.trust.map((item, index) => {
            const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
            return (
              <li key={item} className="flex items-center gap-3 text-sm font-semibold text-ink/80">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sea-50 text-lg text-sea-700 ring-1 ring-sea-100">
                  <Icon />
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Why Goldy */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:pt-24">
        <SectionHeading eyebrow={t.meta.siteName} title={t.home.uspTitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.usps.map((usp, index) => {
            const Icon = USP_ICONS[index % USP_ICONS.length];
            const featured = index === 0;
            return (
              <div
                key={usp.title}
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 ${featured ? "bg-sea-900 text-white" : "border border-sand-200 bg-white"}`}
              >
                <span className={`grid size-12 place-items-center rounded-2xl text-2xl ${featured ? "bg-gold-400 text-sea-950" : "bg-sand-100 text-sea-700"}`}>
                  <Icon />
                </span>
                <h3 className={`mt-5 text-xl font-bold ${featured ? "" : "text-ink"}`}>{usp.title}</h3>
                <p className={`mt-2 leading-relaxed ${featured ? "text-white/70" : "text-ink/65"}`}>{usp.text}</p>
                {featured && <PlaneIcon aria-hidden="true" className="absolute -bottom-6 -right-4 text-[9rem] text-white/5" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Fleet */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={t.nav.fleet} title={t.home.fleetTitle} text={t.home.fleetText} />
            <Link href={`/${locale}/fleet`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-sea-300">
              {t.home.fleetCta} <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <ul className="no-scrollbar mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {fleet.slice(0, 4).map((car) => (
            <li key={car.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <FleetCard car={car} t={t} href={`/${locale}#search`} />
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[2rem] bg-sand-100 p-6 sm:p-10 lg:p-12">
          <SectionHeading title={t.home.stepsTitle} />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {t.home.steps.map((step, index) => (
              <li key={step.title} className="relative">
                {index < t.home.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-14 right-0 top-6 hidden border-t-2 border-dashed border-sand-300 md:block" />
                )}
                <span className="relative grid size-12 place-items-center rounded-full bg-sea-800 text-lg font-extrabold text-gold-300 ring-8 ring-sand-100">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-ink/65">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Locations map */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading eyebrow={t.nav.locations} title={t.home.locationsTitle} text={t.home.locationsText} />
        <div className="mt-10 rounded-[2rem] border border-sand-200 bg-white px-4 py-10 sm:px-10 sm:py-14">
          <CreteMap locale={locale} t={t} className="mx-auto max-w-5xl" />
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locationPages.map((page) => {
            const Icon = KIND_ICONS[page.kind];
            return (
              <li key={page.slug}>
                <Link
                  href={`/${locale}/locations/${page.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-3.5 pr-4 font-semibold text-ink transition hover:border-sea-300 hover:shadow-soft"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sea-50 text-lg text-sea-700">
                    <Icon />
                  </span>
                  <span className="flex-1">{fill(t.locations.rentIn, { place: page.copy[locale].name })}</span>
                  <ArrowRightIcon className="text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-sea-600" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Transfers + guide */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative grid overflow-hidden rounded-[2rem] bg-sea-900 p-7 text-white sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">{t.home.transferTitle}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-white/70">{fill(t.home.transferText, { price: COMPANY.transferFrom })}</p>
            <a
              href={whatsappLink(t.home.transferTitle)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-sea-950 transition hover:brightness-105"
            >
              <WhatsAppIcon className="text-lg" /> {t.home.transferCta}
            </a>
          </div>
          <div className="relative mt-8 aspect-[16/10] md:mt-0">
            <Image src="/img/brand/cars/peugeot-e-rifter-2023.avif" alt="Peugeot e-Rifter, airport transfer in Crete" fill sizes="(min-width: 1024px) 320px, 80vw" className="object-contain" />
          </div>
        </div>
        <Link
          href={`/${locale}/crete-driving-guide`}
          className="group flex flex-col justify-between rounded-[2rem] border border-sand-200 bg-white p-7 transition hover:border-sea-300 hover:shadow-lift sm:p-10"
        >
          <span className="grid size-12 place-items-center rounded-2xl bg-gold-100 text-2xl text-gold-700">
            <BookIcon />
          </span>
          <span className="mt-8 block">
            <span className="block text-2xl font-extrabold tracking-tight text-ink">{t.guide.title}</span>
            <span className="mt-3 line-clamp-3 block leading-relaxed text-ink/65">{t.guide.intro}</span>
            <span className="mt-5 inline-flex items-center gap-2 font-bold text-sea-700">
              {t.common.readMore} <ArrowRightIcon className="transition group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:py-24">
        <div>
          <SectionHeading eyebrow={t.nav.faq} title={t.home.faqTitle} text={t.faq.intro} />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink()} className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-sea-950">
              <WhatsAppIcon /> WhatsApp
            </a>
            <Link href={`/${locale}/faq`} className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm font-bold text-ink hover:border-sea-300">
              {t.common.seeAll} <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <FaqList items={faqItems} locale={locale} />
      </section>

      <BeyondCrete locale={locale} t={t} />

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-deep px-6 py-14 text-white sm:px-12 sm:py-16">
          <CreteOutline tone="dark" className="pointer-events-none absolute -right-20 -top-10 -z-10 w-[46rem] opacity-60" />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.home.ctaTitle}</h2>
              <p className="mt-3 max-w-lg text-white/70">{t.home.ctaText}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
                {t.home.trust.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="text-gold-300" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={`/${locale}#search`} className="shrink-0 rounded-full bg-gold-400 px-8 py-4 text-base font-extrabold text-sea-950 transition hover:bg-gold-300">
              {t.home.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{eyebrow}</p>}
      <h2 className={`${eyebrow ? "mt-3" : ""} text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl`}>{title}</h2>
      {text && <p className="mt-4 text-pretty text-lg leading-relaxed text-ink/65">{text}</p>}
    </div>
  );
}
