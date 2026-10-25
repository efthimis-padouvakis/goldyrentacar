import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BagIcon, BoltIcon, FuelIcon, GearIcon, LeafIcon, UsersIcon } from "@/components/icons";
import type { FleetCar } from "@/lib/fleet";
import { fill, type Dictionary } from "@/lib/i18n";

export type FleetCardText = Pick<Dictionary, "car" | "common" | "fleet" | "meta">;

export default function FleetCard({ car, t, href, priority = false }: { car: FleetCar; t: FleetCardText; href: string; priority?: boolean }) {
  const FuelGlyph = car.fuel === "Electric" ? BoltIcon : car.fuel === "Hybrid" ? LeafIcon : FuelIcon;
  const green = car.fuel !== "Petrol";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-sand-300 hover:shadow-lift">
      <div className="relative aspect-[16/10] bg-[radial-gradient(120%_90%_at_50%_100%,var(--color-sand-100),white_70%)]">
        <Image
          src={car.image}
          alt={`${car.name} ${car.year}, ${t.meta.siteName}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 85vw"
          className="object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/70 ring-1 ring-sand-200">
          {t.car.sizes[car.size] ?? car.size}
        </span>
        {green && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-sea-50 px-2.5 py-1 text-[11px] font-bold text-sea-700 ring-1 ring-sea-100">
            <FuelGlyph /> {t.car.fuel[car.fuel]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
        <h3 className="text-lg font-bold leading-snug text-ink">
          {car.name} <span className="font-medium text-ink/40">{car.year}</span>
        </h3>
        <p className="text-sm text-ink/50">{t.common.orSimilar}</p>
        <ul className="mb-5 mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-ink/70">
          <li className="flex items-center gap-2">
            <UsersIcon className="text-sea-600" /> {fill(t.car.seats, { n: car.seats })}
          </li>
          <li className="flex items-center gap-2">
            <GearIcon className="text-sea-600" /> {t.car.transmission[car.transmission]}
          </li>
          <li className="flex items-center gap-2">
            <FuelGlyph className="text-sea-600" /> {t.car.fuel[car.fuel]}
          </li>
          <li className="flex items-center gap-2">
            <BagIcon className="text-sea-600" /> {fill(car.bagSize === "big" ? t.car.bigBags : t.car.smallBags, { n: car.bags })}
          </li>
        </ul>
        <Link
          href={href}
          className="mt-auto inline-flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3 text-sm font-bold text-ink transition after:absolute after:inset-0 group-hover:bg-gold-400 group-hover:text-sea-950"
        >
          {t.fleet.checkPrices}
          <ArrowRightIcon className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
