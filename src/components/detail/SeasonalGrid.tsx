import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MONTHS } from '../../constants/layout';
import { C } from '../../constants/colors';
import { getSeasonalBg } from '../../utils/seasonal';
import type { Plant } from '../../data/types';

interface Props {
  plant: Plant;
}

export function SeasonalGrid({ plant }: Props) {
  return (
    <View style={styles.grid}>
      {MONTHS.map((m, i) => {
        const mo = i + 1;
        const bg = getSeasonalBg(plant, mo);
        const blooming = plant.bloomMonths.includes(mo);
        return (
          <View key={m} style={[styles.tile, { backgroundColor: bg }]}>
            <Text style={[styles.month, blooming && styles.monthBloom]}>{m}</Text>
            <Text style={[styles.desc, blooming && styles.descBloom]} numberOfLines={2}>
              {plant.seasonal[mo]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tile: {
    width: '31%',
    borderRadius: 10,
    padding: 8,
    minHeight: 60,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  month: {
    fontSize: 9,
    fontFamily: 'Nunito_700Bold',
    color: C.fg,
    marginBottom: 2,
    letterSpacing: 0.4,
  },
  monthBloom: { color: 'rgba(255,255,255,0.92)' },
  desc: {
    fontSize: 9,
    fontFamily: 'Nunito_400Regular',
    color: 'rgba(44,44,36,0.75)',
    lineHeight: 13,
  },
  descBloom: { color: 'rgba(255,255,255,0.85)' },
});
