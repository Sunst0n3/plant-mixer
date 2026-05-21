import type { Plant } from './types';

// Set EXPO_PUBLIC_API_URL in your .env file.
// e.g. EXPO_PUBLIC_API_URL=https://your-app.railway.app
export const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

// ── Raw API shape (snake_case from Postgres) ──────────────────────────────────

interface RawPlant {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string | null;
  variety: string | null;
  type: string;
  description: string | null;
  light: string;
  water: string;
  irrigation: string | null;
  salt_tolerant: boolean;
  hardiness_zone: string | null;
  mature_width: number | null;
  mature_height: number | null;
  bloom_color: string | null;
  bloom_months: number[] | null;
  native: boolean;
  nativar: boolean;
  evergreen: boolean;
  spreading_behavior: string | null;
  maintenance: string[] | null;
  maintenance_notes: string | null;
  foliage: Record<string, number> | null;
  seasonal: Record<string, string> | null;
  image_url: string | null;
  image_attribution: string | null;
}

// ── Transformer ───────────────────────────────────────────────────────────────

function toPlant(r: RawPlant): Plant {
  return {
    id: r.id,
    commonName: r.common_name,
    scientificName: r.scientific_name,
    family: r.family ?? '',
    variety: r.variety ?? '',
    type: r.type as Plant['type'],
    description: r.description ?? '',
    light: r.light as Plant['light'],
    water: r.water as Plant['water'],
    irrigation: r.irrigation ?? '',
    saltTolerant: r.salt_tolerant,
    hardinessZone: r.hardiness_zone ?? '',
    matureWidth: r.mature_width ?? 0,
    matureHeight: r.mature_height ?? 0,
    bloomColor: r.bloom_color ?? 'None',
    bloomMonths: r.bloom_months ?? [],
    native: r.native,
    nativar: r.nativar,
    evergreen: r.evergreen,
    spreadingBehavior: r.spreading_behavior ?? '',
    maintenance: r.maintenance ?? [],
    maintenanceNotes: r.maintenance_notes ?? '',
    // JSONB keys come back as strings — convert to numbers for the app
    foliage: r.foliage
      ? Object.fromEntries(Object.entries(r.foliage).map(([k, v]) => [Number(k), v]))
      : {},
    seasonal: r.seasonal
      ? Object.fromEntries(Object.entries(r.seasonal).map(([k, v]) => [Number(k), v]))
      : {},
  };
}

// ── Response types ─────────────────────────────────────────────────────────────

export interface PagedPlants {
  data: Plant[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

type Param = string | number | boolean | null | undefined;

export async function fetchPlants(
  params: Record<string, Param>,
): Promise<PagedPlants> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== null && v !== undefined && v !== '') {
      qs.set(k, String(v));
    }
  }
  const res = await fetch(`${API_BASE}/plants?${qs}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return { ...json, data: (json.data as RawPlant[]).map(toPlant) };
}

export async function fetchPlantById(id: number): Promise<Plant> {
  const res = await fetch(`${API_BASE}/plants/${id}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return toPlant((await res.json()) as RawPlant);
}

export async function fetchFamilies(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/plants/families`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
