import "server-only";
import { defaultLocale, isLocale, locales, localeMeta, type Locale } from "@/lib/i18n/config";

const VIVA_TIMEOUT_MS = 20_000;

const HOSTS = {
  demo: { accounts: "https://demo-accounts.vivapayments.com", api: "https://demo-api.vivapayments.com", www: "https://demo.vivapayments.com" },
  live: { accounts: "https://accounts.vivapayments.com", api: "https://api.vivapayments.com", www: "https://www.vivapayments.com" },
};

export class VivaError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    readonly body: unknown = null,
  ) {
    super(message);
  }
}

export interface VivaCustomer {
  email: string;
  fullName: string;
  phone: string;
  countryCode?: string;
  requestLang: string;
}

export interface VivaTransaction {
  statusId: string;
  amount: number;
  orderCode: string;
  merchantTrns: string;
  email: string;
}

function hosts() {
  return process.env.VIVA_ENV === "live" ? HOSTS.live : HOSTS.demo;
}

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new VivaError(`${name} is not set`, null);
  return value;
}

const basic = (user: string, password: string) => `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
const merchantAuth = () => basic(env("VIVA_MERCHANT_ID"), env("VIVA_API_KEY"));

// Order codes are 16 digits and can pass Number.MAX_SAFE_INTEGER, so they are read from the raw text.
const orderCodeIn = (text: string) => text.match(/"orderCode"\s*:\s*"?(\d+)/i)?.[1] ?? "";

async function request(url: string, init: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(url, { ...init, signal: AbortSignal.timeout(VIVA_TIMEOUT_MS), cache: "no-store" });
  } catch (error) {
    throw new VivaError(error instanceof Error ? error.message : "Network error", null);
  }
  const text = await response.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {}
  if (!response.ok) throw new VivaError(`Viva ${new URL(url).pathname} -> ${response.status}`, response.status, body);
  return { text, body };
}

let token: { value: string; expiresAt: number } | null = null;

async function accessToken() {
  if (token && token.expiresAt - Date.now() > 60_000) return token.value;
  const { body } = await request(`${hosts().accounts}/connect/token`, {
    method: "POST",
    headers: { Authorization: basic(env("VIVA_CLIENT_ID"), env("VIVA_CLIENT_SECRET")), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  const { access_token, expires_in } = body as { access_token: string; expires_in: number };
  token = { value: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}

export async function createPaymentOrder(order: { amount: number; customerTrns: string; merchantTrns: string; customer: VivaCustomer }) {
  const { text } = await request(`${hosts().api}/checkout/v2/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
    // Cash at Viva points takes days to clear; the car is not held that long.
    body: JSON.stringify({ ...order, sourceCode: env("VIVA_SOURCE_CODE"), disableCash: true }),
  });
  const orderCode = orderCodeIn(text);
  if (!orderCode) throw new VivaError("Viva order response has no orderCode", null, text);
  return orderCode;
}

export function checkoutUrl(orderCode: string) {
  return `${hosts().www}/web/checkout?ref=${orderCode}`;
}

// Viva sends back the requestLang of the order ("el-GR") as ?lang= on the success and failure URLs.
export function localeFromViva(lang: string | null): Locale {
  const match = locales.find((locale) => localeMeta[locale].intl.toLowerCase() === lang?.toLowerCase());
  const short = lang?.split("-")[0].toLowerCase();
  return match ?? (isLocale(short) ? short : defaultLocale);
}

export async function getTransaction(transactionId: string): Promise<VivaTransaction> {
  const { text, body } = await request(`${hosts().api}/checkout/v2/transactions/${encodeURIComponent(transactionId)}`, {
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  const data = body as Partial<VivaTransaction>;
  return {
    statusId: String(data.statusId ?? ""),
    amount: Number(data.amount ?? 0),
    orderCode: orderCodeIn(text),
    merchantTrns: String(data.merchantTrns ?? ""),
    email: String(data.email ?? ""),
  };
}

// Same calendar day this is a cancellation, afterwards a refund. Needs "Allow refunds" in Settings > API Access.
export async function refundTransaction(transactionId: string, amount: number) {
  const params = new URLSearchParams({ amount: String(amount), sourceCode: env("VIVA_SOURCE_CODE") });
  const { body } = await request(`${hosts().www}/api/transactions/${encodeURIComponent(transactionId)}/?${params}`, {
    method: "DELETE",
    headers: { Authorization: merchantAuth() },
  });
  const result = body as { StatusId?: string; ErrorText?: string | null } | null;
  if (result?.StatusId !== "F") throw new VivaError(`Viva refund not finished: ${result?.ErrorText ?? result?.StatusId}`, null, body);
}

export async function webhookKey() {
  const { body } = await request(`${hosts().www}/api/messages/config/token`, { headers: { Authorization: merchantAuth() } });
  return (body as { Key: string }).Key;
}
