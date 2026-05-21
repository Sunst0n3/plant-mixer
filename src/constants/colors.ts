export const C = {
  bg: '#FDFCF8',
  fg: '#2C2C24',
  primary: '#5D7052',
  primFg: '#F3F4F1',
  secondary: '#C18C5D',
  accent: '#E6DCCD',
  muted: '#F0EBE5',
  mutedFg: '#78786C',
  border: '#DED8CF',
  card: '#FEFEFA',
  destructive: '#A85448',
} as const;

export const BloomHex: Record<string, string> = {
  Red: '#C05D58',
  Orange: '#D88A4C',
  Yellow: '#E5C266',
  Green: '#7AA068',
  Blue: '#6E8FB5',
  Purple: '#9F84C1',
  Pink: '#D89AB4',
  White: '#F2EBD6',
  Cream: '#EAD9AC',
  None: 'transparent',
  Insignificant: 'transparent',
};

export const FoliageGreens = ['#D9D2C5', '#DFE0CE', '#C5D2A8', '#9DB87C', '#7DA05E'] as const;

export const TypeColors: Record<string, { bg: string; text: string; dot: string }> = {
  Tree: { bg: '#dbe6d4', text: '#3a4f30', dot: '#5D7052' },
  Shrub: { bg: '#e9d6c5', text: '#7a4a28', dot: '#C18C5D' },
  Perennial: { bg: '#f0e3cc', text: '#7a5a1f', dot: '#C9A658' },
  'Ground Cover': { bg: '#dfe5d4', text: '#4a5a36', dot: '#7E9A5E' },
  Vine: { bg: '#e3d8e6', text: '#503a5a', dot: '#8C6FA0' },
};

export const BLOOM_COLOR_OPTS = [
  { value: 'Red', swatch: '#C05D58' },
  { value: 'Orange', swatch: '#D88A4C' },
  { value: 'Yellow', swatch: '#E5C266' },
  { value: 'Pink', swatch: '#D89AB4' },
  { value: 'Purple', swatch: '#9F84C1' },
  { value: 'Blue', swatch: '#6E8FB5' },
  { value: 'White', swatch: '#F2EBD6' },
  { value: 'Green', swatch: '#7AA068' },
] as const;
