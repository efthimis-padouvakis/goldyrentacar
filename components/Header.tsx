import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LanguageSwitcher, { LanguageSwitcherFallback } from "@/components/LanguageSwitcher";
import MobileMenu from "@/components/MobileMenu";
import NavLinks from "@/components/NavLinks";
import { PhoneIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { COMPANY, whatsappLink } from "@/lib/site";

export default function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const items = [
    { href: `/${locale}/fleet`, label: t.nav.fleet },
    { href: `/${locale}/locations`, label: t.nav.locations },
    { href: `/${locale}/crete-driving-guide`, label: t.nav.guide },
    { href: `/${locale}/faq`, label: t.nav.faq },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/95 backdrop-blur-md supports-[backdrop-filter]:bg-sand-50/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href={`/${locale}`} className="shrink-0 rounded-lg" aria-label={`${COMPANY.name}, ${t.nav.home}`}>
          <Image src="/img/brand/logo.svg" alt={COMPANY.name} width={164} height={40} priority className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden xl:block" aria-label={t.nav.menu}>
          <Suspense fallback={<NavLinks items={items} pathname="" />}>
            <NavLinks items={items} />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={COMPANY.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-ink/75 transition hover:text-ink 2xl:flex"
          >
            <PhoneIcon className="text-sea-600" /> {COMPANY.phone}
          </a>
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} label={t.nav.language} />}>
            <LanguageSwitcher locale={locale} label={t.nav.language} />
          </Suspense>
          <Link
            href={`/${locale}#search`}
            className="hidden rounded-full bg-sea-800 px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-sea-700 sm:inline-flex"
          >
            {t.nav.bookNow}
          </Link>
          <MobileMenu
            items={[{ href: `/${locale}`, label: t.nav.home }, ...items]}
            label={t.nav.menu}
            closeLabel={t.common.close}
            bookNow={{ href: `/${locale}#search`, label: t.nav.bookNow }}
            phone={COMPANY.phone}
            phoneHref={COMPANY.phoneHref}
            whatsappHref={whatsappLink()}
          />
        </div>
      </div>
    </header>
  );
}
