import { BloomHex, FoliageGreens } from '../constants/colors';
import type { Plant } from '../data/types';

export function getSeasonalBg(plant: Plant, month: number): string {
  if (plant.bloomMonths.includes(month)) {
    const hex = BloomHex[plant.bloomColor];
    if (hex && hex !== 'transparent') return hex;
  }
  const stage = plant.foliage[month] ?? 2;
  return FoliageGreens[Math.min(stage, 4)];
}

export function getSeasonalLabel(plant: Plant, month: number): string {
  if (plant.bloomMonths.includes(month)) return 'In Bloom';
  const stage = plant.foliage[month] ?? 2;
  if (stage <= 0) return 'Dormant';
  if (stage <= 1) return 'Emerging';
  if (stage <= 2) return 'Growing';
  if (stage <= 3) return 'Foliage';
  return 'Full Leaf';
}

export function parseZone(z: string): [number, number] {
  const parts = z.split(/[–-]/).map(s => parseInt(s.trim(), 10));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return [parts[0], parts[1]];
  return [parts[0], parts[0]];
}
