import "server-only";
import { DEFAULT_AGE, type SearchQuery } from "@/lib/booking";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { fetchRawAvailability, makeReservation, type RawCar } from "@/lib/karpadu";
import { getStation } from "@/lib/stations";

export interface Driver {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  flight: string;
}

// Travels inside the Viva order (merchantTrns) from checkout to the payment webhook.
export interface BookingRequest {
  goldy: 1;
  lang: Locale;
  search: SearchQuery;
  carID: number;
  plan: string;
  extras: string[];
  driver: Driver;
  amount: number;
}

const MERCHANT_TRNS_MAX = 2048;

export function encodeBooking(booking: BookingRequest) {
  const text = JSON.stringify(booking);
  if (text.length > MERCHANT_TRNS_MAX) throw new Error(`Booking does not fit in merchantTrns (${text.length} chars)`);
  return text;
}

export function decodeBooking(text: string): BookingRequest | null {
  try {
    const booking = JSON.parse(text) as BookingRequest;
    return booking?.goldy === 1 && isLocale(booking.lang) && Number.isInteger(booking.amount) ? booking : null;
  } catch {
    return null;
  }
}

export const toCents = (amount: number) => Math.round(amount * 100);

export interface Quote {
  car: RawCar;
  plan: NonNullable<RawCar["insuranceOptions"]>[number];
  extras: NonNullable<RawCar["extras"]>;
  price: number;
  commission: number;
  currency: string;
}

export async function quoteBooking(
  query: SearchQuery,
  carID: number,
  planCode: string,
  extraIds: string[],
): Promise<Quote | { error: "car_unavailable" | "invalid_plan" }> {
  const { cars, currency } = await fetchRawAvailability(query, carID);
  const car = cars.find((candidate) => candidate.carID === carID);
  if (!car) return { error: "car_unavailable" };

  const plan = car.insuranceOptions?.find((option) => option.code === planCode);
  if (!plan) return { error: "invalid_plan" };

  const requested = new Set(extraIds.map(String));
  const extras = (car.extras ?? []).filter((extra) => requested.has(extra.extrasID));

  const price =
    Number(car.totalPrice) + Number(plan.priceForSelectedDays ?? 0) + extras.reduce((sum, extra) => sum + Number(extra.priceForSelectedDays ?? 0), 0);
  const commission =
    Number(car.commission ?? 0) + Number(plan.commission ?? 0) + extras.reduce((sum, extra) => sum + Number(extra.commission ?? 0), 0);

  return { car, plan, extras, price, commission, currency: car.currency || currency };
}

export async function submitReservation(booking: BookingRequest, quote: Quote, reference: string) {
  const { search: query, driver, lang } = booking;
  const { car, plan, extras } = quote;
  const pickup = getStation(query.pickup);
  const dropoff = getStation(query.dropoff);

  return makeReservation({
    lang,
    LangCode: lang.toUpperCase(),
    PickupDatetime: query.start,
    ReturnDatetime: query.end,
    PickupLocationID: query.pickup,
    ReturnLocationID: query.dropoff,
    PickupLocation: pickup ? `${pickup.names.en} ${pickup.type}` : "",
    ReturnLocation: dropoff ? `${dropoff.names.en} ${dropoff.type}` : "",
    Name: driver.firstName,
    Surname: driver.lastName,
    Age: query.age ?? DEFAULT_AGE,
    Email: driver.email,
    Phone: driver.phone,
    Flight: driver.flight,
    CountryCode: driver.country,
    CarID: car.carID,
    Make: car.make,
    Model: car.model,
    Transmission: car.transmission,
    FuelType: car.fuelType,
    CarSize: car.size,
    Karpadu: quote.commission,
    CouponCode: "",
    InsuranceCode: plan.code,
    Price: quote.price,
    Inclusions: extras.map((extra) => ({ ExtraID: extra.extrasID })),
    ExternalReference: reference,
    TrafficSource: "goldyrentacar.gr",
    WaitForConfirmation: true,
  });
}
