import { useState } from 'react';
import type { FilterState } from '../data/types';

export const DEFAULT_FILTERS: FilterState = {
  light: '', water: '', irrigation: '', type: '', family: '',
  saltTolerant: null, native: null, nativar: null, evergreen: null,
  bloomColor: '', bloomMonth: null,
  minHeight: 0, maxHeight: 40, minWidth: 0, maxWidth: 30,
  zone: null,
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');

  function setF(key: keyof FilterState, val: unknown) {
    setFilters(prev => {
      const same = prev[key] === val;
      if (['saltTolerant', 'native', 'nativar', 'evergreen'].includes(key)) {
        return { ...prev, [key]: val };
      }
      if (['bloomMonth', 'zone'].includes(key)) {
        return { ...prev, [key]: same ? null : val };
      }
      return { ...prev, [key]: same ? '' : val };
    });
  }

  function setRange(key: keyof FilterState, val: number) {
    setFilters(prev => ({ ...prev, [key]: val }));
  }

  function clear() {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  }

  const hasActive = !!search || Object.entries(filters).some(([k, v]) => {
    if (['saltTolerant', 'native', 'nativar', 'evergreen', 'bloomMonth', 'zone'].includes(k)) return v !== null;
    if (k === 'minHeight' || k === 'minWidth') return (v as number) > 0;
    if (k === 'maxHeight') return (v as number) < 40;
    if (k === 'maxWidth') return (v as number) < 30;
    return !!v;
  });

  return { filters, setF, setRange, search, setSearch, clear, hasActive };
}
