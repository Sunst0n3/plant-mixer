import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Palette, Plant } from '../data/types';

const STORAGE_KEY = '@plant_mixer_palettes';

export function usePalettes() {
  const [palettes, setPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setPalettes(JSON.parse(raw)); } catch { /* ignore corrupted data */ }
      }
    });
  }, []);

  const persist = useCallback((next: Palette[]) => {
    setPalettes(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  function save(mode: 'new' | 'add', plant: Plant, nameOrId: string) {
    if (mode === 'new') {
      const ls = plant.light.includes('Full') ? 'FS' : plant.light.includes('Part') ? 'PS' : 'SH';
      const ws = plant.water.slice(0, 2).toUpperCase();
      const ts = plant.type.slice(0, 3).toUpperCase();
      const auto = `${ls} ${ws} ${ts} Mix #${palettes.length + 1}`;
      const name = (nameOrId || '').trim() || auto;
      persist([...palettes, { id: String(Date.now()), name, plants: [plant], createdAt: Date.now() }]);
    } else {
      persist(palettes.map(pal => {
        if (pal.id !== nameOrId) return pal;
        if (pal.plants.find(x => x.id === plant.id)) return pal;
        return { ...pal, plants: [...pal.plants, plant] };
      }));
    }
  }

  function deletePalette(id: string) {
    persist(palettes.filter(p => p.id !== id));
  }

  function removePlant(paletteId: string, plantId: number) {
    persist(palettes.map(pal =>
      pal.id !== paletteId ? pal : { ...pal, plants: pal.plants.filter(x => x.id !== plantId) }
    ));
  }

  function renamePalette(id: string, name: string) {
    persist(palettes.map(pal => pal.id !== id ? pal : { ...pal, name }));
  }

  return { palettes, save, deletePalette, removePlant, renamePalette };
}
