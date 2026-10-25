"use client";

import { useState } from "react";
import FleetCard, { type FleetCardText } from "@/components/FleetCard";
import { sizeRank } from "@/lib/booking";
import type { FleetCar } from "@/lib/fleet";

export default function FleetGrid({ cars, t, allLabel, href }: { cars: FleetCar[]; t: FleetCardText; allLabel: string; href: string }) {
  const [size, setSize] = useState("all");
  const sizes = [...new Set(cars.map((car) => car.size))].sort((a, b) => sizeRank(a) - sizeRank(b));
  const visible = size === "all" ? cars : cars.filter((car) => car.size === size);
  const chip = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active ? "border-sea-800 bg-sea-800 text-white" : "border-sand-300 bg-white text-ink hover:border-sea-300"
    }`;

  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ value: "all", label: allLabel, n: cars.length }, ...sizes.map((s) => ({ value: s, label: t.car.sizes[s] ?? s, n: cars.filter((c) => c.size === s).length }))].map((option) => (
          <button key={option.value} type="button" aria-pressed={size === option.value} onClick={() => setSize(option.value)} className={`${chip(size === option.value)} shrink-0`}>
            {option.label}
            <span className={`text-xs ${size === option.value ? "text-white/60" : "text-ink/40"}`}>{option.n}</span>
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((car, index) => (
          <li key={car.slug}>
            <FleetCard car={car} t={t} href={href} priority={index < 2} />
          </li>
        ))}
      </ul>
    </>
  );
}
