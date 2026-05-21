import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MONTHS } from '../../constants/layout';
import { BloomHex, C } from '../../constants/colors';
import type { Plant } from '../../data/types';

interface Props {
  plant: Plant;
}

export function BloomCalendar({ plant }: Props) {
  return (
    <View style={styles.grid}>
      {MONTHS.map((m, i) => {
        const mo = i + 1;
        const blooming = plant.bloomMonths.includes(mo);
        const bc = BloomHex[plant.bloomColor] || C.primary;
        return (
          <View key={m} style={styles.col}>
            <View style={[styles.bar, { backgroundColor: blooming ? bc : C.muted, borderColor: blooming ? bc : C.border }]} />
            <Text style={[styles.label, blooming && styles.labelActive]}>{m}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: 4, marginTop: 8 },
  col: { flex: 1, alignItems: 'center', gap: 4 },
  bar: {
    height: 32,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1.5,
  },
  label: {
    fontSize: 9,
    fontFamily: 'Nunito_500Medium',
    color: C.mutedFg,
  },
  labelActive: {
    color: C.fg,
    fontFamily: 'Nunito_700Bold',
  },
});
