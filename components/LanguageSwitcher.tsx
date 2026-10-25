"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "@/components/icons";

function swapLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  parts[1] = locale;
  return parts.join("/") || `/${locale}`;
}

export function LanguageMenu({ locale, label, hrefFor }: { locale: Locale; label: string; hrefFor: (l: Locale) => string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(event.target as Node)) ref.current.removeAttribute("open");
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  return (
    <details ref={ref} className="group relative">
      <summary
        className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-sand-300 bg-white px-3 text-sm font-semibold text-ink transition hover:border-sea-300"
        aria-label={`${label}: ${localeMeta[locale].nativeName}`}
      >
        <GlobeIcon className="text-base text-sea-600" />
        {locale.toUpperCase()}
        <ChevronDownIcon className="text-xs text-ink/50 transition group-open:rotate-180" />
      </summary>
      <ul className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-sand-200 bg-white p-1.5 shadow-lift animate-pop">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={hrefFor(l)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => {
                document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
                ref.current?.removeAttribute("open");
              }}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition hover:bg-sand-100 ${l === locale ? "font-bold text-sea-800" : "text-ink/80"}`}
            >
              {localeMeta[l].nativeName}
              {l === locale ? <CheckIcon className="text-sea-600" /> : <span className="text-xs text-ink/40">{l.toUpperCase()}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  return <LanguageMenu locale={locale} label={label} hrefFor={(l) => `${swapLocale(pathname, l)}${search ? `?${search}` : ""}`} />;
}

export function LanguageSwitcherFallback({ locale, label }: { locale: Locale; label: string }) {
  return <LanguageMenu locale={locale} label={label} hrefFor={(l) => `/${l}`} />;
}
