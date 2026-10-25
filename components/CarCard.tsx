import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BoltIcon, CardIcon, CheckIcon, DoorIcon, FuelIcon, GearIcon, InfinityIcon, LeafIcon, RefreshIcon, ShieldIcon, SnowIcon, UsersIcon } from "@/components/icons";
import { defaultPlan, formatMoney, type Car } from "@/lib/booking";
import { fill, type Dictionary } from "@/lib/i18n";

export interface CarCardText {
  car: Dictionary["car"];
  common: Dictionary["common"];
  results: Dictionary["results"];
}

export default function CarCard({
  car,
  t,
  days,
  intl,
  href,
  cheapest = false,
  priority = false,
}: {
  car: Car;
  t: CarCardText;
  days: number;
  intl: string;
  href: string;
  cheapest?: boolean;
  priority?: boolean;
}) {
  const plan = defaultPlan(car);
  const total = car.totalPrice + (plan?.price ?? 0);
  const perDay = Math.round((total / days) * 100) / 100;
  const FuelGlyph = car.fuelType === "Electric" ? BoltIcon : car.fuelType === "Hybrid" ? LeafIcon : FuelIcon;
  const noDeposit = plan?.deposit === 0;
  const noCard = plan ? !plan.creditCardRequired : false;
  const discount = car.originalPrice !== null && car.originalPrice > total ? Math.round((1 - total / car.originalPrice) * 100) : 0;
  const money = (n: number) => formatMoney(n, car.currency, intl);
  const daysLabel = days === 1 ? t.common.day : fill(t.common.days, { n: days });

  const specs = [
    car.seats ? { Icon: UsersIcon, text: fill(t.car.seats, { n: car.seats }) } : null,
    car.doors ? { Icon: DoorIcon, text: fill(t.car.doors, { n: car.doors }) } : null,
    { Icon: GearIcon, text: t.car.transmission[car.transmission] ?? car.transmission },
    { Icon: FuelGlyph, text: t.car.fuel[car.fuelType] ?? car.fuelType },
    car.ac ? { Icon: SnowIcon, text: t.car.ac } : null,
  ].filter((spec) => spec !== null);

  return (
    <li>
      <article className="group relative grid grid-cols-[7.5rem_1fr] overflow-hidden rounded-3xl border border-sand-200 bg-white transition duration-300 hover:border-sand-300 hover:shadow-lift sm:grid-cols-[11rem_1fr] md:grid-cols-[250px_1fr_minmax(200px,auto)]">
        <div className="relative ml-3 mt-4 aspect-[4/3] self-start rounded-2xl bg-[radial-gradient(110%_90%_at_50%_100%,var(--color-sand-100),white_70%)] md:m-0 md:aspect-auto md:h-full md:min-h-48 md:rounded-none">
          {car.imageURL && (
            <Image
              src={car.imageURL}
              alt={`${car.make} ${car.model}`}
              fill
              unoptimized
              priority={priority}
              sizes="(min-width: 768px) 250px, 176px"
              className="object-contain p-1.5 transition duration-500 group-hover:scale-105 md:p-5"
            />
          )}
          <div className="absolute -top-2 left-0 flex flex-wrap gap-1.5 md:left-4 md:top-4">
            {cheapest && <span className="rounded-full bg-sea-800 px-2.5 py-1 text-[11px] font-bold text-white">{t.results.lowestPrice}</span>}
            {discount >= 5 && <span className="rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-bold text-white">−{discount}%</span>}
          </div>
        </div>

        <div className="min-w-0 px-4 pb-1 pt-4 sm:px-5 md:py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-700">{t.car.sizes[car.size] ?? car.size}</p>
          <h3 className="mt-1 text-lg font-bold leading-snug text-ink sm:text-xl">
            {car.make} {car.model} <span className="text-sm font-medium text-ink/40">{t.common.orSimilar}</span>
          </h3>
          <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px] text-ink/70 sm:text-sm">
            {specs.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-1.5">
                <Icon className="text-sea-600" /> {text}
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid gap-1.5 text-[13px] sm:text-sm lg:grid-cols-2">
            <Feature Icon={InfinityIcon} text={t.car.unlimitedKm} />
            <Feature Icon={RefreshIcon} text={t.car.freeCancellation} />
            {noDeposit ? <Feature Icon={ShieldIcon} text={t.car.noDeposit} /> : plan?.deposit ? <Feature Icon={ShieldIcon} text={`${t.car.deposit} ${money(plan.deposit)}`} muted /> : null}
            <Feature Icon={CardIcon} text={noCard ? t.car.noCreditCard : t.car.creditCard} muted={!noCard} />
          </ul>
          {plan && plan.excess !== null && (
            <p className="mt-3 text-xs text-ink/50">
              {t.car.plans[plan.code] ?? plan.name} · {t.car.excess} {money(plan.excess)}
            </p>
          )}
        </div>

        <div className="col-span-2 mt-4 flex items-end justify-between gap-4 border-t border-sand-100 bg-sand-50/60 px-4 py-4 sm:px-5 md:col-span-1 md:mt-0 md:flex-col md:items-stretch md:justify-between md:border-l md:border-t-0 md:py-5">
          <div className="md:text-right">
            {discount >= 5 && <p className="text-sm text-ink/40 line-through">{money(car.originalPrice!)}</p>}
            <p className="text-[1.65rem] font-extrabold leading-none tracking-tight text-ink tabular-nums">
              {money(perDay)}
              <span className="ml-1 text-sm font-semibold text-ink/50">{t.common.perDay}</span>
            </p>
            <p className="mt-1.5 text-sm text-ink/60">
              {fill(t.results.totalFor, { days: daysLabel })}: <strong className="font-bold text-ink tabular-nums">{money(total)}</strong>
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-400 px-6 py-3.5 text-[15px] font-extrabold text-sea-950 transition after:absolute after:inset-0 hover:bg-gold-300"
          >
            {t.car.select} <ArrowRightIcon />
          </Link>
        </div>
      </article>
    </li>
  );
}

function Feature({ Icon, text, muted = false }: { Icon: typeof CheckIcon; text: string; muted?: boolean }) {
  return (
    <li className={`flex items-center gap-2 ${muted ? "text-ink/55" : "font-semibold text-sea-800"}`}>
      <Icon className={muted ? "text-ink/35" : "text-sea-600"} />
      {text}
    </li>
  );
}
