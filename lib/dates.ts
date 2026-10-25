// Calendar dates are plain "yyyy-mm-dd" strings in station time (Europe/Athens).
// All arithmetic runs in UTC so the browser's own time zone never shifts a day.

const athensFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Athens",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Current wall-clock time at the station, as a naive "yyyy-mm-ddTHH:mm:00" string. */
export function athensNow() {
  const parts = Object.fromEntries(athensFormatter.formatToParts(new Date()).map((p) => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:00`;
}

export function dateToUtcMs(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function utcMsToDate(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(date: string, days: number) {
  return utcMsToDate(dateToUtcMs(date) + days * 86_400_000);
}

export function daysBetween(start: string, end: string) {
  return Math.round((dateToUtcMs(end) - dateToUtcMs(start)) / 86_400_000);
}

/** First day ("yyyy-mm-01") of the month that is `offset` months after `date`. */
export function monthStart(date: string, offset = 0) {
  const [y, m] = date.split("-").map(Number);
  return utcMsToDate(Date.UTC(y, m - 1 + offset, 1));
}

/** The weeks of a month, Monday first, padded with nulls. */
export function monthGrid(firstOfMonth: string) {
  const start = new Date(dateToUtcMs(firstOfMonth));
  const leading = (start.getUTCDay() + 6) % 7;
  const length = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array.from({ length: leading }, () => null);
  for (let day = 0; day < length; day++) cells.push(addDays(firstOfMonth, day));
  while (cells.length % 7) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function formatDate(date: string, intl: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(intl, { timeZone: "UTC", ...options }).format(dateToUtcMs(date));
}

/** Short weekday names, Monday first. 2024-01-01 was a Monday. */
export function weekdayNames(intl: string) {
  return Array.from({ length: 7 }, (_, i) => formatDate(addDays("2024-01-01", i), intl, { weekday: "short" }));
}
