import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../src/constants/colors';
import { usePalettes } from '../../src/hooks/usePalettes';
import { PaletteCard } from '../../src/components/palette/PaletteCard';
import { MonthScrubber } from '../../src/components/palette/MonthScrubber';
import { LeafIcon } from '../../src/components/icons/LeafIcon';
import { PrimaryBtn } from '../../src/components/ui/Button';

export default function PalettesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { palettes, deletePalette, removePlant, renamePalette } = usePalettes();
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  if (palettes.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: insets.top }]}>
        <View style={styles.emptyInner}>
          <LeafIcon size={48} color={C.primary} />
          <Text style={styles.emptyTitle}>Your palettes live here</Text>
          <Text style={styles.emptyText}>
            Browse the library and save plants into a palette.
            You'll see how your composition shifts season to season.
          </Text>
          <PrimaryBtn onPress={() => router.push('/library')}>Browse the Library →</PrimaryBtn>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 80 }]}
      >
        <View style={styles.header}>
          <Text style={styles.headerSub}>My collection</Text>
          <Text style={styles.headerTitle}>Plant Palettes</Text>
        </View>

        <MonthScrubber month={month} onSelect={setMonth} />

        {palettes.map((p, i) => (
          <PaletteCard
            key={p.id}
            palette={p}
            month={month}
            idx={i + 1}
            onDelete={() => deletePalette(p.id)}
            onRemove={plantId => removePlant(p.id, plantId)}
            onRename={name => renamePalette(p.id, name)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 8 },
  header: { marginBottom: 20 },
  headerSub: {
    fontSize: 11, fontFamily: 'Nunito_700Bold',
    color: C.mutedFg, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  headerTitle: {
    fontFamily: 'Fraunces_700Bold', fontSize: 32, color: C.fg, marginTop: 4,
  },
  emptyContainer: { flex: 1, backgroundColor: C.bg },
  emptyInner: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 40, gap: 16,
  },
  emptyTitle: {
    fontFamily: 'Fraunces_600SemiBold', fontSize: 26, color: C.fg,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15, fontFamily: 'Nunito_400Regular', color: C.mutedFg,
    textAlign: 'center', lineHeight: 22, maxWidth: 320,
  },
});
