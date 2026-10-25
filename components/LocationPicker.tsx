"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { ChevronDownIcon, PlaneIcon, SearchIcon, ShipIcon, TownIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { revealOnSmallScreens } from "@/lib/reveal";
import { getStation, regionName, stationLabel, stations, type Station, type StationType } from "@/lib/stations";
import { useDismiss } from "@/lib/useDismiss";

const GROUPS: StationType[] = ["Airport", "Port", "Downtown"];
const TYPE_ICONS = { Airport: PlaneIcon, Port: ShipIcon, Downtown: TownIcon };

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ς/g, "σ")
    .toLowerCase();
}

const haystacks = new Map(
  stations.map((s) => [s.id, normalize([...Object.values(s.names), s.airportCode ?? "", s.prefecture].join(" "))]),
);

interface Props {
  label: string;
  value: number;
  onChange: (id: number) => void;
  locale: Locale;
  t: Dictionary["search"];
}

export default function LocationPicker({ label, value, onChange, locale, t }: Props) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const labels = useMemo(() => ({ pattern: t.stationPattern, types: t.stationTypes }), [t]);
  const selected = getStation(value);

  const groups = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    const matches = stations.filter((s) => terms.every((term) => haystacks.get(s.id)!.includes(term)));
    const result: { type: StationType; items: Station[]; offset: number }[] = [];
    let offset = 0;
    for (const type of GROUPS) {
      const items = matches.filter((s) => s.type === type).sort((a, b) => (a.names[locale] ?? a.names.en).localeCompare(b.names[locale] ?? b.names.en, locale));
      if (items.length === 0) continue;
      result.push({ type, items, offset });
      offset += items.length;
    }
    return result;
  }, [query, locale]);
  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  useDismiss(rootRef, open, close);

  function openList() {
    setActive(Math.max(0, flat.findIndex((s) => s.id === value)));
    setOpen(true);
    revealOnSmallScreens(rootRef.current);
  }

  function choose(station: Station) {
    onChange(station.id);
    close();
    triggerRef.current?.focus();
  }

  function moveTo(index: number) {
    const next = Math.max(0, Math.min(flat.length - 1, index));
    setActive(next);
    listRef.current?.querySelector(`[data-index="${next}"]`)?.scrollIntoView({ block: "nearest" });
  }

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(active + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(active - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (flat[active]) choose(flat[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    } else if (event.key === "Tab") {
      close();
    }
  }

  const SelectedIcon = selected ? TYPE_ICONS[selected.type] : PlaneIcon;

  return (
    <div ref={rootRef} className="relative scroll-mt-20">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openList())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        className={`group flex h-16 w-full items-center gap-3 rounded-2xl border bg-white px-4 text-left transition ${
          open ? "border-sea-500 ring-4 ring-sea-100" : "border-sand-200 hover:border-sea-300"
        }`}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sea-50 text-lg text-sea-700">
          <SelectedIcon />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-ink/55">{label}</span>
          <span className="block truncate text-[15px] font-bold text-ink">{selected ? stationLabel(selected, locale, labels) : "—"}</span>
        </span>
        <ChevronDownIcon className={`shrink-0 text-ink/40 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-full min-w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lift animate-pop sm:w-[26rem]">
          <div className="border-b border-sand-100 p-2">
            <label className="flex items-center gap-2 rounded-xl bg-sand-100 px-3">
              <SearchIcon className="shrink-0 text-ink/45" />
              <span className="sr-only">{t.locationSearch}</span>
              <input
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-activedescendant={flat[active] ? `${id}-opt-${flat[active].id}` : undefined}
                aria-autocomplete="list"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder={t.locationSearch}
                className="h-11 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/40"
              />
            </label>
          </div>
          <ul ref={listRef} id={`${id}-list`} role="listbox" aria-label={label} className="max-h-80 overflow-y-auto overscroll-contain p-1.5">
            {groups.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink/55">{t.noMatches}</li>}
            {groups.map((group) => {
              const Icon = TYPE_ICONS[group.type];
              return (
                <li key={group.type} role="presentation">
                  <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45">{t.groups[group.type]}</p>
                  <ul role="presentation">
                    {group.items.map((station, position) => {
                      const i = group.offset + position;
                      const isActive = i === active;
                      const isSelected = station.id === value;
                      return (
                        <li
                          key={station.id}
                          id={`${id}-opt-${station.id}`}
                          role="option"
                          aria-selected={isSelected}
                          data-index={i}
                          onPointerMove={() => setActive(i)}
                          onClick={() => choose(station)}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${isActive ? "bg-sea-50" : ""}`}
                        >
                          <Icon className={`shrink-0 text-base ${isSelected ? "text-sea-700" : "text-ink/40"}`} />
                          <span className="min-w-0 flex-1">
                            <span className={`block truncate text-[15px] ${isSelected ? "font-bold text-sea-800" : "font-semibold text-ink"}`}>
                              {station.names[locale] ?? station.names.en}
                            </span>
                            {station.type === "Downtown" && <span className="block text-xs text-ink/50">{regionName(station, locale)}</span>}
                          </span>
                          {station.airportCode && <span className="rounded-md bg-sand-100 px-1.5 py-0.5 text-[11px] font-bold text-ink/60">{station.airportCode}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
