import Link from "next/link";
import { CRETE_MAP, projectToMap } from "@/lib/creteMap";
import type { Locale } from "@/lib/i18n/config";
import { fill, type Dictionary } from "@/lib/i18n";
import { locationPages } from "@/lib/locations";
import { getStation, stations } from "@/lib/stations";

type Side = "top" | "bottom" | "left" | "right";

// Where each featured label sits, chosen so neighbours (Chania / its airport,
// Hersonissos / Malia, the three Heraklion points) never overlap.
const LABELS: Record<string, { side: Side; always?: boolean } | null> = {
  chania: { side: "top", always: true },
  "chania-airport": { side: "right" },
  rethymno: { side: "top", always: true },
  heraklion: { side: "top", always: true },
  "heraklion-airport": { side: "bottom" },
  "heraklion-port": null,
  hersonissos: { side: "top" },
  malia: { side: "bottom" },
  "agios-nikolaos": { side: "bottom", always: true },
};

const SIDE_CLASS: Record<Side, string> = {
  top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-1.5 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

interface Props {
  locale: Locale;
  t: Dictionary;
  tone?: "light" | "dark";
  /** Station to emphasise, e.g. on a location page. */
  highlight?: number;
  /** "highlight" keeps only the emphasised label visible, for small maps. */
  labels?: "all" | "highlight";
  className?: string;
}

export default function CreteMap({ locale, t, tone = "light", highlight, labels = "all", className = "" }: Props) {
  const dark = tone === "dark";
  const featuredIds = new Set(locationPages.map((page) => page.stationId));
  const highlighted = highlight ? getStation(highlight) : null;

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${CRETE_MAP.width} / ${CRETE_MAP.height}` }}>
      <svg viewBox={`0 0 ${CRETE_MAP.width} ${CRETE_MAP.height}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <path d={CRETE_MAP.path} fill="none" stroke={dark ? "#239693" : "#7ccfca"} strokeOpacity={dark ? 0.12 : 0.18} strokeWidth={56} strokeLinejoin="round" />
        <path d={CRETE_MAP.path} fill="none" stroke={dark ? "#239693" : "#7ccfca"} strokeOpacity={dark ? 0.2 : 0.3} strokeWidth={28} strokeLinejoin="round" />
        <path
          d={CRETE_MAP.path}
          fill={dark ? "#124c4e" : "#f7f2e9"}
          stroke={dark ? "#239693" : "#cdb68d"}
          strokeOpacity={dark ? 0.7 : 0.9}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </svg>

      {stations
        .filter((s) => !featuredIds.has(s.id))
        .map((station) => {
          const { x, y } = projectToMap(station.lat, station.lng);
          return (
            <span
              key={station.id}
              aria-hidden="true"
              className={`absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? "bg-sea-300/60" : "bg-sea-600/45"}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}

      {locationPages.map((page) => {
        const station = getStation(page.stationId);
        if (!station) return null;
        const { x, y } = projectToMap(station.lat, station.lng);
        const label = labels === "all" ? LABELS[page.slug] : null;
        const name = page.copy[locale].name;
        const isHighlight = highlighted?.id === station.id;
        return (
          <Link
            key={page.slug}
            href={`/${locale}/locations/${page.slug}`}
            aria-label={fill(t.locations.rentIn, { place: name })}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {(station.type === "Airport" || isHighlight) && (
              <span aria-hidden="true" className="absolute inset-1.5 rounded-full bg-gold-400/60 animate-ping-slow" />
            )}
            <span
              aria-hidden="true"
              className={`relative block rounded-full ring-2 transition group-hover:scale-125 ${isHighlight ? "size-4 bg-coral-500" : "size-3 bg-gold-400"} ${
                dark ? "ring-sea-950" : "ring-white"
              }`}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold shadow-soft sm:text-xs ${SIDE_CLASS[label?.side ?? "top"]} ${
                dark ? "bg-sea-950/80 text-white ring-1 ring-white/10" : "bg-white/95 text-ink ring-1 ring-sand-200"
              } ${
                isHighlight || label?.always
                  ? ""
                  : label
                    ? "hidden group-hover:block group-focus-visible:block sm:block"
                    : "hidden group-hover:block group-focus-visible:block"
              } ${isHighlight ? "z-20 !block" : ""}`}
            >
              {name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/** The island outline alone, for decoration. */
export function CreteOutline({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "dark" ? "#45b2ae" : "#cdb68d";
  return (
    <svg viewBox={`0 0 ${CRETE_MAP.width} ${CRETE_MAP.height}`} className={className} aria-hidden="true" fill="none">
      <path d={CRETE_MAP.path} stroke={stroke} strokeOpacity={0.14} strokeWidth={60} strokeLinejoin="round" />
      <path d={CRETE_MAP.path} stroke={stroke} strokeOpacity={0.22} strokeWidth={26} strokeLinejoin="round" />
      <path d={CRETE_MAP.path} stroke={stroke} strokeOpacity={0.6} strokeWidth={1.5} strokeLinejoin="round" fill={tone === "dark" ? "#0f3e41" : "#f7f2e9"} />
    </svg>
  );
}
