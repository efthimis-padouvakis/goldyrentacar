import Image from "next/image";
import Link from "next/link";
import CurrentYear from "@/components/CurrentYear";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import { fill, type Dictionary } from "@/lib/i18n";
import { karpaduHref } from "@/lib/karpaduLinks";
import { locationPages } from "@/lib/locations";
import { COMPANY, whatsappLink } from "@/lib/site";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const explore = [
    { href: `/${locale}/fleet`, label: t.nav.fleet },
    { href: `/${locale}/locations`, label: t.nav.locations },
    { href: `/${locale}/crete-driving-guide`, label: t.nav.guide },
    { href: `/${locale}/faq`, label: t.nav.faq },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];
  const pickups = locationPages.map((page) => ({
    href: `/${locale}/locations/${page.slug}`,
    label: fill(t.locations.rentIn, { place: page.copy[locale].name }),
  }));
  const social = "grid size-10 place-items-center rounded-full bg-white/5 text-lg text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white";

  return (
    <footer className="bg-sea-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr_1fr] lg:py-16">
        <div>
          <Image src="/img/brand/logo.svg" alt={COMPANY.name} width={164} height={40} className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-2.5">
            <a href={COMPANY.social.facebook} rel="noopener" target="_blank" aria-label="Facebook" className={social}>
              <FacebookIcon />
            </a>
            <a href={COMPANY.social.instagram} rel="noopener" target="_blank" aria-label="Instagram" className={social}>
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} aria-label="WhatsApp" className={social}>
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <FooterColumn title={t.footer.explore} items={explore} />
        <FooterColumn title={t.locations.title} items={pickups} />

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gold-300">{t.footer.contact}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={COMPANY.mapUrl} target="_blank" rel="noopener" className="flex gap-3 transition hover:text-white">
                <PinIcon className="mt-0.5 shrink-0 text-base text-gold-300" />
                <span>
                  {COMPANY.address.street}, {COMPANY.address.locality}
                  <br />
                  {COMPANY.address.postalCode} {COMPANY.address.region}
                </span>
              </a>
            </li>
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <PhoneIcon className="text-base text-gold-300" /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 transition hover:text-white">
                <MailIcon className="text-base text-gold-300" /> {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              © <CurrentYear fallback={2026} /> {COMPANY.name}. {t.footer.rights}
            </span>
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {t.terms.title}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {t.privacy.title}
            </Link>
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t.footer.poweredBy}</span>
            <a href={karpaduHref("home", locale, "goldyrentacar-footer")} className="font-bold text-gold-300 hover:text-gold-200">
              Karpadu
            </a>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <a href={karpaduHref("greece", locale, "goldyrentacar-footer")} className="hover:text-white">
              {t.footer.greece}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gold-300">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
