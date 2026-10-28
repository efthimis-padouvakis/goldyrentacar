import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { getLegal } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/privacy", title: t.meta.privacyTitle, description: t.meta.privacyDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const legal = getLegal(locale);
  return (
    <LegalPage
      title={t.privacy.title}
      doc={legal.privacy}
      contents={legal.contents}
      crumbs={[
        { name: t.nav.home, href: `/${locale}` },
        { name: t.privacy.title, href: `/${locale}/privacy` },
      ]}
    />
  );
}
