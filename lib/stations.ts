import data from "@/lib/data/stations.json";
import type { Locale } from "@/lib/i18n/config";

export type StationType = "Airport" | "Port" | "Downtown";

export interface Station {
  id: number;
  type: StationType;
  airportCode: string | null;
  prefecture: string;
  lat: number;
  lng: number;
  timeZone: string;
  names: Record<Locale, string>;
}

export const stations = data as Station[];

const byId = new Map(stations.map((station) => [station.id, station]));

export function getStation(id: number | string | null | undefined) {
  if (id === null || id === undefined || id === "") return null;
  return byId.get(Number(id)) ?? null;
}

export interface StationLabels {
  pattern: string;
  types: Record<StationType, string>;
}

export function stationLabel(station: Station, locale: Locale, labels: StationLabels) {
  const name = station.names[locale] ?? station.names.en;
  if (station.type === "Downtown") return name;
  const code = station.airportCode ? ` (${station.airportCode})` : "";
  return labels.pattern.replace("{name}", name).replace("{type}", labels.types[station.type]) + code;
}

export const DEFAULT_STATION_ID = 1;

export const REGIONS = ["Chania", "Rethymno", "Heraklion", "Lasithi"] as const;
export type Region = (typeof REGIONS)[number];

const REGION_NAMES: Record<Region, Record<Locale, string>> = {
  Chania: { en: "Chania", el: "Χανιά", de: "Chania", fr: "La Canée", it: "Chania", nl: "Chania", pl: "Chania" },
  Rethymno: { en: "Rethymno", el: "Ρέθυμνο", de: "Rethymno", fr: "Réthymnon", it: "Retimo", nl: "Rethymnon", pl: "Retimno" },
  Heraklion: { en: "Heraklion", el: "Ηράκλειο", de: "Heraklion", fr: "Héraklion", it: "Heraklion", nl: "Heraklion", pl: "Heraklion" },
  Lasithi: { en: "Lasithi", el: "Λασίθι", de: "Lasithi", fr: "Lassithi", it: "Lasithi", nl: "Lasithi", pl: "Lasithi" },
};

/** Regional unit of a station. Sitia belongs to Lasithi. */
export function stationRegion(station: Station): Region {
  return station.prefecture === "Sitia" ? "Lasithi" : (station.prefecture as Region);
}

export function regionName(station: Station | Region, locale: Locale) {
  const region = typeof station === "string" ? station : stationRegion(station);
  return REGION_NAMES[region]?.[locale] ?? region;
}
