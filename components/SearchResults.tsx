"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CarCard from "@/components/CarCard";
import SearchForm from "@/components/SearchForm";
import { ArrowRightIcon, CalendarIcon, ChevronDownIcon, CloseIcon, PinIcon, RefreshIcon, SlidersIcon, WhatsAppIcon } from "@/components/icons";
import { defaultPlan, formatNaive, parseSearchParams, rentalDays, searchQueryString, sizeRank, type Car } from "@/lib/booking";
import { fill, type Dictionary } from "@/lib/i18n";
import { localeMeta, type Locale } from "@/lib/i18n/config";
import { getStation, stationLabel } from "@/lib/stations";
import { whatsappLink } from "@/lib/site";

export type ResultsText = Pick<Dictionary, "search" | "car" | "common" | "results">;

type Loaded = { key: string; status: "ok"; cars: Car[] } | { key: string; status: "error" };

interface Filters {
  sizes: string[];
  transmissions: string[];
  fuels: string[];
  minSeats: number;
  noDeposit: boolean;
  noCard: boolean;
}

type FilterKey = keyof Filters;

const EMPTY: Filters = { sizes: [], transmissions: [], fuels: [], minSeats: 0, noDeposit: false, noCard: false };
const SEAT_OPTIONS = [5, 7];

const priceOf = (car: Car) => car.totalPrice + (defaultPlan(car)?.price ?? 0);

function matches(car: Car, f: Filters, skip?: FilterKey) {
  const plan = defaultPlan(car);
  return (
    (skip === "sizes" || f.sizes.length === 0 || f.sizes.includes(car.size)) &&
    (skip === "transmissions" || f.transmissions.length === 0 || f.transmissions.includes(car.transmission)) &&
    (skip === "fuels" || f.fuels.length === 0 || f.fuels.includes(car.fuelType)) &&
    (skip === "minSeats" || (car.seats ?? 0) >= f.minSeats) &&
    (skip === "noDeposit" || !f.noDeposit || plan?.deposit === 0) &&
    (skip === "noCard" || !f.noCard || (plan ? !plan.creditCardRequired : false))
  );
}

export default function SearchResults({ locale, t, karpaduHref }: { locale: Locale; t: ResultsText; karpaduHref: string }) {
  const params = useSearchParams();
  const parsed = useMemo(() => parseSearchParams(new URLSearchParams(params.toString())), [params]);
  const query = parsed.ok ? parsed.query : null;
  const queryKey = query ? searchQueryString(query) : "";

  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [editing, setEditing] = useState(false);
  const [sheet, setSheet] = useState(false);

  const requestKey = `${queryKey}#${attempt}`;

  useEffect(() => {
    if (!queryKey) return;
    const controller = new AbortController();
    fetch(`/api/availability?${queryKey}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error ?? res.status);
        setLoaded({ key: requestKey, status: "ok", cars: data.cars });
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoaded({ key: requestKey, status: "error" });
      });
    return () => controller.abort();
  }, [queryKey, requestKey]);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const intl = localeMeta[locale].intl;
  const labels = { pattern: t.search.stationPattern, types: t.search.stationTypes };
  const formText = { search: t.search, common: t.common };

  if (!query) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="mb-6 rounded-2xl bg-gold-50 px-5 py-4 font-semibold text-gold-800 ring-1 ring-gold-200">{t.results.invalid}</p>
        <div className="rounded-[1.75rem] bg-white p-3 shadow-lift ring-1 ring-black/5 sm:p-4">
          <SearchForm locale={locale} t={formText} />
        </div>
      </div>
    );
  }

  const isLoading = !loaded || loaded.key !== requestKey;
  const cars = !isLoading && loaded.status === "ok" ? loaded.cars : [];
  const days = rentalDays(query.start, query.end);
  const pickup = getStation(query.pickup);
  const dropoff = getStation(query.dropoff);

  const visible = cars.filter((c) => matches(c, filters)).sort((a, b) => (sort === "asc" ? priceOf(a) - priceOf(b) : priceOf(b) - priceOf(a)));
  const cheapestId = cars.length > 1 ? [...cars].sort((a, b) => priceOf(a) - priceOf(b))[0].carID : null;
  const activeCount =
    filters.sizes.length + filters.transmissions.length + filters.fuels.length + (filters.minSeats ? 1 : 0) + (filters.noDeposit ? 1 : 0) + (filters.noCard ? 1 : 0);

  const count = (key: FilterKey, test: (car: Car) => boolean) => cars.filter((c) => matches(c, filters, key) && test(c)).length;
  const toggle = (key: "sizes" | "transmissions" | "fuels", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const sizes = [...new Set(cars.map((c) => c.size))].sort((a, b) => sizeRank(a) - sizeRank(b));
  const transmissions = [...new Set(cars.map((c) => c.transmission))];
  const fuels = [...new Set(cars.map((c) => c.fuelType))];

  const filterPanel = (
    <div className="space-y-7">
      <FilterGroup title={t.results.category}>
        {sizes.map((size) => (
          <Check key={size} label={t.car.sizes[size] ?? size} count={count("sizes", (c) => c.size === size)} checked={filters.sizes.includes(size)} onChange={() => toggle("sizes", size)} />
        ))}
      </FilterGroup>
      {transmissions.length > 1 && (
        <FilterGroup title={t.results.transmission}>
          {transmissions.map((value) => (
            <Check
              key={value}
              label={t.car.transmission[value] ?? value}
              count={count("transmissions", (c) => c.transmission === value)}
              checked={filters.transmissions.includes(value)}
              onChange={() => toggle("transmissions", value)}
            />
          ))}
        </FilterGroup>
      )}
      {fuels.length > 1 && (
        <FilterGroup title={t.results.fuel}>
          {fuels.map((value) => (
            <Check key={value} label={t.car.fuel[value] ?? value} count={count("fuels", (c) => c.fuelType === value)} checked={filters.fuels.includes(value)} onChange={() => toggle("fuels", value)} />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title={t.results.seats}>
        <div className="flex flex-wrap gap-2">
          {[0, ...SEAT_OPTIONS].map((seats) => (
            <button
              key={seats}
              type="button"
              aria-pressed={filters.minSeats === seats}
              onClick={() => setFilters((f) => ({ ...f, minSeats: seats }))}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                filters.minSeats === seats ? "border-sea-800 bg-sea-800 text-white" : "border-sand-300 bg-white text-ink hover:border-sea-300"
              }`}
            >
              {seats === 0 ? t.results.all : `${seats}+`}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title={t.results.conditions}>
        <Check
          label={t.car.noDeposit}
          count={count("noDeposit", (c) => defaultPlan(c)?.deposit === 0)}
          checked={filters.noDeposit}
          onChange={() => setFilters((f) => ({ ...f, noDeposit: !f.noDeposit }))}
        />
        <Check
          label={t.car.noCreditCard}
          count={count("noCard", (c) => {
            const plan = defaultPlan(c);
            return plan ? !plan.creditCardRequired : false;
          })}
          checked={filters.noCard}
          onChange={() => setFilters((f) => ({ ...f, noCard: !f.noCard }))}
        />
      </FilterGroup>
    </div>
  );

  return (
    <>
      <section className="border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-sand-200 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex min-w-0 flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">
              <p className="flex min-w-0 items-center gap-2 font-bold text-ink">
                <PinIcon className="shrink-0 text-base text-sea-600" />
                <span className="truncate">
                  {pickup ? stationLabel(pickup, locale, labels) : query.pickup}
                  {query.dropoff !== query.pickup && dropoff && (
                    <>
                      {" "}
                      <ArrowRightIcon className="inline text-ink/40" /> {stationLabel(dropoff, locale, labels)}
                    </>
                  )}
                </span>
              </p>
              <p className="flex items-center gap-2 text-ink/65">
                <CalendarIcon className="shrink-0 text-base text-sea-600" />
                <span>
                  {formatNaive(query.start, intl)} → {formatNaive(query.end, intl)}
                  <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-bold text-gold-800">{days === 1 ? t.common.day : fill(t.common.days, { n: days })}</span>
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              aria-expanded={editing}
              className="shrink-0 rounded-full border border-sand-300 px-5 py-2.5 text-sm font-bold text-ink transition hover:border-sea-300"
            >
              {editing ? t.common.close : t.search.modify}
            </button>
          </div>
          {editing && (
            <div className="mt-3 rounded-3xl bg-white p-3 shadow-lift ring-1 ring-sand-200 animate-pop sm:p-4">
              <SearchForm key={queryKey} locale={locale} t={formText} initial={query} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="hidden lg:block" aria-label={t.results.filters}>
          <div className="sticky top-24">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">{t.results.filters}</h2>
              {activeCount > 0 && (
                <button type="button" onClick={() => setFilters(EMPTY)} className="text-sm font-semibold text-sea-700 hover:text-sea-900">
                  {t.results.clear}
                </button>
              )}
            </div>
            {isLoading ? <div className="h-96 animate-pulse rounded-3xl bg-sand-100" /> : cars.length > 0 && filterPanel}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink" aria-live="polite">
              {isLoading ? t.results.loading : loaded.status === "ok" ? fill(t.results.count, { n: visible.length }) : t.results.error}
            </h2>
            {!isLoading && cars.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSheet(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-bold text-ink lg:hidden"
                >
                  <SlidersIcon /> {t.results.filters}
                  {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-sea-800 text-[11px] text-white">{activeCount}</span>}
                </button>
                <label className="relative">
                  <span className="sr-only">{t.results.sort}</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                    className="cursor-pointer appearance-none rounded-full border border-sand-300 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-ink outline-none focus:border-sea-500"
                  >
                    <option value="asc">{t.results.priceLow}</option>
                    <option value="desc">{t.results.priceHigh}</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink/40" />
                </label>
              </div>
            )}
          </div>
          <a href={karpaduHref} className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink/50 hover:text-sea-700">
            <span className="size-1.5 rounded-full bg-sea-500" aria-hidden="true" />
            {t.results.poweredBy} <span className="font-bold">Karpadu</span>
          </a>

          {activeCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ...filters.sizes.map((v) => ({ key: `s-${v}`, label: t.car.sizes[v] ?? v, clear: () => toggle("sizes", v) })),
                ...filters.transmissions.map((v) => ({ key: `t-${v}`, label: t.car.transmission[v] ?? v, clear: () => toggle("transmissions", v) })),
                ...filters.fuels.map((v) => ({ key: `f-${v}`, label: t.car.fuel[v] ?? v, clear: () => toggle("fuels", v) })),
                ...(filters.minSeats ? [{ key: "seats", label: `${filters.minSeats}+ ${t.results.seats}`, clear: () => setFilters((f) => ({ ...f, minSeats: 0 })) }] : []),
                ...(filters.noDeposit ? [{ key: "dep", label: t.car.noDeposit, clear: () => setFilters((f) => ({ ...f, noDeposit: false })) }] : []),
                ...(filters.noCard ? [{ key: "card", label: t.car.noCreditCard, clear: () => setFilters((f) => ({ ...f, noCard: false })) }] : []),
              ].map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.clear}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sea-50 py-1.5 pl-3.5 pr-2.5 text-sm font-semibold text-sea-800 ring-1 ring-sea-100 hover:bg-sea-100"
                >
                  {chip.label} <CloseIcon className="text-xs" />
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <ul className="mt-6 space-y-4" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="grid overflow-hidden rounded-3xl border border-sand-200 bg-white md:grid-cols-[250px_1fr_200px]">
                  <div className="aspect-[16/9] animate-pulse bg-sand-100 md:aspect-auto md:h-48" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 animate-pulse rounded bg-sand-200" />
                    <div className="h-5 w-48 animate-pulse rounded bg-sand-200" />
                    <div className="h-3 w-64 animate-pulse rounded bg-sand-100" />
                    <div className="h-3 w-56 animate-pulse rounded bg-sand-100" />
                  </div>
                  <div className="hidden p-5 md:block">
                    <div className="ml-auto h-7 w-24 animate-pulse rounded bg-sand-200" />
                    <div className="mt-16 h-12 animate-pulse rounded-2xl bg-sand-100" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && loaded.status === "error" && (
            <div className="mt-6 rounded-3xl border border-sand-200 bg-white p-10 text-center">
              <p className="font-semibold text-ink/75">{t.results.error}</p>
              <button type="button" onClick={() => setAttempt((n) => n + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-sea-800 px-6 py-3 text-sm font-bold text-white">
                <RefreshIcon /> {t.common.retry}
              </button>
            </div>
          )}

          {!isLoading && loaded.status === "ok" && visible.length === 0 && (
            <div className="mt-6 rounded-3xl border border-sand-200 bg-white p-10 text-center">
              <p className="text-lg font-bold text-ink">{t.results.empty}</p>
              <p className="mx-auto mt-2 max-w-md text-ink/65">{t.results.emptyHelp}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {activeCount > 0 && (
                  <button type="button" onClick={() => setFilters(EMPTY)} className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-bold text-ink">
                    {t.results.clear}
                  </button>
                )}
                <a href={whatsappLink()} className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-sea-950">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </div>
          )}

          {visible.length > 0 && (
            <ul className="mt-6 space-y-4">
              {visible.map((car, index) => (
                <CarCard
                  priority={index === 0}
                  key={car.carID}
                  car={car}
                  t={t}
                  days={days}
                  intl={intl}
                  cheapest={car.carID === cheapestId}
                  href={`/${locale}/book?${searchQueryString(query, { car: car.carID })}`}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.results.filters}>
          <button type="button" aria-label={t.common.close} onClick={() => setSheet(false)} className="absolute inset-0 bg-sea-950/50 backdrop-blur-sm" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[1.75rem] bg-sand-50 animate-sheet">
            <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
              <h2 className="text-lg font-bold text-ink">{t.results.filters}</h2>
              <button type="button" onClick={() => setSheet(false)} aria-label={t.common.close} className="grid size-9 place-items-center rounded-full bg-white text-ink ring-1 ring-sand-200">
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">{filterPanel}</div>
            <div className="flex gap-3 border-t border-sand-200 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button type="button" onClick={() => setFilters(EMPTY)} className="rounded-2xl border border-sand-300 px-5 py-3.5 text-sm font-bold text-ink">
                {t.results.clear}
              </button>
              <button type="button" onClick={() => setSheet(false)} className="flex-1 rounded-2xl bg-gold-400 py-3.5 text-sm font-extrabold text-sea-950">
                {fill(t.results.showCars, { n: visible.length })}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-sand-100 ${count === 0 && !checked ? "opacity-45" : ""}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="size-[18px] rounded accent-sea-700" />
      <span className="flex-1 text-[15px] font-medium text-ink">{label}</span>
      <span className="text-xs font-semibold tabular-nums text-ink/45">{count}</span>
    </label>
  );
}
