export interface FleetCar {
  slug: string;
  name: string;
  year: number;
  image: string;
  size: string;
  fuel: "Petrol" | "Hybrid" | "Electric";
  transmission: "Automatic" | "Manual";
  seats: number;
  bags: number;
  bagSize: "big" | "small";
}

export const fleet: FleetCar[] = [
  { slug: "citroen-c3-aircross-2026", name: "Citroën C3 Aircross Hybrid", year: 2026, image: "/img/brand/cars/citroen-c3-aircross-2026.avif", size: "SUV", fuel: "Hybrid", transmission: "Automatic", seats: 5, bags: 4, bagSize: "big" },
  { slug: "suzuki-swift-2026", name: "Suzuki Swift Hybrid", year: 2026, image: "/img/brand/cars/suzuki-swift-2026.avif", size: "Economy", fuel: "Hybrid", transmission: "Automatic", seats: 5, bags: 2, bagSize: "big" },
  { slug: "byd-dolphin-2025", name: "BYD Dolphin", year: 2025, image: "/img/brand/cars/byd-dolphin-2025.avif", size: "Compact", fuel: "Electric", transmission: "Automatic", seats: 5, bags: 4, bagSize: "big" },
  { slug: "citroen-c3-2025", name: "Citroën C3", year: 2025, image: "/img/brand/cars/citroen-c3-2026.avif", size: "Economy", fuel: "Petrol", transmission: "Manual", seats: 5, bags: 4, bagSize: "big" },
  { slug: "jaguar-i-pace-2022", name: "Jaguar I-Pace EV400", year: 2022, image: "/img/brand/cars/jaguar-i-pace-ev400-2022.avif", size: "Premium", fuel: "Electric", transmission: "Automatic", seats: 4, bags: 4, bagSize: "big" },
  { slug: "peugeot-e-rifter-2023", name: "Peugeot e-Rifter", year: 2023, image: "/img/brand/cars/peugeot-e-rifter-2023.avif", size: "Van", fuel: "Electric", transmission: "Automatic", seats: 6, bags: 4, bagSize: "big" },
  { slug: "nissan-juke-hybrid-2024", name: "Nissan Juke Hybrid", year: 2024, image: "/img/brand/cars/nissan-juke-2024.avif", size: "SUV", fuel: "Hybrid", transmission: "Automatic", seats: 5, bags: 4, bagSize: "big" },
  { slug: "citroen-c3-2024", name: "Citroën C3", year: 2024, image: "/img/brand/cars/citroen-c3-2024.avif", size: "Economy", fuel: "Petrol", transmission: "Automatic", seats: 5, bags: 4, bagSize: "big" },
  { slug: "suzuki-swift-2024", name: "Suzuki Swift Hybrid", year: 2024, image: "/img/brand/cars/suzuki-swift-2026.avif", size: "Economy", fuel: "Hybrid", transmission: "Automatic", seats: 5, bags: 2, bagSize: "big" },
  { slug: "suzuki-ignis-2024", name: "Suzuki Ignis Hybrid", year: 2024, image: "/img/brand/cars/suzuki-ignis-2024.avif", size: "Mini", fuel: "Hybrid", transmission: "Manual", seats: 5, bags: 2, bagSize: "small" },
  { slug: "nissan-juke-2024", name: "Nissan Juke", year: 2024, image: "/img/brand/cars/nissan-juke-2024.avif", size: "SUV", fuel: "Petrol", transmission: "Automatic", seats: 5, bags: 4, bagSize: "big" },
];
