import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';
import { getSeasonalBg, getSeasonalLabel } from '../../utils/seasonal';
import { LeafIcon } from '../icons/LeafIcon';
import { FlowerIcon } from '../icons/FlowerIcon';
import type { Plant } from '../../data/types';

interface Props {
  plant: Plant;
  month: number;
}

export function PaletteThumbnail({ plant, month }: Props) {
  const bg = getSeasonalBg(plant, month);
  const label = getSeasonalLabel(plant, month);
  const blooming = plant.bloomMonths.includes(month);

  return (
    <View style={[styles.thumb, { backgroundColor: bg }]}>
      <View style={styles.icon}>
        {blooming
          ? <FlowerIcon size={16} color="rgba(255,255,255,0.9)" />
          : <LeafIcon size={16} color="rgba(0,0,0,0.45)" />
        }
      </View>
      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={1}>{plant.commonName}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    width: 110,
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    opacity: 0.8,
  },
  footer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  name: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 12,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    letterSpacing: 0.4,
  },
});
