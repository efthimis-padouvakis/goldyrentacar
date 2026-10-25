import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { karpaduHref } from "@/lib/karpaduLinks";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/search">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/search", title: t.meta.searchTitle, description: t.meta.homeDescription, noindex: true });
}

export default async function SearchPage({ params }: PageProps<"/[lang]/search">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <>
      <h1 className="sr-only">{t.meta.searchTitle}</h1>
      <Suspense
        fallback={
          <div className="border-b border-sand-200 bg-sand-100/70">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <div className="h-[4.5rem] animate-pulse rounded-3xl bg-white" />
            </div>
          </div>
        }
      >
        <SearchResults
          locale={locale}
          t={{ search: t.search, car: t.car, common: t.common, results: t.results }}
          karpaduHref={karpaduHref("crete", locale, "goldyrentacar-results")}
        />
      </Suspense>
    </>
  );
}
