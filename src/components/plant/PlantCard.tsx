import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { TypePill } from '../ui/TypePill';
import { Tag } from '../ui/Tag';
import { OutlineBtn } from '../ui/Button';
import { SunIcon } from '../icons/SunIcon';
import { WaterDrops } from '../icons/WaterDrops';
import { PhotoSlot } from './PhotoSlot';
import { C } from '../../constants/colors';
import type { Plant } from '../../data/types';

interface Props {
  plant: Plant;
  onPress: () => void;
  onSavePress: () => void;
  idx?: number;
}

export function PlantCard({ plant, onPress, onSavePress, idx = 0 }: Props) {
  return (
    <Card radiusIdx={idx} style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <PhotoSlot height={140} label={plant.commonName} borderRadius={12} />
        <View style={styles.body}>
          <Text style={styles.commonName}>{plant.commonName}</Text>
          <Text style={styles.sciName}>{plant.scientificName}</Text>

          <View style={styles.tags}>
            <TypePill type={plant.type} small />
            {plant.native && <Tag tone="moss">Native</Tag>}
            {plant.evergreen && <Tag tone="sand">Evergreen</Tag>}
          </View>

          <Text style={styles.description} numberOfLines={2}>{plant.description}</Text>

          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <SunIcon level={plant.light} size={13} />
              <Text style={styles.footerText}>{plant.light}</Text>
            </View>
            <View style={styles.footerItem}>
              <WaterDrops level={plant.water} size={7} />
              <Text style={styles.footerText}>{plant.water}</Text>
            </View>
            <Text style={styles.footerText}>{plant.matureHeight}′ × {plant.matureWidth}′</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.saveRow}>
        <OutlineBtn small fullWidth onPress={onSavePress}>+ Save to Palette</OutlineBtn>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden', margin: 0 },
  body: { padding: 14 },
  commonName: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 17,
    color: C.fg,
    marginBottom: 2,
  },
  sciName: {
    fontFamily: 'Fraunces_400Regular_Italic',
    fontSize: 11,
    color: C.mutedFg,
    marginBottom: 8,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 8 },
  description: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: C.mutedFg,
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  footerText: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    color: C.mutedFg,
  },
  saveRow: { paddingHorizontal: 14, paddingBottom: 14 },
});
