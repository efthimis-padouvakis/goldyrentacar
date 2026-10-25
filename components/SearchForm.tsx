"use client";

import { useRouter } from "next/navigation";
import { useCallback, useId, useRef, useState, useSyncExternalStore, useTransition } from "react";
import DateRangeCalendar from "@/components/DateRangeCalendar";
import LocationPicker from "@/components/LocationPicker";
import { CalendarIcon, ChevronDownIcon, CloseIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { DEFAULT_AGE, DEFAULT_TIME, MAX_AGE, MIN_AGE, MIN_RENTAL_MS, naiveToUtcMs, rentalDays, searchQueryString, toNaive, type SearchQuery } from "@/lib/booking";
import { addDays, athensNow, formatDate } from "@/lib/dates";
import { fill, type Dictionary } from "@/lib/i18n";
import { localeMeta, type Locale } from "@/lib/i18n/config";
import { revealOnSmallScreens } from "@/lib/reveal";
import { DEFAULT_STATION_ID } from "@/lib/stations";
import { useDismiss } from "@/lib/useDismiss";

const TIMES = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
const AGE_BAND = { min: 30, max: 65 };

const subscribe = () => () => {};
const getToday = () => athensNow().slice(0, 10);
const getServerToday = () => "";

export interface SearchFormText {
  search: Dictionary["search"];
  common: Pick<Dictionary["common"], "days" | "day">;
}

interface Props {
  locale: Locale;
  t: SearchFormText;
  initial?: Partial<SearchQuery>;
  /** "card" stacks the fields; "bar" lays them out in one row on wide screens. */
  variant?: "card" | "bar";
  id?: string;
}

export default function SearchForm({ locale, t, initial, variant = "bar", id: formId }: Props) {
  const router = useRouter();
  const id = useId();
  const intl = localeMeta[locale].intl;
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const [pending, startTransition] = useTransition();
  const datesRef = useRef<HTMLDivElement>(null);

  const initialAge = initial?.age ?? DEFAULT_AGE;
  const [pickup, setPickup] = useState<number>(initial?.pickup ?? DEFAULT_STATION_ID);
  const [dropoff, setDropoff] = useState<number | null>(initial?.dropoff && initial.dropoff !== initial.pickup ? initial.dropoff : null);
  const [startDate, setStartDate] = useState<string | null>(initial?.start?.slice(0, 10) ?? null);
  const [startTime, setStartTime] = useState(initial?.start?.slice(11, 16) ?? DEFAULT_TIME);
  const [endDate, setEndDate] = useState<string | null>(initial?.end?.slice(0, 10) ?? null);
  const [endTime, setEndTime] = useState(initial?.end?.slice(11, 16) ?? DEFAULT_TIME);
  const [inBand, setInBand] = useState(initialAge >= AGE_BAND.min && initialAge <= AGE_BAND.max);
  const [age, setAge] = useState(String(initialAge));
  const [calendar, setCalendar] = useState<"start" | "end" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = startDate ?? (today ? addDays(today, 3) : "");
  const end = endDate && endDate >= start ? endDate : start ? addDays(start, 7) : "";
  const days = start && end ? rentalDays(toNaive(start, startTime), toNaive(end, endTime)) : 0;

  const closeCalendar = useCallback(() => setCalendar(null), []);
  const toggleCalendar = (which: "start" | "end") => {
    if (calendar === which) return setCalendar(null);
    setCalendar(which);
    revealOnSmallScreens(datesRef.current);
  };
  useDismiss(datesRef, calendar !== null, closeCalendar);

  function selectDate(date: string) {
    if (calendar === "start" || date < start) {
      setStartDate(date);
      if (endDate && endDate < date) setEndDate(null);
      setCalendar("end");
      return;
    }
    setEndDate(date);
    setCalendar(null);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!start || !end) return;
    const startNaive = toNaive(start, startTime);
    const endNaive = toNaive(end, endTime);
    if (naiveToUtcMs(startNaive) < naiveToUtcMs(athensNow()) + MIN_RENTAL_MS) return setError(t.search.errorPast);
    if (naiveToUtcMs(endNaive) - naiveToUtcMs(startNaive) < MIN_RENTAL_MS) return setError(t.search.errorRange);
    setError(null);
    const driverAge = inBand ? DEFAULT_AGE : Math.min(MAX_AGE, Math.max(MIN_AGE, Number(age) || DEFAULT_AGE));
    const qs = searchQueryString({ pickup, dropoff: dropoff ?? pickup, start: startNaive, end: endNaive, age: driverAge });
    startTransition(() => router.push(`/${locale}/search?${qs}`));
  }

  const bar = variant === "bar";
  const twoLocations = dropoff !== null;
  const grid = bar
    ? twoLocations
      ? "@3xl:grid-cols-2 @6xl:grid-cols-[1fr_1fr_0.9fr_0.9fr_auto]"
      : "@3xl:grid-cols-2 @5xl:grid-cols-[1.25fr_1fr_1fr_auto]"
    : "";

  return (
    <form id={formId} onSubmit={submit} noValidate className="@container relative" aria-label={t.search.title}>
      <div className={`grid gap-2 ${grid}`}>
        <LocationPicker label={t.search.pickup} value={pickup} onChange={setPickup} locale={locale} t={t.search} />
        {twoLocations && (
          <div className="relative">
            <LocationPicker label={t.search.dropoff} value={dropoff} onChange={setDropoff} locale={locale} t={t.search} />
            <button
              type="button"
              onClick={() => setDropoff(null)}
              aria-label={t.search.differentReturn}
              className="absolute right-10 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink/40 hover:bg-sand-100 hover:text-ink"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div ref={datesRef} className={`relative grid scroll-mt-20 grid-cols-2 gap-2 ${bar ? (twoLocations ? "@3xl:col-span-2 @6xl:col-span-2" : "@5xl:col-span-2") : ""}`}>
          <DateField
            label={t.search.pickupShort}
            date={start}
            time={startTime}
            onTime={setStartTime}
            onOpen={() => toggleCalendar("start")}
            open={calendar === "start"}
            intl={intl}
            timeLabel={`${t.search.pickupShort} · ${t.search.time}`}
            dateLabel={t.search.pickupDate}
          />
          <DateField
            label={t.search.returnShort}
            date={end}
            time={endTime}
            onTime={setEndTime}
            onOpen={() => toggleCalendar("end")}
            open={calendar === "end"}
            intl={intl}
            timeLabel={`${t.search.returnShort} · ${t.search.time}`}
            dateLabel={t.search.returnDate}
          />

          {calendar && today && (
            <div
              role="dialog"
              aria-label={calendar === "start" ? t.search.selectStart : t.search.selectEnd}
              className="absolute left-1/2 top-full z-40 mt-2 w-[min(46rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-3xl border border-sand-200 bg-white p-4 shadow-lift animate-pop sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-ink">{calendar === "start" ? t.search.selectStart : t.search.selectEnd}</p>
                {days > 0 && (
                  <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800">
                    {days === 1 ? t.common.day : fill(t.common.days, { n: days })}
                  </span>
                )}
              </div>
              <DateRangeCalendar
                start={start}
                end={end}
                min={today}
                selecting={calendar}
                intl={intl}
                labels={{ prev: t.search.prevMonth, next: t.search.nextMonth }}
                onSelect={selectDate}
              />
              <div className="mt-4 flex justify-end border-t border-sand-100 pt-4">
                <button type="button" onClick={closeCalendar} className="rounded-full bg-sea-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-sea-700">
                  {t.search.done}
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={pending || !start}
          className={`flex h-16 items-center justify-center gap-2.5 rounded-2xl bg-gold-400 px-8 text-base font-extrabold text-sea-950 shadow-[0_10px_24px_-10px_rgb(207_155_47/0.8)] transition hover:bg-gold-300 active:scale-[0.99] disabled:opacity-70 ${
            bar ? (twoLocations ? "@3xl:col-span-2 @6xl:col-span-1" : "@3xl:col-span-2 @5xl:col-span-1") : ""
          }`}
        >
          {pending ? <span className="size-5 animate-spin rounded-full border-2 border-sea-950/30 border-t-sea-950" aria-hidden="true" /> : <SearchIcon className="text-xl" />}
          {pending ? t.search.searching : t.search.submit}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-sm">
        {!twoLocations && (
          <button type="button" onClick={() => setDropoff(pickup)} className="inline-flex items-center gap-1.5 font-semibold text-sea-700 hover:text-sea-900">
            <PlusIcon /> {t.search.differentReturn}
          </button>
        )}
        <label className="inline-flex cursor-pointer items-center gap-2 font-medium text-ink/75">
          <input type="checkbox" className="size-4 rounded accent-sea-700" checked={inBand} onChange={(e) => setInBand(e.target.checked)} />
          {t.search.ageBand}
        </label>
        {!inBand && (
          <label className="inline-flex items-center gap-2 font-medium text-ink/75">
            <span>{t.search.age}</span>
            <input
              id={`${id}-age`}
              type="number"
              inputMode="numeric"
              min={MIN_AGE}
              max={MAX_AGE}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-9 w-20 rounded-lg border border-sand-300 bg-white px-2 text-center font-semibold text-ink outline-none focus:border-sea-500 focus:ring-4 focus:ring-sea-100"
            />
          </label>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-coral-50 px-4 py-2.5 text-sm font-semibold text-coral-600">
          {error}
        </p>
      )}
    </form>
  );
}

function DateField({
  label,
  date,
  time,
  onTime,
  onOpen,
  open,
  intl,
  timeLabel,
  dateLabel,
}: {
  label: string;
  date: string;
  time: string;
  onTime: (value: string) => void;
  onOpen: () => void;
  open: boolean;
  intl: string;
  timeLabel: string;
  dateLabel: string;
}) {
  return (
    <div
      className={`flex h-16 min-w-0 items-stretch rounded-2xl border bg-white transition ${open ? "border-sea-500 ring-4 ring-sea-100" : "border-sand-200 hover:border-sea-300"}`}
    >
      <button type="button" onClick={onOpen} aria-expanded={open} aria-haspopup="dialog" aria-label={date ? `${dateLabel}: ${formatDate(date, intl, { dateStyle: "full" })}` : dateLabel} className="flex min-w-0 flex-1 items-center gap-3 pl-3 text-left sm:pl-4">
        <CalendarIcon className="hidden shrink-0 text-lg text-sea-600 @md:block" />
        <span className="min-w-0">
          <span className="block text-xs font-semibold text-ink/55">{label}</span>
          <span className="block truncate text-[15px] font-bold text-ink">
            {date ? (
              <>
                <span className="@md:hidden">{formatDate(date, intl, { day: "numeric", month: "short" })}</span>
                <span className="hidden @md:inline">{formatDate(date, intl, { weekday: "short", day: "numeric", month: "short" })}</span>
              </>
            ) : (
              <span className="text-ink/30">— — —</span>
            )}
          </span>
        </span>
      </button>
      <label className="relative flex shrink-0 items-center rounded-r-2xl border-l border-sand-100 pl-2.5 pr-7 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-sea-500 sm:pl-3">
        <span className="sr-only">{timeLabel}</span>
        <select value={time} onChange={(e) => onTime(e.target.value)} className="cursor-pointer appearance-none bg-transparent text-[15px] font-semibold tabular-nums text-ink outline-none">
          {TIMES.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2.5 text-xs text-ink/40" />
      </label>
    </div>
  );
}
