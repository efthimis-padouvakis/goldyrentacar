import Rich from "@/components/Rich";
import { ArrowRightIcon, CompassIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { ISLAND_LINKS, karpaduHref, type KarpaduPage } from "@/lib/karpaduLinks";

const NAMES: Record<string, Partial<Record<Locale, string>> & { en: string }> = {
  athens: { en: "Athens", el: "Αθήνα", de: "Athen", fr: "Athènes", it: "Atene", nl: "Athene", pl: "Ateny" },
  santorini: { en: "Santorini", el: "Σαντορίνη", it: "Santorini", pl: "Santoryn" },
  mykonos: { en: "Mykonos", el: "Μύκονος", fr: "Mykonos", it: "Mykonos" },
  rhodes: { en: "Rhodes", el: "Ρόδος", de: "Rhodos", it: "Rodi", nl: "Rhodos", pl: "Rodos" },
  corfu: { en: "Corfu", el: "Κέρκυρα", de: "Korfu", fr: "Corfou", nl: "Corfu", pl: "Korfu" },
  thessaloniki: { en: "Thessaloniki", el: "Θεσσαλονίκη", de: "Thessaloniki", fr: "Thessalonique", it: "Salonicco", pl: "Saloniki" },
};

export default function BeyondCrete({ locale, t, creteLink = "crete" }: { locale: Locale; t: Dictionary; creteLink?: KarpaduPage }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 rounded-[2rem] border border-sand-200 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-sea-50 text-2xl text-sea-700">
            <CompassIcon />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{t.beyond.title}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink/65">
            <Rich
              text={t.beyond.text}
              values={{
                karpadu: (
                  <a href={karpaduHref("home", locale, "goldyrentacar-beyond")} className="font-bold text-sea-700 underline decoration-gold-400 underline-offset-4">
                    Karpadu
                  </a>
                ),
              }}
            />
          </p>
          <a
            href={karpaduHref(creteLink, locale, "goldyrentacar-beyond")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 hover:text-sea-900"
          >
            {t.beyond.crete} <ArrowRightIcon />
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {ISLAND_LINKS.map((page) => (
            <li key={page}>
              <a
                href={karpaduHref(page, locale, "goldyrentacar-beyond")}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3.5 text-sm font-semibold text-ink transition hover:border-sea-300 hover:bg-sea-50"
              >
                {NAMES[page][locale] ?? NAMES[page].en}
                <ArrowRightIcon className="text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-sea-600" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
