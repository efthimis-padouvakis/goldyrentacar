import Link from "next/link";
import type { ReactNode } from "react";
import { CreteOutline } from "@/components/CreteMap";
import JsonLd from "@/components/JsonLd";
import { ChevronRightIcon } from "@/components/icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ crumbs, tone = "light" }: { crumbs: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-white/55 hover:text-white" : "text-ink/50 hover:text-ink";
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: `${SITE_URL}${c.href}` })))} />
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium">
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {index > 0 && <ChevronRightIcon aria-hidden="true" className={tone === "dark" ? "text-white/30" : "text-ink/25"} />}
            {index === crumbs.length - 1 ? (
              <span aria-current="page" className={tone === "dark" ? "text-white/90" : "text-ink/80"}>
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.href} className={`transition ${muted}`}>
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHero({
  title,
  lead,
  eyebrow,
  crumbs,
  children,
  aside,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative border-b border-sand-200 bg-sand-100/70">
      {/* Clip only the decoration, so dropdowns in children can overflow the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <CreteOutline className="absolute -right-40 top-6 hidden w-[58rem] opacity-70 lg:block" />
      </div>
      <div className={`relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 ${aside ? "lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12" : ""}`}>
        <div>
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{eyebrow}</p>}
          <h1 className={`${eyebrow ? "mt-3" : "mt-8"} max-w-3xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl`}>{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/65">{lead}</p>}
        </div>
        {aside && <div className="mt-10 lg:mt-8">{aside}</div>}
        {children && <div className={`relative z-20 ${aside ? "lg:col-span-2" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}
