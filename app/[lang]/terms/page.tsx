import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/terms", title: t.meta.termsTitle, description: t.meta.termsDescription });
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <LegalPage
      title={t.terms.title}
      updated={t.terms.updated}
      sections={t.terms.sections}
      crumbs={[
        { name: t.nav.home, href: `/${locale}` },
        { name: t.terms.title, href: `/${locale}/terms` },
      ]}
    />
  );
}
