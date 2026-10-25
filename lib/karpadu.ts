import "server-only";
import type { Car, SearchQuery } from "@/lib/booking";

const BACKEND_TIMEOUT_MS = 20_000;
const RETRY_IF_FAILED_WITHIN_MS = 3_000;

export class BackendError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    readonly body: unknown = null,
  ) {
    super(message);
  }
}

interface RawPlan {
  code: string;
  name: string;
  priceForSelectedDays?: number;
  excess?: number | null;
  deposit?: number | null;
  commission?: number;
  creditCardRequired?: boolean;
}

interface RawExtra {
  extrasID: string;
  name: string;
  priceForSelectedDays?: number;
  commission?: number;
}

export interface RawCar {
  companyId: number;
  carID: number;
  currency?: string;
  make: string;
  model: string;
  year?: number;
  size: string;
  minAge?: number;
  maxAge?: number;
  doors?: number;
  seats?: number;
  transmission: string;
  fuelType: string;
  imageURL?: string;
  ac?: boolean;
  extras?: RawExtra[];
  insuranceOptions?: RawPlan[];
  totalPrice: number;
  originalPrice?: number;
  commission?: number;
}

function config() {
  const base = process.env.KARPADU_BACKEND;
  const key = process.env.SUB_KEY;
  if (!base || !key) throw new BackendError("KARPADU_BACKEND or SUB_KEY is not set", null);
  return { base, key, channel: process.env.KARPADU_CHANNEL || "karpadu" };
}

function isTransient(error: unknown) {
  if (!(error instanceof BackendError)) return true;
  return error.status === null || error.status >= 500;
}

async function request(path: string, init: RequestInit = {}) {
  const { base, key } = config();
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...init,
      headers: { "subscription-key": key, "Content-Type": "application/json", ...init.headers },
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    throw new BackendError(error instanceof Error ? error.message : "Network error", null);
  }
  const text = await response.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {}
  if (!response.ok) throw new BackendError(`Backend ${path.split("?")[0]} -> ${response.status}`, response.status, body);
  return body;
}

async function requestWithRetry(path: string, init?: RequestInit) {
  const startedAt = Date.now();
  try {
    return await request(path, init);
  } catch (error) {
    const failedFast = Date.now() - startedAt <= RETRY_IF_FAILED_WITHIN_MS;
    if (!isTransient(error) || !failedFast) throw error;
    return request(path, init);
  }
}

function allowedCompanies() {
  const ids = (process.env.GOLDY_COMPANY_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return ids.length ? new Set(ids) : null;
}

export async function fetchRawAvailability(query: SearchQuery, carID?: number): Promise<{ cars: RawCar[]; currency: string }> {
  const { channel } = config();
  const params = new URLSearchParams({
    PickupLocationID: String(query.pickup),
    ReturnLocationID: String(query.dropoff),
    startDate: query.start,
    endDate: query.end,
    channel,
  });
  if (query.age) params.set("age", String(query.age));
  if (carID) params.set("carID", String(carID));

  const body = (await requestWithRetry(`/GetAvailability?${params}`)) as { availability?: RawCar[]; displayCurrency?: string };
  const companies = allowedCompanies();
  const cars = (body.availability ?? []).filter((car) => !companies || companies.has(String(car.companyId)));
  return { cars, currency: body.displayCurrency || "EUR" };
}

export function toPublicCar(raw: RawCar, currency: string): Car {
  return {
    carID: raw.carID,
    make: raw.make,
    model: raw.model,
    year: raw.year ?? null,
    size: raw.size,
    seats: raw.seats ?? null,
    doors: raw.doors ?? null,
    transmission: raw.transmission,
    fuelType: raw.fuelType,
    imageURL: raw.imageURL ?? null,
    ac: raw.ac !== false,
    minAge: raw.minAge ?? null,
    maxAge: raw.maxAge ?? null,
    totalPrice: Number(raw.totalPrice),
    originalPrice: raw.originalPrice ? Number(raw.originalPrice) : null,
    currency: raw.currency || currency,
    insuranceOptions: (raw.insuranceOptions ?? []).map((plan) => ({
      code: plan.code,
      name: plan.name,
      price: Number(plan.priceForSelectedDays ?? 0),
      excess: plan.excess ?? null,
      deposit: plan.deposit ?? null,
      creditCardRequired: plan.creditCardRequired === true,
    })),
    extras: (raw.extras ?? []).map((extra) => ({
      id: extra.extrasID,
      name: extra.name,
      price: Number(extra.priceForSelectedDays ?? 0),
    })),
  };
}

export async function makeReservation(payload: Record<string, unknown>) {
  const { channel } = config();
  return request("/MakeReservation", {
    method: "POST",
    body: JSON.stringify({ ...payload, Channel: channel }),
  }) as Promise<Record<string, unknown> | null>;
}
