"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useSyncExternalStore } from "react";
import Rich from "@/components/Rich";
import { CheckIcon } from "@/components/icons";
import { BOOKING_STORAGE_KEY, formatNaive } from "@/lib/booking";
import type { Dictionary } from "@/lib/i18n";
import { localeMeta, type Locale } from "@/lib/i18n/config";

interface StoredBooking {
  reference: string;
  car: string;
  pickup: string;
  start: string;
  end: string;
  total: string;
  email: string;
}

const subscribe = () => () => {};
const readStored = () => {
  try {
    return sessionStorage.getItem(BOOKING_STORAGE_KEY);
  } catch {
    return null;
  }
};

export default function BookingConfirmed({
  locale,
  t,
  karpaduHome,
  karpaduReservation,
}: {
  locale: Locale;
  t: Dictionary["confirmed"];
  karpaduHome: string;
  karpaduReservation: string;
}) {
  const params = useSearchParams();
  const pending = params.get("status") !== "paid";
  const order = params.get("order");
  const raw = useSyncExternalStore(subscribe, readStored, () => null);
  const booking = useMemo<StoredBooking | null>(() => {
    if (!raw) return null;
    try {
      const stored: StoredBooking = JSON.parse(raw);
      // An older booking in this tab is not the one Viva just returned from.
      return !order || stored.reference === order ? stored : null;
    } catch {
      return null;
    }
  }, [raw, order]);
  const intl = localeMeta[locale].intl;
  const reference = booking?.reference ?? order;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-sand-200 bg-white p-6 text-center sm:p-12">
        <div className="relative mx-auto grid size-20 place-items-center">
          <span className="absolute inset-0 rounded-full bg-sea-100 animate-ping-slow" aria-hidden="true" />
          <span className="relative grid size-20 place-items-center rounded-full bg-sea-600 text-4xl text-white">
            <CheckIcon />
          </span>
        </div>
        <h1 className="mt-8 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{pending ? t.pendingTitle : t.title}</h1>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/65">{pending ? t.pendingText : t.text}</p>

        {booking ? (
          <dl className="mt-8 grid gap-4 rounded-3xl bg-sand-50 p-5 text-left ring-1 ring-sand-200 sm:grid-cols-2 sm:p-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{t.reference}</dt>
              <dd className="mt-1 font-mono text-lg font-bold text-ink">{reference}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{t.car}</dt>
              <dd className="mt-1 font-semibold text-ink">{booking.car}</dd>
            </div>
            <div className="sm:col-span-2">
              <dd className="text-ink/80">
                {booking.pickup} · {formatNaive(booking.start, intl)} → {formatNaive(booking.end, intl)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dd className="text-2xl font-extrabold text-ink">{booking.total}</dd>
            </div>
          </dl>
        ) : (
          reference && (
            <p className="mt-8 text-sm text-ink/60">
              {t.reference}: <span className="font-mono text-base font-bold text-ink">{reference}</span>
            </p>
          )
        )}

        <div className="mt-10 text-left">
          <h2 className="text-lg font-bold text-ink">{t.next}</h2>
          <ol className="mt-4 space-y-4">
            {t.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sea-800 text-sm font-bold text-gold-300">{index + 1}</span>
                <span className="pt-1 leading-relaxed text-ink/70">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 rounded-2xl bg-sea-50 p-5 text-left text-sm leading-relaxed text-ink/70 ring-1 ring-sea-100">
          <Rich
            text={t.karpadu}
            values={{
              karpadu: (
                <a href={karpaduHome} className="font-bold text-sea-700 underline decoration-gold-400 underline-offset-2">
                  Karpadu
                </a>
              ),
              link: (
                <a href={karpaduReservation} className="font-bold text-sea-700 underline decoration-gold-400 underline-offset-2">
                  {t.karpaduLink}
                </a>
              ),
            }}
          />
        </p>

        <Link href={`/${locale}`} className="mt-8 inline-block rounded-full bg-sea-800 px-7 py-3.5 text-sm font-bold text-white hover:bg-sea-700">
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
