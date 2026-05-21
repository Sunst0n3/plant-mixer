export interface Plant {
  id: number;
  commonName: string;
  scientificName: string;
  family: string;
  variety: string;
  type: 'Tree' | 'Shrub' | 'Perennial' | 'Ground Cover' | 'Vine';
  description: string;
  light: 'Full Sun' | 'Part Sun' | 'Shade';
  water: 'Low' | 'Moderate' | 'High';
  irrigation: string;
  saltTolerant: boolean;
  hardinessZone: string;
  matureWidth: number;
  matureHeight: number;
  bloomColor: string;
  bloomMonths: number[];
  native: boolean;
  nativar: boolean;
  evergreen: boolean;
  spreadingBehavior: string;
  maintenance: string[];
  maintenanceNotes: string;
  foliage: Record<number, number>;
  seasonal: Record<number, string>;
}

export interface Palette {
  id: string;
  name: string;
  plants: Plant[];
  createdAt: number;
}

export interface FilterState {
  light: string;
  water: string;
  irrigation: string;
  type: string;
  family: string;
  saltTolerant: boolean | null;
  native: boolean | null;
  nativar: boolean | null;
  evergreen: boolean | null;
  bloomColor: string;
  bloomMonth: number | null;
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  maxWidth: number;
  zone: number | null;
}
