import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/privacy", title: t.meta.privacyTitle, description: t.meta.privacyDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <LegalPage
      title={t.privacy.title}
      updated={t.privacy.updated}
      sections={t.privacy.sections}
      crumbs={[
        { name: t.nav.home, href: `/${locale}` },
        { name: t.privacy.title, href: `/${locale}/privacy` },
      ]}
    />
  );
}
