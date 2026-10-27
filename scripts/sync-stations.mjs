import { writeFile } from "node:fs/promises";

const LOCALES = ["en", "el", "de", "fr", "it", "nl", "pl"];
const REGION = "Crete";
const OUT = new URL("../lib/data/stations.json", import.meta.url);

const backend = process.env.KARPADU_BACKEND;
const key = process.env.SUB_KEY;
if (!backend || !key) {
  console.error("KARPADU_BACKEND and SUB_KEY are required. Run: npm run sync:stations");
  process.exit(1);
}

// Same list as the availability filter. The backend takes one companyId per call, so several are merged.
const companies = (process.env.GOLDY_COMPANY_IDS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

async function fetchCompanyStations(lang, companyId) {
  const query = new URLSearchParams({ channel: process.env.KARPADU_CHANNEL || "karpadu", lang, countryCode: "GR" });
  if (companyId) query.set("companyId", companyId);
  const res = await fetch(`${backend}/GetStations?${query}`, {
    headers: { "subscription-key": key },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`GetStations ${lang} ${companyId ?? ""} -> ${res.status}`);
  const data = await res.json();
  return data.stations ?? [];
}

async function fetchStations(lang) {
  const lists = await Promise.all((companies.length ? companies : [null]).map((id) => fetchCompanyStations(lang, id)));
  return [...new Map(lists.flat().map((s) => [s.locationID, s])).values()];
}

const base = (await fetchStations("en")).filter((s) => s.region === REGION);
const ids = new Set(base.map((s) => s.locationID));

const names = {};
for (const lang of LOCALES) {
  const list = lang === "en" ? base : await fetchStations(lang);
  for (const s of list) {
    if (!ids.has(s.locationID)) continue;
    names[s.locationID] ??= {};
    names[s.locationID][lang] = s.city;
  }
}

const typeOrder = { Airport: 0, Port: 1, Downtown: 2 };
const stations = base
  .map((s) => ({
    id: s.locationID,
    type: s.type,
    airportCode: s.airportCode ?? null,
    prefecture: s.prefecture,
    lat: s.latitude,
    lng: s.longitude,
    timeZone: s.timeZone ?? "Europe/Athens",
    names: names[s.locationID],
  }))
  .sort((a, b) => (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9) || a.names.en.localeCompare(b.names.en));

await writeFile(OUT, JSON.stringify(stations, null, 2) + "\n");
console.log(`Wrote ${stations.length} ${REGION} stations to lib/data/stations.json`);
