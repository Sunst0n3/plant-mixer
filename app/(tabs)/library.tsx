import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../src/constants/colors';
import { useFilters } from '../../src/hooks/useFilters';
import { usePlantList } from '../../src/hooks/usePlantList';
import { usePalettes } from '../../src/hooks/usePalettes';
import { PlantCard } from '../../src/components/plant/PlantCard';
import { FilterSheet } from '../../src/components/library/FilterSheet';
import { SaveModal } from '../../src/components/library/SaveModal';
import { LeafIcon } from '../../src/components/icons/LeafIcon';
import type { Plant } from '../../src/data/types';

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { filters, setF, setRange, search, setSearch, clear, hasActive } = useFilters();
  const { plants, total, loading, loadingMore, error, loadMore, refresh } = usePlantList(filters, search);
  const { palettes, save } = usePalettes();
  const [filterOpen, setFilterOpen] = useState(false);
  const [saveTarget, setSaveTarget] = useState<Plant | null>(null);

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => {
    if (['saltTolerant', 'native', 'nativar', 'evergreen', 'bloomMonth', 'zone'].includes(k)) return v !== null;
    if (k === 'minHeight' || k === 'minWidth') return (v as number) > 0;
    if (k === 'maxHeight') return (v as number) < 40;
    if (k === 'maxWidth') return (v as number) < 30;
    return !!v;
  }).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Hero header */}
      <View style={styles.hero}>
        <View style={styles.heroLogo}>
          <LeafIcon size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.heroTitle}>Plant Mixer</Text>
          <Text style={styles.heroSub}>for landscape designing</Text>
        </View>
      </View>

      {/* Search + filter bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name, species…"
            placeholderTextColor={C.mutedFg}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
              <Text style={styles.clearX}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setFilterOpen(true)}
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]}
        >
          <Text style={[styles.filterIcon, activeFilterCount > 0 && styles.filterIconActive]}>⟁</Text>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Result count */}
      <View style={styles.countRow}>
        {loading ? (
          <Text style={styles.countLabel}>Loading…</Text>
        ) : error ? (
          <TouchableOpacity onPress={refresh}>
            <Text style={styles.errorText}>⚠ {error} — tap to retry</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.countNum}>{total.toLocaleString()}</Text>
            <Text style={styles.countLabel}> plant{total !== 1 ? 's' : ''}</Text>
            {hasActive && (
              <TouchableOpacity onPress={clear} style={styles.clearAllBtn}>
                <Text style={styles.clearAllText}>Clear filters</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      {/* Loading spinner (initial load) */}
      {loading ? (
        <View style={styles.spinnerWrap}>
          <ActivityIndicator size="large" color={C.primary} />
        </View>
      ) : error ? null : plants.length === 0 ? (
        <View style={styles.empty}>
          <LeafIcon size={40} color={C.primary} />
          <Text style={styles.emptyTitle}>No plants match</Text>
          <Text style={styles.emptyText}>Try loosening a few filters.</Text>
          <TouchableOpacity onPress={clear} style={styles.clearEmptyBtn}>
            <Text style={styles.clearEmptyText}>Clear all filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore
              ? <ActivityIndicator size="small" color={C.primary} style={styles.footer} />
              : null
          }
          renderItem={({ item, index }) => (
            <View style={styles.cardWrap}>
              <PlantCard
                plant={item}
                idx={index}
                onPress={() => router.push(`/plant/${item.id}`)}
                onSavePress={() => setSaveTarget(item)}
              />
            </View>
          )}
        />
      )}

      <FilterSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setF={setF}
        setRange={setRange}
        clear={clear}
        hasActive={hasActive}
      />

      {saveTarget && (
        <SaveModal
          visible
          plant={saveTarget}
          palettes={palettes}
          onClose={() => setSaveTarget(null)}
          onSave={save}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  heroLogo: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: C.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 4,
  },
  heroTitle: { fontFamily: 'Fraunces_700Bold', fontSize: 20, color: C.fg, lineHeight: 24 },
  heroSub: { fontSize: 11, color: C.mutedFg, fontFamily: 'Nunito_600SemiBold', letterSpacing: 0.4 },

  searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 10 },
  searchWrap: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    height: 46, borderRadius: 999,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: C.border,
    paddingHorizontal: 16, gap: 8,
  },
  searchIcon: { fontSize: 18, color: C.primary, opacity: 0.7 },
  searchInput: {
    flex: 1, fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: C.fg,
  },
  clearX: { fontSize: 18, color: C.mutedFg, lineHeight: 22 },
  filterBtn: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: C.muted, borderWidth: 1.5, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  filterBtnActive: { backgroundColor: 'rgba(93,112,82,0.12)', borderColor: C.primary },
  filterIcon: { fontSize: 20, color: C.mutedFg },
  filterIconActive: { color: C.primary },
  filterBadge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: C.primary, borderRadius: 6,
    minWidth: 14, height: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  filterBadgeText: { fontSize: 9, color: C.primFg, fontFamily: 'Nunito_700Bold' },

  countRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 12,
  },
  countNum: { fontFamily: 'Fraunces_700Bold', fontSize: 20, color: C.primary },
  countLabel: { fontSize: 13, color: C.mutedFg, fontFamily: 'Nunito_600SemiBold' },
  errorText: { fontSize: 13, color: '#c0392b', fontFamily: 'Nunito_600SemiBold' },
  clearAllBtn: { marginLeft: 'auto', paddingHorizontal: 10 },
  clearAllText: { fontSize: 12, color: C.primary, fontFamily: 'Nunito_700Bold' },

  spinnerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingVertical: 20 },

  row: { gap: 12, paddingHorizontal: 16 },
  listContent: { paddingTop: 4, gap: 12 },
  cardWrap: { flex: 1 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 10 },
  emptyTitle: { fontFamily: 'Fraunces_600SemiBold', fontSize: 22, color: C.fg },
  emptyText: { fontSize: 14, color: C.mutedFg, fontFamily: 'Nunito_400Regular', textAlign: 'center' },
  clearEmptyBtn: { marginTop: 8, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: C.muted, borderRadius: 999 },
  clearEmptyText: { fontSize: 14, color: C.primary, fontFamily: 'Nunito_700Bold' },
});
