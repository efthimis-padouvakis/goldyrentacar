import { parseSearchParams } from "@/lib/booking";
import { isLocale, localeMeta } from "@/lib/i18n/config";
import { BackendError } from "@/lib/karpadu";
import { encodeBooking, quoteBooking, toCents, type BookingRequest } from "@/lib/reservation";
import { COMPANY } from "@/lib/site";
import { checkoutUrl, createPaymentOrder, VivaError } from "@/lib/viva";

interface CheckoutBody {
  lang?: string;
  search?: Record<string, string>;
  carID?: number;
  plan?: string;
  extras?: string[];
  driver?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
    flight?: string;
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, max = 120) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "");

// Creates the Viva payment order. The reservation itself is made by /api/viva/webhook once Viva reports the payment.
export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseSearchParams(new URLSearchParams(body.search ?? {}));
  if (!parsed.ok) return Response.json({ success: false, error: parsed.error }, { status: 400 });
  const query = parsed.query;

  const driver = {
    firstName: clean(body.driver?.firstName, 60),
    lastName: clean(body.driver?.lastName, 60),
    email: clean(body.driver?.email, 120).toLowerCase(),
    phone: clean(body.driver?.phone, 30),
    country: clean(body.driver?.country, 2).toUpperCase(),
    flight: clean(body.driver?.flight, 20),
  };
  const carID = Number(body.carID);
  if (!Number.isInteger(carID) || carID <= 0 || !body.plan || !driver.firstName || !driver.lastName || !EMAIL.test(driver.email) || driver.phone.replace(/\D/g, "").length < 6) {
    return Response.json({ success: false, error: "missing_fields" }, { status: 400 });
  }

  if (process.env.RESERVATIONS_ENABLED !== "true") {
    return Response.json({ success: false, disabled: true }, { status: 503 });
  }

  try {
    const extras = (body.extras ?? []).map(String).slice(0, 20);
    const quote = await quoteBooking(query, carID, body.plan, extras);
    if ("error" in quote) {
      return quote.error === "car_unavailable"
        ? Response.json({ success: false, carUnavailable: true }, { status: 409 })
        : Response.json({ success: false, error: quote.error }, { status: 400 });
    }
    if (quote.currency !== "EUR") {
      console.error("[checkout] unsupported currency", quote.currency);
      return Response.json({ success: false, error: "currency_unsupported" }, { status: 502 });
    }

    const lang = isLocale(body.lang) ? body.lang : "en";
    const booking: BookingRequest = {
      goldy: 1,
      lang,
      search: query,
      carID,
      plan: quote.plan.code,
      extras: quote.extras.map((extra) => extra.extrasID),
      driver,
      amount: toCents(quote.price),
    };

    const orderCode = await createPaymentOrder({
      amount: booking.amount,
      customerTrns: `${COMPANY.name}: ${quote.car.make} ${quote.car.model}, ${query.start.slice(0, 10)} → ${query.end.slice(0, 10)}`,
      merchantTrns: encodeBooking(booking),
      customer: {
        email: driver.email,
        fullName: `${driver.firstName} ${driver.lastName}`,
        phone: driver.phone,
        ...(driver.country && { countryCode: driver.country }),
        requestLang: localeMeta[lang].intl,
      },
    });

    return Response.json({ success: true, reference: orderCode, price: quote.price, checkoutUrl: checkoutUrl(orderCode) });
  } catch (error) {
    if (error instanceof BackendError && error.status !== null && error.status >= 400 && error.status < 500) {
      return Response.json({ success: false, error: "rejected" }, { status: error.status });
    }
    if (error instanceof VivaError) {
      console.error("[checkout] viva", error.message, error.body);
      return Response.json({ success: false, error: "payment_unavailable" }, { status: 502 });
    }
    console.error("[checkout]", error);
    return Response.json({ success: false, error: "backend_unavailable" }, { status: 502 });
  }
}
