"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { addDays, daysBetween, formatDate, monthGrid, monthStart, weekdayNames } from "@/lib/dates";

interface Props {
  start: string;
  end: string;
  min: string;
  selecting: "start" | "end";
  intl: string;
  labels: { prev: string; next: string };
  onSelect: (date: string) => void;
}

export default function DateRangeCalendar({ start, end, min, selecting, intl, labels, onSelect }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState(() => monthStart(selecting === "end" ? end || start || min : start || min));
  const [focused, setFocused] = useState(() => (selecting === "end" ? end || start : start) || min);
  const [hovered, setHovered] = useState<string | null>(null);
  const [keyboard, setKeyboard] = useState(false);

  const weekdays = useMemo(() => weekdayNames(intl), [intl]);
  const minMonth = monthStart(min);
  const canGoBack = first > minMonth;

  useEffect(() => {
    if (keyboard) gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)?.focus();
  }, [focused, keyboard]);

  function moveFocus(date: string) {
    const next = date < min ? min : date;
    setFocused(next);
    setKeyboard(true);
    if (next < first) setFirst(monthStart(next));
    else if (next >= monthStart(first, 2)) setFirst(monthStart(next, -1));
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in steps) {
      event.preventDefault();
      moveFocus(addDays(focused, steps[event.key]));
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const target = monthStart(focused, event.key === "PageUp" ? -1 : 1);
      const length = daysBetween(target, monthStart(target, 1));
      moveFocus(addDays(target, Math.min(Number(focused.slice(8)), length) - 1));
    }
  }

  const rangeEnd = selecting === "end" && hovered && start && hovered >= start ? hovered : end;

  return (
    <div className="@container" onKeyDown={onKeyDown} ref={gridRef}>
      <div className="grid gap-6 @xl:grid-cols-2">
        {[0, 1].map((offset) => {
          const month = monthStart(first, offset);
          return (
            <div key={month} className={offset === 1 ? "hidden @xl:block" : ""}>
              <div className="mb-3 flex h-9 items-center justify-between">
                <button
                  type="button"
                  onClick={() => setFirst(monthStart(first, -1))}
                  disabled={!canGoBack}
                  aria-label={labels.prev}
                  className={`grid size-9 place-items-center rounded-full text-lg text-ink transition hover:bg-sand-100 disabled:opacity-25 ${offset === 1 ? "invisible" : ""}`}
                >
                  <ChevronLeftIcon />
                </button>
                <p className="text-[15px] font-bold capitalize text-ink" aria-live="polite">
                  {formatDate(month, intl, { month: "long", year: "numeric" })}
                </p>
                <button
                  type="button"
                  onClick={() => setFirst(monthStart(first, 1))}
                  aria-label={labels.next}
                  className={`grid size-9 place-items-center rounded-full text-lg text-ink transition hover:bg-sand-100 ${offset === 0 ? "@xl:invisible" : ""}`}
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <table className="w-full table-fixed border-collapse text-center" role="grid">
                <thead>
                  <tr>
                    {weekdays.map((day) => (
                      <th key={day} scope="col" className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthGrid(month).map((week, row) => (
                    <tr key={row}>
                      {week.map((date, col) => {
                        if (!date) return <td key={col} />;
                        const disabled = date < min;
                        const isStart = date === start;
                        const isEnd = date === rangeEnd && Boolean(start);
                        const inRange = Boolean(start && rangeEnd) && date > start && date < rangeEnd;
                        const edge = isStart || isEnd;
                        const band = inRange || (isStart && rangeEnd && rangeEnd > start) || (isEnd && start && rangeEnd > start);
                        return (
                          <td key={date} className="p-0 py-0.5">
                            <div
                              className={`${band ? "bg-sea-50" : ""} ${isStart && band ? "rounded-l-full" : ""} ${isEnd && band ? "rounded-r-full" : ""} ${
                                col === 0 && inRange ? "rounded-l-full" : ""
                              } ${col === 6 && inRange ? "rounded-r-full" : ""}`}
                            >
                              <button
                                type="button"
                                data-date={date}
                                disabled={disabled}
                                tabIndex={date === focused ? 0 : -1}
                                aria-pressed={edge}
                                aria-label={formatDate(date, intl, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                onClick={() => {
                                  setFocused(date);
                                  onSelect(date);
                                }}
                                onPointerEnter={() => setHovered(date)}
                                onPointerLeave={() => setHovered(null)}
                                onFocus={() => setFocused(date)}
                                className={`mx-auto grid size-10 place-items-center rounded-full text-sm tabular-nums transition sm:size-11 ${
                                  edge
                                    ? "bg-sea-800 font-bold text-white"
                                    : disabled
                                      ? "cursor-not-allowed text-ink/20 line-through decoration-ink/10"
                                      : `font-semibold text-ink hover:bg-sea-100 ${date === min ? "ring-1 ring-inset ring-gold-400" : ""}`
                                }`}
                              >
                                {Number(date.slice(8))}
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
