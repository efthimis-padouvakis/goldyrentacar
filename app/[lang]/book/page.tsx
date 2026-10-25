import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Steps from "@/components/Steps";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/book">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/book", title: t.meta.bookTitle, description: t.meta.homeDescription, noindex: true });
}

export default async function BookPage({ params }: PageProps<"/[lang]/book">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <>
      <section className="border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{t.meta.bookTitle}</h1>
          <Steps steps={t.booking.steps} current={2} />
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto mt-8 h-64 max-w-7xl animate-pulse rounded-3xl bg-white" />}>
        <BookingForm
          locale={locale}
          t={{ booking: t.booking, car: t.car, common: t.common, search: t.search, results: t.results }}
          reservationsEnabled={process.env.RESERVATIONS_ENABLED === "true"}
        />
      </Suspense>
    </>
  );
}
