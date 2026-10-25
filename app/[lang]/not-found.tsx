import Link from "next/link";
import { lang } from "next/root-params";
import { CreteOutline } from "@/components/CreteMap";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : defaultLocale;
  const t = getDictionary(locale);
  return (
    <section className="relative isolate overflow-hidden">
      <CreteOutline className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[70rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-gold-shine text-8xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{t.notFound.title}</h1>
        <p className="mt-3 text-ink/65">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}`} className="rounded-full bg-gold-400 px-7 py-3.5 font-extrabold text-sea-950 hover:bg-gold-300">
            {t.notFound.cta}
          </Link>
          <Link href={`/${locale}/locations`} className="rounded-full border border-sand-300 bg-white px-7 py-3.5 font-bold text-ink hover:border-sea-300">
            {t.nav.locations}
          </Link>
        </div>
      </div>
    </section>
  );
}
