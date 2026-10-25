import { getTransaction, localeFromViva } from "@/lib/viva";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Success URL of the Viva payment source. Viva also lands here while an asynchronous payment is still pending.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const transactionId = params.get("t") ?? "";
  const orderCode = (params.get("s") ?? "").replace(/\D/g, "");
  const locale = localeFromViva(params.get("lang"));

  let status = "pending";
  if (UUID.test(transactionId)) {
    try {
      const transaction = await getTransaction(transactionId);
      if (transaction.statusId === "F" && transaction.orderCode === orderCode) status = "paid";
    } catch (error) {
      console.error("[viva-success]", error);
    }
  }

  const target = new URL(`/${locale}/booking-confirmed`, request.url);
  target.search = new URLSearchParams({ status, ...(orderCode && { order: orderCode }) }).toString();
  return Response.redirect(target, 303);
}
