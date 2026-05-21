export const CARD_RADII = [16, 24, 20, 18, 22] as const;

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export const LIGHT_OPTS = [
  { value: 'Full Sun', label: 'Full Sun', sub: '6+ hours direct' },
  { value: 'Part Sun', label: 'Part Sun', sub: '3–6 hours direct' },
  { value: 'Shade', label: 'Shade', sub: 'under 3 hours' },
] as const;

export const WATER_OPTS = [
  { value: 'Low', label: 'Low', sub: '½" every 2 weeks' },
  { value: 'Moderate', label: 'Moderate', sub: '½" weekly' },
  { value: 'High', label: 'High', sub: '½" twice weekly' },
] as const;

export const TYPE_OPTS = ['Tree', 'Shrub', 'Perennial', 'Ground Cover', 'Vine'] as const;

export const IRRIGATION_OPTS = [
  'None — Rainfed',
  'Drip — Once weekly',
  'Drip — Twice weekly',
] as const;
