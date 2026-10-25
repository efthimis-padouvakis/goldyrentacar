import "./globals.css";
import type { Metadata } from "next";
import { localeMeta, locales } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "404 – Goldy Rent a Car",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-deep grid min-h-dvh place-items-center px-4 font-sans text-white">
        <main className="max-w-lg text-center">
          <p className="text-gold-shine text-8xl font-extrabold">404</p>
          <h1 className="mt-4 text-2xl font-extrabold">Page not found</h1>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {locales.map((locale) => (
              <li key={locale}>
                <a href={`/${locale}`} lang={locale} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-gold-400 hover:bg-white/5">
                  {localeMeta[locale].nativeName}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
