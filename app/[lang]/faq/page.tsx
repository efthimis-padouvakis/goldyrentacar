import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/faq", title: t.meta.faqTitle, description: t.meta.faqDescription });
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd data={faqJsonLd(t.faq.items)} />
      <PageHero
        eyebrow={t.nav.faq}
        title={t.faq.title}
        lead={t.faq.intro}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.faq, href: `/${locale}/faq` },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <FaqList items={t.faq.items} locale={locale} headingLevel={2} />
        <aside>
          <ContactCard t={t} className="lg:sticky lg:top-24" />
        </aside>
      </section>
    </>
  );
}
