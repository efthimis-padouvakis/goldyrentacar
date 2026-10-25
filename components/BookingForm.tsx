"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Rich from "@/components/Rich";
import {
  ArrowLeftIcon,
  BoltIcon,
  CheckIcon,
  ChildSeatIcon,
  CloseIcon,
  FuelIcon,
  GearIcon,
  LeafIcon,
  MailIcon,
  NavigationIcon,
  PlusIcon,
  ShieldIcon,
  UserPlusIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons";
import {
  BOOKING_STORAGE_KEY,
  CHECKOUT_STORAGE_KEY,
  defaultPlan,
  formatMoney,
  formatNaive,
  parseSearchParams,
  rentalDays,
  searchQueryString,
  type Car,
} from "@/lib/booking";
import { fill, type Dictionary } from "@/lib/i18n";
import { localeMeta, type Locale } from "@/lib/i18n/config";
import { getStation, stationLabel } from "@/lib/stations";
import { COMPANY, whatsappLink } from "@/lib/site";

export type BookingText = Pick<Dictionary, "booking" | "car" | "common" | "search" | "results">;

const COUNTRIES = [
  "GR", "GB", "DE", "FR", "IT", "NL", "PL", "BE", "AT", "CH", "IE", "ES", "PT", "SE", "NO", "DK", "FI", "CZ", "SK", "HU",
  "RO", "BG", "RS", "HR", "SI", "CY", "LT", "LV", "EE", "LU", "UA", "IL", "TR", "US", "CA", "AU",
];

const EXTRA_ICONS: Record<string, typeof PlusIcon> = { ADD: UserPlusIcon, BABY: ChildSeatIcon, CHLD: ChildSeatIcon, INF: ChildSeatIcon, BOOST: ChildSeatIcon, GPS: NavigationIcon };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "redirecting" | "unavailable" | "error";
type Load = { key: string; car: Car | null; failed: boolean };
type Driver = { firstName: string; lastName: string; email: string; phone: string; country: string; flight: string };
type CheckoutDraft = { key: string; href: string; plan: string; extras: string[]; driver: Driver };

// Saved before the redirect to Viva, so a failed payment can bring the customer back to a filled form.
function readCheckoutDraft(): CheckoutDraft | null {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_STORAGE_KEY) ?? "null");
  } catch {
    return null;
  }
}

export default function BookingForm({ locale, t, reservationsEnabled }: { locale: Locale; t: BookingText; reservationsEnabled: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const handoffRef = useRef<HTMLDialogElement>(null);
  const parsed = useMemo(() => parseSearchParams(new URLSearchParams(params.toString())), [params]);
  const carID = Number(params.get("car"));
  const query = parsed.ok ? parsed.query : null;
  const queryKey = query && carID > 0 ? searchQueryString(query, { car: carID }) : "";
  const paymentFailed = params.get("payment") === "failed";

  const [load, setLoad] = useState<Load | null>(null);
  const [planCode, setPlanCode] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [driver, setDriver] = useState<Driver>({ firstName: "", lastName: "", email: "", phone: "", country: "", flight: "" });
  const [agree, setAgree] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!queryKey) return;
    const controller = new AbortController();
    fetch(`/api/availability?${queryKey}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(String(data.error ?? res.status));
        const draft = paymentFailed ? readCheckoutDraft() : null;
        if (draft?.key === queryKey) {
          setPlanCode(draft.plan);
          setExtras(draft.extras);
          setDriver(draft.driver);
          setAgree(true);
        }
        setLoad({ key: queryKey, car: (data.cars as Car[]).find((c) => c.carID === carID) ?? null, failed: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoad({ key: queryKey, car: null, failed: true });
      });
    return () => controller.abort();
  }, [queryKey, carID, paymentFailed]);

  // Viva's failure URL has no booking in it: go back to the car this browser was paying for.
  useEffect(() => {
    if (!paymentFailed || queryKey) return;
    const draft = readCheckoutDraft();
    if (draft?.href) router.replace(`${draft.href}&payment=failed`);
  }, [paymentFailed, queryKey, router]);

  // Back from the Viva page restores this page from the bfcache with the button still disabled.
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setStatus("idle");
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const intl = localeMeta[locale].intl;
  const countryNames = useMemo(() => {
    const names = new Intl.DisplayNames([intl], { type: "region" });
    return COUNTRIES.map((code) => ({ code, name: names.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name, intl));
  }, [intl]);

  const resultsHref = query ? `/${locale}/search?${searchQueryString(query)}` : `/${locale}`;

  if (!query || !(carID > 0)) {
    return <Notice text={paymentFailed ? t.booking.paymentFailed : t.results.invalid} href={`/${locale}`} cta={t.common.back} />;
  }
  if (!load || load.key !== queryKey) {
    return (
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1fr_400px]" aria-busy="true">
        <div className="space-y-4">
          <div className="h-36 animate-pulse rounded-3xl bg-white ring-1 ring-sand-200" />
          <div className="h-64 animate-pulse rounded-3xl bg-white ring-1 ring-sand-200" />
          <p className="text-center text-sm text-ink/50">{t.booking.loading}</p>
        </div>
        <div className="hidden h-96 animate-pulse rounded-3xl bg-white ring-1 ring-sand-200 lg:block" />
      </div>
    );
  }
  if (!load.car) {
    return <Notice text={load.failed ? t.booking.error : t.booking.carNotFound} href={resultsHref} cta={t.booking.backToResults} />;
  }

  const car = load.car;
  const plan = car.insuranceOptions.find((p) => p.code === planCode) ?? defaultPlan(car);
  const chosenExtras = car.extras.filter((e) => extras.includes(e.id));
  const days = rentalDays(query.start, query.end);
  const daysLabel = days === 1 ? t.common.day : fill(t.common.days, { n: days });
  const total = car.totalPrice + (plan?.price ?? 0) + chosenExtras.reduce((sum, e) => sum + e.price, 0);
  const money = (n: number) => formatMoney(n, car.currency, intl);
  const labels = { pattern: t.search.stationPattern, types: t.search.stationTypes };
  const pickup = getStation(query.pickup);
  const dropoff = getStation(query.dropoff);
  const pickupLabel = pickup ? stationLabel(pickup, locale, labels) : String(query.pickup);
  const dropoffLabel = dropoff ? stationLabel(dropoff, locale, labels) : String(query.dropoff);
  const FuelGlyph = car.fuelType === "Electric" ? BoltIcon : car.fuelType === "Hybrid" ? LeafIcon : FuelIcon;

  const errors = {
    firstName: !driver.firstName.trim() ? t.booking.required : null,
    lastName: !driver.lastName.trim() ? t.booking.required : null,
    email: !EMAIL.test(driver.email.trim()) ? t.booking.invalidEmail : null,
    phone: driver.phone.replace(/\D/g, "").length < 6 ? t.booking.invalidPhone : null,
    agree: !agree ? t.booking.mustAgree : null,
  };
  const valid = Object.values(errors).every((e) => e === null);

  const message = [
    t.booking.messageIntro,
    `${car.make} ${car.model} ${t.common.orSimilar} (${t.car.sizes[car.size] ?? car.size})`,
    `${t.booking.pickup}: ${pickupLabel}, ${formatNaive(query.start, intl)}`,
    `${t.booking.return}: ${dropoffLabel}, ${formatNaive(query.end, intl)}`,
    plan ? `${t.booking.protection}: ${t.car.plans[plan.code] ?? plan.name}` : "",
    chosenExtras.length ? `${t.booking.extras}: ${chosenExtras.map((e) => t.car.extraNames[e.id] ?? e.name).join(", ")}` : "",
    `${t.common.total}: ${money(total)}`,
    `${driver.firstName} ${driver.lastName} · ${driver.email} · ${driver.phone}${driver.flight ? ` · ${driver.flight}` : ""}`,
    query.age ? `${t.search.age}: ${query.age}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  function focusFirstError() {
    const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
    first?.focus();
    first?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setShowErrors(true);
    if (!valid || !plan) {
      requestAnimationFrame(focusFirstError);
      return;
    }
    if (!reservationsEnabled) {
      handoffRef.current?.showModal();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: locale,
          search: Object.fromEntries(new URLSearchParams(searchQueryString(query!))),
          carID: car.carID,
          plan: plan.code,
          extras,
          driver,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        try {
          sessionStorage.setItem(
            BOOKING_STORAGE_KEY,
            JSON.stringify({ reference: data.reference, car: `${car.make} ${car.model}`, pickup: pickupLabel, start: query!.start, end: query!.end, total: money(data.price ?? total), email: driver.email }),
          );
          sessionStorage.setItem(
            CHECKOUT_STORAGE_KEY,
            JSON.stringify({ key: queryKey, href: `/${locale}/book?${queryKey}`, plan: plan.code, extras, driver } satisfies CheckoutDraft),
          );
        } catch {}
        setStatus("redirecting");
        window.location.assign(data.checkoutUrl);
        return;
      }
      if (data.disabled) {
        setStatus("idle");
        handoffRef.current?.showModal();
        return;
      }
      setStatus(data.carUnavailable ? "unavailable" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "mt-1.5 h-12 w-full rounded-xl border bg-white px-3.5 text-[15px] font-normal text-ink outline-none transition placeholder:text-ink/30 focus:border-sea-500 focus:ring-4 focus:ring-sea-100";
  const border = (key: keyof typeof errors) => (showErrors && errors[key] ? "border-coral-500" : "border-sand-300");
  const invalid = (key: keyof typeof errors) => (showErrors && errors[key] ? true : undefined);
  const fieldError = (key: keyof typeof errors) =>
    showErrors && errors[key] ? <span className="mt-1.5 block text-xs font-semibold text-coral-600">{errors[key]}</span> : null;
  const busy = status === "submitting" || status === "redirecting";
  const submitLabel =
    status === "redirecting" ? t.booking.redirecting : status === "submitting" ? t.booking.submitting : reservationsEnabled ? t.booking.pay : t.booking.submit;

  return (
    <>
      <form onSubmit={submit} noValidate className="mx-auto grid max-w-7xl gap-6 px-4 pt-8 sm:px-6 lg:grid-cols-[1fr_400px] lg:gap-8 lg:pb-20">
        <div className="min-w-0 space-y-5">
          <Link href={resultsHref} className="inline-flex items-center gap-2 text-sm font-semibold text-sea-700 hover:text-sea-900">
            <ArrowLeftIcon /> {t.booking.backToResults}
          </Link>

          <section className="grid grid-cols-[7.5rem_1fr] items-center gap-4 rounded-3xl border border-sand-200 bg-white p-4 sm:grid-cols-[11rem_1fr] sm:p-5">
            <div className="relative aspect-[4/3] rounded-2xl bg-[radial-gradient(110%_90%_at_50%_100%,var(--color-sand-100),white_70%)]">
              {car.imageURL && <Image src={car.imageURL} alt={`${car.make} ${car.model}`} fill unoptimized sizes="176px" className="object-contain p-2" />}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-700">{t.car.sizes[car.size] ?? car.size}</p>
              <h2 className="mt-0.5 text-xl font-bold text-ink sm:text-2xl">
                {car.make} {car.model} <span className="text-sm font-medium text-ink/40">{t.common.orSimilar}</span>
              </h2>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/65">
                {car.seats && (
                  <li className="flex items-center gap-1.5">
                    <UsersIcon className="text-sea-600" /> {fill(t.car.seats, { n: car.seats })}
                  </li>
                )}
                <li className="flex items-center gap-1.5">
                  <GearIcon className="text-sea-600" /> {t.car.transmission[car.transmission] ?? car.transmission}
                </li>
                <li className="flex items-center gap-1.5">
                  <FuelGlyph className="text-sea-600" /> {t.car.fuel[car.fuelType] ?? car.fuelType}
                </li>
              </ul>
              {car.minAge && car.maxAge && <p className="mt-1.5 text-xs text-ink/50">{fill(t.booking.ageRange, { min: car.minAge, max: car.maxAge })}</p>}
            </div>
          </section>

          <Section step={1} title={t.booking.protection} subtitle={t.booking.protectionHelp}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {car.insuranceOptions.map((option) => {
                const active = option.code === plan?.code;
                return (
                  <label
                    key={option.code}
                    className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sea-100 ${
                      active ? "border-sea-600 bg-sea-50/60" : "border-sand-200 hover:border-sand-300"
                    }`}
                  >
                    <input type="radio" name="plan" className="sr-only" checked={active} onChange={() => setPlanCode(option.code)} />
                    <span className="flex items-start justify-between gap-2">
                      <span className="flex items-center gap-2 font-bold text-ink">
                        <ShieldIcon className={active ? "text-sea-600" : "text-ink/40"} /> {t.car.plans[option.code] ?? option.name}
                      </span>
                      <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-sea-600 bg-sea-600 text-white" : "border-sand-300"}`}>
                        {active && <CheckIcon className="text-[11px]" />}
                      </span>
                    </span>
                    <span className="mt-3 text-lg font-extrabold text-ink">{option.price === 0 ? t.booking.included : `+ ${money(option.price)}`}</span>
                    <span className="mt-3 space-y-1 border-t border-sand-200/80 pt-3 text-sm text-ink/65">
                      {option.excess !== null && (
                        <span className="flex justify-between gap-2">
                          {t.car.excess} <strong className="font-semibold text-ink">{money(option.excess)}</strong>
                        </span>
                      )}
                      {option.deposit !== null && (
                        <span className="flex justify-between gap-2">
                          {t.car.deposit} <strong className="font-semibold text-ink">{option.deposit === 0 ? t.car.noDeposit : money(option.deposit)}</strong>
                        </span>
                      )}
                      <span className={`flex items-center gap-1.5 pt-1 text-xs font-semibold ${option.creditCardRequired ? "text-ink/50" : "text-sea-700"}`}>
                        {!option.creditCardRequired && <CheckIcon />}
                        {option.creditCardRequired ? t.car.creditCard : t.car.noCreditCard}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </Section>

          {car.extras.length > 0 && (
            <Section step={2} title={t.booking.extras}>
              <div className="grid gap-3 sm:grid-cols-2">
                {car.extras.map((extra) => {
                  const Icon = EXTRA_ICONS[extra.id] ?? PlusIcon;
                  const checked = extras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3.5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sea-100 ${
                        checked ? "border-sea-600 bg-sea-50/60" : "border-sand-200 hover:border-sand-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => setExtras((list) => (e.target.checked ? [...list, extra.id] : list.filter((id) => id !== extra.id)))}
                      />
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-lg ${checked ? "bg-sea-600 text-white" : "bg-sand-100 text-sea-700"}`}>
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold leading-snug text-ink">{t.car.extraNames[extra.id] ?? extra.name}</span>
                        <span className="text-sm text-ink/60">{extra.price === 0 ? t.booking.included : money(extra.price)}</span>
                      </span>
                      <span className={`grid size-6 shrink-0 place-items-center rounded-lg border-2 ${checked ? "border-sea-600 bg-sea-600 text-white" : "border-sand-300"}`}>
                        {checked && <CheckIcon className="text-xs" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Section>
          )}

          <Section step={car.extras.length > 0 ? 3 : 2} title={t.booking.driver}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.firstName}
                <input
                  className={`${input} ${border("firstName")}`}
                  aria-invalid={invalid("firstName")}
                  autoComplete="given-name"
                  value={driver.firstName}
                  onChange={(e) => setDriver({ ...driver, firstName: e.target.value })}
                />
                {fieldError("firstName")}
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.lastName}
                <input
                  className={`${input} ${border("lastName")}`}
                  aria-invalid={invalid("lastName")}
                  autoComplete="family-name"
                  value={driver.lastName}
                  onChange={(e) => setDriver({ ...driver, lastName: e.target.value })}
                />
                {fieldError("lastName")}
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.email}
                <input
                  type="email"
                  className={`${input} ${border("email")}`}
                  aria-invalid={invalid("email")}
                  autoComplete="email"
                  value={driver.email}
                  onChange={(e) => setDriver({ ...driver, email: e.target.value })}
                />
                {fieldError("email")}
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.phone}
                <input
                  type="tel"
                  className={`${input} ${border("phone")}`}
                  aria-invalid={invalid("phone")}
                  autoComplete="tel"
                  placeholder="+30 …"
                  value={driver.phone}
                  onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
                />
                {fieldError("phone")}
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.country}
                <select className={`${input} border-sand-300`} autoComplete="country" value={driver.country} onChange={(e) => setDriver({ ...driver, country: e.target.value })}>
                  <option value="">{t.booking.selectCountry}</option>
                  {countryNames.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-ink/70">
                {t.booking.flight}
                <input className={`${input} border-sand-300`} value={driver.flight} onChange={(e) => setDriver({ ...driver, flight: e.target.value })} />
              </label>
            </div>
            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-sand-50 p-4 text-sm text-ink/70 ring-1 ring-sand-200">
              <input type="checkbox" aria-invalid={invalid("agree")} className="mt-0.5 size-5 shrink-0 accent-sea-700" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>
                <Rich
                  text={t.booking.agree}
                  values={{
                    terms: (
                      <Link href={`/${locale}/terms`} target="_blank" className="font-semibold text-sea-700 underline decoration-gold-400 underline-offset-2">
                        {t.booking.termsLink}
                      </Link>
                    ),
                    privacy: (
                      <Link href={`/${locale}/privacy`} target="_blank" className="font-semibold text-sea-700 underline decoration-gold-400 underline-offset-2">
                        {t.booking.privacyLink}
                      </Link>
                    ),
                  }}
                />
              </span>
            </label>
            {fieldError("agree")}
          </Section>
        </div>

        <aside className="lg:row-span-2">
          <div className="sticky top-24 space-y-5 rounded-3xl border border-sand-200 bg-white p-5 shadow-soft sm:p-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{t.booking.yourTrip}</h2>
              <ol className="relative mt-4 space-y-5 text-sm before:absolute before:bottom-8 before:left-[7px] before:top-3 before:border-l-2 before:border-dashed before:border-sand-300">
                <li className="relative flex gap-3">
                  <span className="relative mt-1 size-4 shrink-0 rounded-full border-4 border-sea-600 bg-white" />
                  <span>
                    <span className="block font-bold text-ink">{pickupLabel}</span>
                    <span className="text-ink/60">{formatNaive(query.start, intl)}</span>
                  </span>
                </li>
                <li className="relative flex gap-3">
                  <span className="relative mt-1 size-4 shrink-0 rounded-full bg-sea-600" />
                  <span>
                    <span className="block font-bold text-ink">{dropoffLabel}</span>
                    <span className="text-ink/60">{formatNaive(query.end, intl)}</span>
                  </span>
                </li>
              </ol>
              <Link href={resultsHref} className="mt-4 inline-block text-xs font-bold text-sea-700 underline decoration-gold-400 underline-offset-2">
                {t.booking.change}
              </Link>
            </div>

            <div className="border-t border-sand-200 pt-5 text-sm">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{t.booking.summary}</h2>
              <Row label={fill(t.booking.rental, { days: daysLabel })} value={money(car.totalPrice)} />
              {plan && <Row label={t.car.plans[plan.code] ?? plan.name} value={plan.price === 0 ? t.booking.included : money(plan.price)} />}
              {chosenExtras.map((e) => (
                <Row key={e.id} label={t.car.extraNames[e.id] ?? e.name} value={e.price === 0 ? t.booking.included : money(e.price)} />
              ))}
              <div className="mt-3 flex items-baseline justify-between border-t border-sand-200 pt-4">
                <span className="text-base font-bold text-ink">{t.common.total}</span>
                <span className="text-3xl font-extrabold tracking-tight text-ink tabular-nums">{money(total)}</span>
              </div>
              <p className="mt-3 flex items-center gap-2 rounded-xl bg-sea-50 px-3 py-2.5 text-xs font-semibold text-sea-800">
                {reservationsEnabled ? (
                  <>
                    <ShieldIcon className="shrink-0 text-sea-600" /> {t.booking.payOnline}
                  </>
                ) : (
                  <>
                    <CheckIcon className="shrink-0 text-sea-600" /> {t.booking.payAtPickup}
                  </>
                )}
              </p>
            </div>

            {paymentFailed && status === "idle" && (
              <p role="alert" className="rounded-xl bg-coral-50 p-3 text-sm font-semibold text-coral-600">
                {t.booking.paymentFailed}
              </p>
            )}
            {status === "unavailable" && (
              <p role="alert" className="rounded-xl bg-coral-50 p-3 text-sm font-semibold text-coral-600">
                {t.booking.unavailable}{" "}
                <Link href={resultsHref} className="underline">
                  {t.booking.backToResults}
                </Link>
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="rounded-xl bg-coral-50 p-3 text-sm font-semibold text-coral-600">
                {t.booking.error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="hidden w-full items-center justify-center gap-2 rounded-2xl bg-gold-400 py-4 text-base font-extrabold text-sea-950 shadow-[0_10px_24px_-10px_rgb(207_155_47/0.8)] transition hover:bg-gold-300 disabled:opacity-70 lg:flex"
            >
              {submitLabel}
            </button>
          </div>
        </aside>

        <div className="sticky bottom-0 z-30 -mx-4 border-t border-sand-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:-mx-6 lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
            <div>
              <p className="text-xs text-ink/55">
                {t.common.total} · {daysLabel}
              </p>
              <p className="text-xl font-extrabold tracking-tight text-ink tabular-nums">{money(total)}</p>
            </div>
            <button type="submit" disabled={busy} className="rounded-2xl bg-gold-400 px-6 py-3.5 text-[15px] font-extrabold text-sea-950 disabled:opacity-70">
              {submitLabel}
            </button>
          </div>
        </div>
      </form>

      <dialog
        ref={handoffRef}
        aria-labelledby="handoff-title"
        className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 text-ink shadow-float backdrop:bg-sea-950/60 backdrop:backdrop-blur-sm open:animate-pop"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-whatsapp/15 text-2xl text-[#128c4b]">
              <WhatsAppIcon />
            </span>
            <button type="button" onClick={() => handoffRef.current?.close()} aria-label={t.common.close} className="grid size-9 place-items-center rounded-full bg-sand-100 text-ink">
              <CloseIcon />
            </button>
          </div>
          <h2 id="handoff-title" className="mt-5 text-2xl font-extrabold tracking-tight">
            {t.booking.handoffTitle}
          </h2>
          <p className="mt-2 leading-relaxed text-ink/65">{t.booking.handoffText}</p>
          <div className="mt-6 space-y-3">
            <a href={whatsappLink(message)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp py-3.5 font-bold text-sea-950">
              <WhatsAppIcon className="text-lg" /> {t.booking.sendWhatsapp}
            </a>
            <a
              href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${COMPANY.name}: ${car.make} ${car.model}`)}&body=${encodeURIComponent(message)}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-sand-300 py-3.5 font-bold text-ink"
            >
              <MailIcon /> {t.booking.sendEmail}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Section({ step, title, subtitle, children }: { step: number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-sand-200 bg-white p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sea-800 text-sm font-bold text-gold-300">{step}</span>
        <div>
          <h2 className="text-xl font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-sm leading-relaxed text-ink/55">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5">
      <span className="text-ink/65">{label}</span>
      <span className="font-semibold tabular-nums text-ink">{value}</span>
    </div>
  );
}

function Notice({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-sand-200 bg-white p-10 text-center">
        <p className="font-semibold text-ink/75">{text}</p>
        <Link href={href} className="mt-5 inline-block rounded-full bg-sea-800 px-6 py-3 text-sm font-bold text-white">
          {cta}
        </Link>
      </div>
    </div>
  );
}
