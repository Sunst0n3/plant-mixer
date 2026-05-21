import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPlants } from '../data/api';
import type { FilterState, Plant } from '../data/types';

const LIMIT = 50;

export interface PlantListResult {
  plants: Plant[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  refresh: () => void;
}

function buildParams(
  filters: FilterState,
  search: string,
  page: number,
): Record<string, string | number | boolean | null | undefined> {
  return {
    page,
    limit: LIMIT,
    ...(search.trim() ? { q: search.trim() } : {}),
    ...(filters.light ? { light: filters.light } : {}),
    ...(filters.water ? { water: filters.water } : {}),
    ...(filters.irrigation ? { irrigation: filters.irrigation } : {}),
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.family ? { family: filters.family } : {}),
    ...(filters.saltTolerant !== null ? { salt_tolerant: filters.saltTolerant } : {}),
    ...(filters.native !== null ? { native: filters.native } : {}),
    ...(filters.nativar !== null ? { nativar: filters.nativar } : {}),
    ...(filters.evergreen !== null ? { evergreen: filters.evergreen } : {}),
    ...(filters.bloomColor ? { bloom_color: filters.bloomColor } : {}),
    ...(filters.bloomMonth !== null ? { bloom_month: filters.bloomMonth } : {}),
    ...(filters.minHeight > 0 ? { min_height: filters.minHeight } : {}),
    ...(filters.maxHeight < 40 ? { max_height: filters.maxHeight } : {}),
    ...(filters.minWidth > 0 ? { min_width: filters.minWidth } : {}),
    ...(filters.maxWidth < 30 ? { max_width: filters.maxWidth } : {}),
    ...(filters.zone !== null ? { zone: filters.zone } : {}),
  };
}

export function usePlantList(filters: FilterState, search: string): PlantListResult {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable refs so loadMore closure doesn't go stale
  const pageRef = useRef(1);
  const totalRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchFirst = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPlants(buildParams(filters, search, 1));
      setPlants(result.data);
      setTotal(result.total);
      totalRef.current = result.total;
      setPage(1);
      pageRef.current = 1;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load plants');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, search]);

  // Debounce so rapid filter changes don't fire a request per keystroke
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fetchFirst, 350);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fetchFirst]);

  const loadMore = useCallback(async () => {
    if (loadingMore || loading) return;
    const nextPage = pageRef.current + 1;
    if (nextPage > Math.ceil(totalRef.current / LIMIT)) return;
    setLoadingMore(true);
    try {
      const result = await fetchPlants(buildParams(filters, search, nextPage));
      setPlants(prev => [...prev, ...result.data]);
      pageRef.current = nextPage;
      setPage(nextPage);
    } catch {
      // silent fail — user can pull-to-refresh
    } finally {
      setLoadingMore(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, loading, filters, search]);

  const hasMore = page < Math.ceil(total / LIMIT);

  return { plants, total, loading, loadingMore, error, loadMore, hasMore, refresh: fetchFirst };
}
