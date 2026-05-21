import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card } from '../ui/Card';
import { GhostBtn } from '../ui/Button';
import { SunIcon } from '../icons/SunIcon';
import { WaterDrops } from '../icons/WaterDrops';
import { LeafIcon } from '../icons/LeafIcon';
import { FlowerIcon } from '../icons/FlowerIcon';
import { PaletteThumbnail } from './PaletteThumbnail';
import { MONTHS } from '../../constants/layout';
import { C } from '../../constants/colors';
import { getSeasonalLabel } from '../../utils/seasonal';
import type { Palette } from '../../data/types';

interface Props {
  palette: Palette;
  month: number;
  onDelete: () => void;
  onRemove: (plantId: number) => void;
  onRename: (name: string) => void;
  idx?: number;
}

export function PaletteCard({ palette, month, onDelete, onRemove, onRename, idx = 0 }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(palette.name);

  function commitRename() {
    const v = draft.trim();
    if (v && v !== palette.name) onRename(v);
    else setDraft(palette.name);
    setEditing(false);
  }

  function confirmDelete() {
    Alert.alert('Delete Palette', `Delete "${palette.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  }

  return (
    <Card radiusIdx={idx} style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {editing ? (
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onBlur={commitRename}
              onSubmitEditing={commitRename}
              autoFocus
              style={styles.nameInput}
            />
          ) : (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Text style={styles.paletteName}>{palette.name}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.meta}>
            {palette.plants.length} plant{palette.plants.length !== 1 ? 's' : ''}
            {'  ·  '}
            <Text style={{ color: C.primary }}>Showing {MONTHS[month - 1]}</Text>
          </Text>
        </View>
        <GhostBtn small danger onPress={confirmDelete}>Delete</GhostBtn>
      </View>

      {/* Thumbnails */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Seasonal Composition</Text>
        {palette.plants.length === 0 ? (
          <Text style={styles.empty}>No plants yet.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.thumbRow}>
              {palette.plants.map(pl => (
                <PaletteThumbnail key={pl.id} plant={pl} month={month} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Manifest */}
      {palette.plants.map((pl, i) => {
        const blooming = pl.bloomMonths.includes(month);
        const label = getSeasonalLabel(pl, month);
        return (
          <View key={pl.id} style={[styles.row, i === 0 && styles.rowFirst]}>
            <View style={styles.rowMain}>
              <Text style={styles.plantName}>{pl.commonName}</Text>
              <Text style={styles.sciName}>{pl.scientificName}</Text>
            </View>
            <View style={styles.rowMeta}>
              <SunIcon level={pl.light} size={13} />
              <WaterDrops level={pl.water} size={7} />
              <View style={[styles.statusPill, blooming && styles.statusBloom]}>
                {blooming
                  ? <FlowerIcon size={11} color={C.secondary} />
                  : <LeafIcon size={11} color={C.primary} />
                }
                <Text style={[styles.statusText, blooming && styles.statusTextBloom]}>{label}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => onRemove(pl.id)} style={styles.removeBtn} hitSlop={8}>
              <Text style={styles.removeX}>×</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20, overflow: 'hidden' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.muted,
    gap: 12,
  },
  headerLeft: { flex: 1 },
  paletteName: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
    color: C.fg,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent',
  },
  nameInput: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
    color: C.fg,
    borderBottomWidth: 1.5,
    borderBottomColor: C.primary,
    paddingBottom: 2,
  },
  meta: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: C.mutedFg,
    marginTop: 4,
  },
  section: { padding: 16, paddingBottom: 8 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: C.mutedFg,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  thumbRow: { flexDirection: 'row', gap: 8, paddingBottom: 8 },
  empty: { fontSize: 13, color: C.mutedFg, fontFamily: 'Nunito_400Regular', padding: 12, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 10,
  },
  rowFirst: { borderTopWidth: 1, borderTopColor: C.border },
  rowMain: { flex: 1 },
  plantName: { fontFamily: 'Fraunces_600SemiBold', fontSize: 14, color: C.fg },
  sciName: { fontFamily: 'Fraunces_400Regular_Italic', fontSize: 10, color: C.mutedFg, marginTop: 1 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(93,112,82,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(93,112,82,0.2)',
  },
  statusBloom: {
    backgroundColor: 'rgba(193,140,93,0.10)',
    borderColor: 'rgba(193,140,93,0.3)',
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: C.primary,
  },
  statusTextBloom: { color: C.secondary },
  removeBtn: { padding: 4 },
  removeX: { fontSize: 18, color: C.mutedFg, lineHeight: 22 },
});
