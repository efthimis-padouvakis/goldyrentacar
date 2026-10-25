import { parseSearchParams } from "@/lib/booking";
import { BackendError, fetchRawAvailability, toPublicCar } from "@/lib/karpadu";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const parsed = parseSearchParams(params);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  const carParam = params.get("car");
  const carID = carParam ? Number(carParam) : undefined;
  if (carParam && (!Number.isInteger(carID) || carID! <= 0)) {
    return Response.json({ error: "invalid_car" }, { status: 400 });
  }

  try {
    const { cars, currency } = await fetchRawAvailability(parsed.query, carID);
    const list = (carID ? cars.filter((car) => car.carID === carID) : cars).map((car) => toPublicCar(car, currency));
    return Response.json({ success: true, currency, cars: list }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    if (error instanceof BackendError && error.status !== null && error.status >= 400 && error.status < 500) {
      const body = error.body as { message?: unknown; errorCode?: unknown } | null;
      return Response.json(
        { error: typeof body?.message === "string" ? body.message : "invalid_request", errorCode: body?.errorCode ?? null },
        { status: error.status },
      );
    }
    console.error("[availability]", error);
    return Response.json({ error: "backend_unavailable" }, { status: 502 });
  }
}
