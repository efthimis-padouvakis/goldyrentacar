export const BOOKING_STORAGE_KEY = "goldy:booking";
export const CHECKOUT_STORAGE_KEY = "goldy:checkout";
export const MIN_RENTAL_MS = 60 * 60 * 1000;
export const DEFAULT_TIME = "10:00";
export const DEFAULT_AGE = 30;
export const MIN_AGE = 18;
export const MAX_AGE = 99;

export interface SearchQuery {
  pickup: number;
  dropoff: number;
  start: string;
  end: string;
  age: number | null;
}

export interface InsuranceOption {
  code: string;
  name: string;
  price: number;
  excess: number | null;
  deposit: number | null;
  creditCardRequired: boolean;
}

export interface CarExtra {
  id: string;
  name: string;
  price: number;
}

export interface Car {
  carID: number;
  make: string;
  model: string;
  year: number | null;
  size: string;
  seats: number | null;
  doors: number | null;
  transmission: string;
  fuelType: string;
  imageURL: string | null;
  ac: boolean;
  minAge: number | null;
  maxAge: number | null;
  totalPrice: number;
  originalPrice: number | null;
  currency: string;
  insuranceOptions: InsuranceOption[];
  extras: CarExtra[];
}

const NAIVE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

export function toNaive(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function splitNaive(value: string) {
  const [date, time = DEFAULT_TIME] = value.split("T");
  return { date, time: time.slice(0, 5) };
}

export function naiveToUtcMs(value: string) {
  const [d, t] = value.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [h, min] = t.split(":").map(Number);
  return Date.UTC(y, m - 1, day, h, min);
}

export function rentalDays(start: string, end: string) {
  const ms = naiveToUtcMs(end) - naiveToUtcMs(start);
  return Math.max(1, Math.ceil(ms / 86_400_000));
}

export function parseSearchParams(params: URLSearchParams): { ok: true; query: SearchQuery } | { ok: false; error: string } {
  const pickup = Number(params.get("pickup"));
  const dropoff = Number(params.get("dropoff") || params.get("pickup"));
  const start = params.get("start") ?? "";
  const end = params.get("end") ?? "";
  const ageRaw = params.get("age");
  const age = ageRaw ? Number(ageRaw) : null;

  if (!Number.isInteger(pickup) || pickup <= 0 || !Number.isInteger(dropoff) || dropoff <= 0) {
    return { ok: false, error: "invalid_location" };
  }
  if (!NAIVE.test(start) || !NAIVE.test(end)) return { ok: false, error: "invalid_dates" };
  const normalizedStart = start.length === 16 ? `${start}:00` : start;
  const normalizedEnd = end.length === 16 ? `${end}:00` : end;
  if (naiveToUtcMs(normalizedEnd) - naiveToUtcMs(normalizedStart) < MIN_RENTAL_MS) {
    return { ok: false, error: "invalid_range" };
  }
  if (age !== null && (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE)) {
    return { ok: false, error: "invalid_age" };
  }
  return { ok: true, query: { pickup, dropoff, start: normalizedStart, end: normalizedEnd, age } };
}

export function searchQueryString(query: SearchQuery, extra: Record<string, string | number> = {}) {
  const params = new URLSearchParams({
    pickup: String(query.pickup),
    dropoff: String(query.dropoff),
    start: query.start.slice(0, 16),
    end: query.end.slice(0, 16),
  });
  if (query.age) params.set("age", String(query.age));
  for (const [key, value] of Object.entries(extra)) params.set(key, String(value));
  return params.toString();
}

export function defaultPlan(car: Car) {
  const order = ["BASIC", "FULL", "PREMIUM"];
  return (
    order.map((code) => car.insuranceOptions.find((option) => option.code === code)).find(Boolean) ??
    car.insuranceOptions[0] ??
    null
  );
}

export function formatMoney(amount: number, currency: string, intlLocale: string) {
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNaive(value: string, intlLocale: string) {
  const ms = naiveToUtcMs(value);
  return new Intl.DateTimeFormat(intlLocale, {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(ms);
}

export const SIZE_ORDER = ["Mini", "Economy", "Compact", "Intermediate", "Standard", "Fullsize", "SUV", "Cabrio", "Premium", "Luxury", "Van", "Minibus"];

export function sizeRank(size: string) {
  const index = SIZE_ORDER.indexOf(size);
  return index === -1 ? SIZE_ORDER.length : index;
}
