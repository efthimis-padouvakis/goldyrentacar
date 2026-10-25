import { after, connection } from "next/server";
import { BackendError } from "@/lib/karpadu";
import { decodeBooking, quoteBooking, submitReservation, toCents } from "@/lib/reservation";
import { getTransaction, refundTransaction, webhookKey } from "@/lib/viva";

const TRANSACTION_PAYMENT_CREATED = 1796;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Viva calls GET once when the webhook URL is verified in Settings > API Access > Webhooks.
export async function GET() {
  await connection();
  try {
    return Response.json({ Key: await webhookKey() });
  } catch (error) {
    console.error("[viva-webhook] key", error);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const event = (await request.json().catch(() => null)) as { EventTypeId?: number; EventData?: { TransactionId?: string } } | null;
  const transactionId = String(event?.EventData?.TransactionId ?? "");
  if (event?.EventTypeId === TRANSACTION_PAYMENT_CREATED && UUID.test(transactionId)) {
    // Answer at once: a slow reply makes Viva retry, and a retry would book the car twice.
    after(() => confirmBooking(transactionId));
  }
  return Response.json({ ok: true });
}

// Every paid order ends as a reservation or a refund.
async function confirmBooking(transactionId: string) {
  // The webhook body is unsigned, so the payment is read back from Viva.
  const transaction = await getTransaction(transactionId).catch((error) => {
    console.error("[viva-webhook] cannot read transaction", transactionId, error);
    return null;
  });
  if (!transaction || transaction.statusId !== "F") return;

  // Payments from other sources on the same Viva account (POS, payment links) are not ours.
  const booking = decodeBooking(transaction.merchantTrns);
  if (!booking) return;

  const paid = toCents(transaction.amount);
  const context = { transactionId, orderCode: transaction.orderCode, email: booking.driver.email, paid };

  async function refund(reason: string, detail?: unknown) {
    console.error(`[viva-webhook] ${reason}, refunding`, context, detail ?? "");
    try {
      await refundTransaction(transactionId, paid);
    } catch (error) {
      console.error("[viva-webhook] REFUND FAILED, refund by hand in Viva > Sales", context, error);
    }
  }

  if (paid !== booking.amount) return refund("amount mismatch", { expected: booking.amount });

  try {
    const quote = await quoteBooking(booking.search, booking.carID, booking.plan, booking.extras);
    if ("error" in quote) return refund(quote.error);
    if (toCents(quote.price) !== paid) return refund("price changed since payment", { now: quote.price });

    await submitReservation(booking, quote, `goldy|${transaction.orderCode}|${transactionId}`);
    console.info("[viva-webhook] reserved", context);
  } catch (error) {
    if (error instanceof BackendError && error.status === 409) return refund("car unavailable");
    return refund("reservation failed", error);
  }
}
