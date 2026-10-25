import { localeFromViva } from "@/lib/viva";

// Failure URL of the Viva payment source. BookingForm sends the customer back to the car they were booking.
export async function GET(request: Request) {
  const locale = localeFromViva(new URL(request.url).searchParams.get("lang"));
  return Response.redirect(new URL(`/${locale}/book?payment=failed`, request.url), 303);
}
