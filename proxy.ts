import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("lang")?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.lang && Number.isFinite(entry.q))
    .sort((a, b) => b.q - a.q);

  const match = ranked.find((entry) => isLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];
  if ((locales as readonly string[]).includes(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
