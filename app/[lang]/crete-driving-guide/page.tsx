import type { Metadata } from "next";
import Link from "next/link";
import BeyondCrete from "@/components/BeyondCrete";
import { CreteOutline } from "@/components/CreteMap";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon } from "@/components/icons";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { CONTENT_UPDATED, localizedUrl, pageMetadata } from "@/lib/seo";
import { COMPANY, SITE_URL } from "@/lib/site";
import { headingId } from "@/lib/slug";

export async function generateMetadata({ params }: PageProps<"/[lang]/crete-driving-guide">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/crete-driving-guide", title: t.meta.guideTitle, description: t.meta.guideDescription });
}

export default async function GuidePage({ params }: PageProps<"/[lang]/crete-driving-guide">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const sections = t.guide.sections.map((section) => ({ ...section, id: headingId(section.h) }));

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.guide.title,
    description: t.meta.guideDescription,
    inLanguage: locale,
    url: localizedUrl(locale, "/crete-driving-guide"),
    mainEntityOfPage: localizedUrl(locale, "/crete-driving-guide"),
    dateModified: CONTENT_UPDATED,
    author: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#business` },
    image: `${SITE_URL}/img/brand/cars/citroen-c3-aircross-2026.avif`,
  };

  return (
    <>
      <JsonLd data={article} />
      <PageHero
        eyebrow={t.nav.guide}
        title={t.guide.title}
        lead={t.guide.intro}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.guide, href: `/${locale}/crete-driving-guide` },
        ]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-16">
        <aside className="lg:order-none">
          <nav aria-label={t.guide.toc} className="rounded-3xl border border-sand-200 bg-white p-5 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">{t.guide.toc}</p>
            <ol className="mt-3 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="flex gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-ink/75 transition hover:bg-sand-100 hover:text-ink">
                    <span className="text-gold-700 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    {section.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="min-w-0">
          <article className="prose-goldy max-w-3xl">
            {sections.map((section) => (
              <section key={section.id}>
                <h2 id={section.id}>{section.h}</h2>
                {section.p.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
          <div className="relative isolate mt-12 max-w-3xl overflow-hidden rounded-[2rem] bg-deep p-8 text-white sm:p-10">
            <CreteOutline tone="dark" className="pointer-events-none absolute -bottom-16 -right-24 -z-10 w-[36rem] opacity-60" />
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.home.ctaTitle}</h2>
            <p className="mt-2 max-w-md text-white/70">{t.home.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}#search`} className="rounded-full bg-gold-400 px-6 py-3 font-extrabold text-sea-950 transition hover:bg-gold-300">
                {t.home.ctaButton}
              </Link>
              <Link href={`/${locale}/locations`} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold text-white ring-1 ring-white/25 hover:bg-white/10">
                {t.nav.locations} <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BeyondCrete locale={locale} t={t} />
    </>
  );
}
