import type { ShowcaseSlide } from "./types";

/** Home "motion-poster" showcase — autoplays in this order. */
const base: [string, string][] = [
  ["Moksh Dham", "Institutional"],
  ["Vinay Khanna Law Chambers", "Commercial"],
  ["Tropical Home", "Residential"],
  ["The Inner House", "Residential"],
  ["Chhabra Marble & Sanitary Showroom", "Commercial"],
  ["Banga’s Residence", "Residential"],
];

export const showcase: ShowcaseSlide[] = Array.from({ length: 12 }, (_, i) => ({
  name: base[i % 6][0],
  type: base[i % 6][1],
  image: `/images/L${i + 1}.webp`,
}));
