/** Goldy's own photos in public/img/brand/cars, shown instead of the backend's stock images. */
const CAR_IMAGES = [
  { name: "BYD Dolphin", year: 2025, file: "byd-dolphin-2025" },
  { name: "Citroen C3", year: 2024, file: "citroen-c3-2024" },
  { name: "Citroen C3", year: 2026, file: "citroen-c3-2026" },
  { name: "Citroen C3 Aircross", year: 2026, file: "citroen-c3-aircross-2026" },
  { name: "Jaguar I-Pace", year: 2022, file: "jaguar-i-pace-ev400-2022" },
  { name: "Nissan Juke", year: 2024, file: "nissan-juke-2024" },
  { name: "Peugeot e-Rifter", year: 2023, file: "peugeot-e-rifter-2023" },
  { name: "Suzuki Ignis", year: 2024, file: "suzuki-ignis-2024" },
  { name: "Suzuki Swift", year: 2026, file: "suzuki-swift-2026" },
];

/** "Citroën C3-Aircross" and "Citroen C3 Aircross" compare equal. */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/** Photo of the same make and model, closest year first; null when Goldy has no photo of it. */
export function carImage(make: string, model: string, year?: number) {
  const wanted = normalize(`${make} ${model}`);
  const matches = CAR_IMAGES.filter((car) => normalize(car.name) === wanted);
  if (!matches.length) return null;
  const target = year ?? new Date().getFullYear();
  const best = matches.reduce((a, b) => (Math.abs(b.year - target) < Math.abs(a.year - target) ? b : a));
  return `/img/brand/cars/${best.file}.avif`;
}
