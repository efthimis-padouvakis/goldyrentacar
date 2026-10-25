import type { Metadata } from "next";
import { CreteOutline } from "@/components/CreteMap";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { projectToMap } from "@/lib/creteMap";
import { getDictionary } from "@/lib/i18n";
import { localeFrom } from "@/lib/i18n/params";
import { pageMetadata } from "@/lib/seo";
import { COMPANY, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: t.meta.contactTitle, description: t.meta.contactDescription });
}

// Nea Alikarnassos, next to Heraklion Airport.
const OFFICE = projectToMap(35.329, 25.165);

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const locale = await localeFrom(params);
  const t = getDictionary(locale);
  const card = "group flex items-center gap-4 rounded-3xl border border-sand-200 bg-white p-5 transition hover:border-sea-300 hover:shadow-soft sm:p-6";
  const icon = "grid size-12 shrink-0 place-items-center rounded-2xl bg-sea-50 text-xl text-sea-700";
  return (
    <>
      <PageHero
        eyebrow={t.meta.siteName}
        title={t.contact.title}
        lead={t.contact.intro}
        crumbs={[
          { name: t.nav.home, href: `/${locale}` },
          { name: t.nav.contact, href: `/${locale}/contact` },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <a href={whatsappLink()} className="group flex items-center gap-4 rounded-3xl bg-sea-900 p-6 text-white transition hover:bg-sea-800 sm:p-7">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-whatsapp text-3xl text-white">
              <WhatsAppIcon />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-white/60">{t.contact.whatsapp}</span>
              <span className="text-xl font-bold">{t.contact.whatsappCta}</span>
            </span>
            <ArrowRightIcon className="text-xl text-white/50 transition group-hover:translate-x-1" />
          </a>
          <a href={COMPANY.phoneHref} className={card}>
            <span className={icon}>
              <PhoneIcon />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink/55">{t.contact.phone}</span>
              <span className="text-lg font-bold text-ink">{COMPANY.phone}</span>
            </span>
          </a>
          <a href={`mailto:${COMPANY.email}`} className={card}>
            <span className={icon}>
              <MailIcon />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink/55">{t.contact.email}</span>
              <span className="block truncate text-lg font-bold text-ink">{COMPANY.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-3 px-1 pt-2">
            <span className="text-sm font-semibold text-ink/55">{t.contact.social}</span>
            <a href={COMPANY.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white text-lg text-ink ring-1 ring-sand-200 hover:ring-sea-300">
              <FacebookIcon />
            </a>
            <a href={COMPANY.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white text-lg text-ink ring-1 ring-sand-200 hover:ring-sea-300">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <a href={COMPANY.mapUrl} target="_blank" rel="noopener" className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition hover:border-sea-300 hover:shadow-soft">
          <div className="relative bg-sea-50/50 px-6 py-10 sm:px-10">
            <div className="relative">
              <CreteOutline className="w-full" />
              <span className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${OFFICE.x}%`, top: `${OFFICE.y}%` }}>
                <PinIcon className="text-4xl text-coral-500 drop-shadow" />
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-start gap-4 p-6 sm:p-7">
            <span className={icon}>
              <PinIcon />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-ink/55">{t.contact.office}</span>
              <span className="block text-lg font-bold text-ink">
                {COMPANY.address.street}, {COMPANY.address.locality}
              </span>
              <span className="block text-ink/65">
                {COMPANY.address.postalCode} {COMPANY.address.region}
              </span>
              <span className="mt-3 flex items-center gap-1.5 text-sm font-bold text-sea-700">
                {t.contact.directions} <ArrowRightIcon className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </div>
        </a>
      </section>
    </>
  );
}
