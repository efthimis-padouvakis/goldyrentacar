import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n";
import { COMPANY, whatsappLink } from "@/lib/site";

export default function ContactCard({ t, className = "" }: { t: Dictionary; className?: string }) {
  return (
    <div className={`rounded-3xl bg-sea-900 p-6 text-white sm:p-7 ${className}`}>
      <h2 className="text-xl font-bold">{t.contact.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{t.contact.intro}</p>
      <div className="mt-6 space-y-2.5">
        <a href={whatsappLink()} className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp py-3.5 font-bold text-sea-950">
          <WhatsAppIcon className="text-lg" /> {t.contact.whatsappCta}
        </a>
        <a href={COMPANY.phoneHref} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10">
          <PhoneIcon className="text-gold-300" /> {COMPANY.phone}
        </a>
        <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10">
          <MailIcon className="text-gold-300" /> {COMPANY.email}
        </a>
      </div>
    </div>
  );
}
