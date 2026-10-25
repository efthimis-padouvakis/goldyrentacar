import type { Metadata } from "next";
import { Suspense } from "react";
import BookingConfirmed from "@/components/BookingConfirmed";
import Steps from "@/components/Steps";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { karpaduHref } from "@/lib/karpaduLinks";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/booking-confirmed">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/booking-confirmed", title: t.meta.confirmedTitle, description: t.confirmed.text, noindex: true });
}

export default async function BookingConfirmedPage({ params }: PageProps<"/[lang]/booking-confirmed">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return (
    <>
      <section className="border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto flex max-w-3xl justify-center px-4 py-6 sm:px-6">
          <Steps steps={t.booking.steps} current={4} />
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto mt-12 h-96 max-w-3xl animate-pulse rounded-[2rem] bg-white" />}>
        <BookingConfirmed
          locale={locale}
          t={t.confirmed}
          karpaduHome={karpaduHref("home", locale, "goldyrentacar-confirmation")}
          karpaduReservation={karpaduHref("myReservation", locale, "goldyrentacar-confirmation")}
        />
      </Suspense>
    </>
  );
}
