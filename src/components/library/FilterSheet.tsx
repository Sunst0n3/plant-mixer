import React, { useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity, ScrollView,
  StyleSheet, TextInput, Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, BloomHex, BLOOM_COLOR_OPTS, TypeColors } from '../../constants/colors';
import { LIGHT_OPTS, WATER_OPTS, TYPE_OPTS, IRRIGATION_OPTS, MONTHS } from '../../constants/layout';
import { ALL_FAMILIES } from '../../data/plants';
import type { FilterState } from '../../data/types';

// ---- Section ----
function Section({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(count > 0);
  return (
    <View style={sec.wrap}>
      <TouchableOpacity style={sec.header} onPress={() => setOpen(o => !o)} activeOpacity={0.8}>
        <View style={sec.labelRow}>
          <Text style={[sec.label, open && sec.labelOpen]}>{label}</Text>
          {count > 0 && <View style={sec.badge}><Text style={sec.badgeText}>{count}</Text></View>}
        </View>
        <Text style={sec.caret}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && <View style={sec.body}>{children}</View>}
    </View>
  );
}

const sec = StyleSheet.create({
  wrap: { marginBottom: 6, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: C.card },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 13, fontFamily: 'Nunito_700Bold', color: C.fg },
  labelOpen: { color: C.primary },
  badge: { backgroundColor: C.primary, paddingHorizontal: 7, paddingVertical: 1, borderRadius: 999 },
  badgeText: { fontSize: 10, color: C.primFg, fontFamily: 'Nunito_700Bold' },
  caret: { fontSize: 10, color: C.mutedFg },
  body: { padding: 10, backgroundColor: C.card },
});

// ---- Filter button ----
function FBtn({ active, onPress, children }: { active: boolean; onPress: () => void; children: React.ReactNode }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[fb.btn, active && fb.active]}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}

const fb = StyleSheet.create({
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 10, borderWidth: 1.5, borderColor: C.border,
    marginBottom: 4, backgroundColor: 'transparent',
  },
  active: { borderColor: C.primary, backgroundColor: 'rgba(93,112,82,0.08)' },
});

// ---- Tri-toggle ----
function TriToggle({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean | null) => void }) {
  return (
    <View style={tri.row}>
      <Text style={tri.label}>{label}</Text>
      <View style={tri.group}>
        {([null, true, false] as (boolean | null)[]).map((v, i) => {
          const active = value === v;
          return (
            <TouchableOpacity key={i} onPress={() => onChange(v)} style={[tri.pill, active && tri.pillActive]}>
              <Text style={[tri.pillText, active && tri.pillTextActive]}>
                {v === null ? 'Any' : v ? 'Yes' : 'No'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const tri = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, fontFamily: 'Nunito_600SemiBold', color: C.fg },
  group: { flexDirection: 'row', gap: 4, backgroundColor: C.muted, borderRadius: 999, padding: 3 },
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  pillActive: { backgroundColor: C.card, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  pillText: { fontSize: 11, fontFamily: 'Nunito_700Bold', color: C.mutedFg },
  pillTextActive: { color: C.primary },
});

// ---- Main FilterSheet ----
interface Props {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  setF: (key: keyof FilterState, val: unknown) => void;
  setRange: (key: keyof FilterState, val: number) => void;
  clear: () => void;
  hasActive: boolean;
}

export function FilterSheet({ visible, onClose, filters, setF, setRange, clear, hasActive }: Props) {
  const insets = useSafeAreaInsets();

  const counts = {
    light: filters.light ? 1 : 0,
    water: filters.water ? 1 : 0,
    irrigation: filters.irrigation ? 1 : 0,
    type: filters.type ? 1 : 0,
    family: filters.family ? 1 : 0,
    booleans: [filters.saltTolerant, filters.native, filters.nativar, filters.evergreen].filter(v => v !== null).length,
    bloomColor: filters.bloomColor ? 1 : 0,
    bloomMonth: filters.bloomMonth ? 1 : 0,
    zone: filters.zone ? 1 : 0,
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.sheetHeader}>
          <Text style={styles.title}>Filter Plants</Text>
          <View style={styles.headerActions}>
            {hasActive && (
              <TouchableOpacity onPress={clear} style={styles.clearBtn}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} style={styles.doneBtn}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Sun */}
          <Section label="Sun Exposure" count={counts.light}>
            {LIGHT_OPTS.map(o => (
              <FBtn key={o.value} active={filters.light === o.value} onPress={() => setF('light', o.value)}>
                <Text style={[fs.btnMain, filters.light === o.value && fs.active]}>{o.label}</Text>
                <Text style={fs.btnSub}>{o.sub}</Text>
              </FBtn>
            ))}
          </Section>

          {/* Water */}
          <Section label="Water Needs" count={counts.water}>
            {WATER_OPTS.map(o => (
              <FBtn key={o.value} active={filters.water === o.value} onPress={() => setF('water', o.value)}>
                <Text style={[fs.btnMain, filters.water === o.value && fs.active]}>{o.label}</Text>
                <Text style={fs.btnSub}>{o.sub}</Text>
              </FBtn>
            ))}
          </Section>

          {/* Irrigation */}
          <Section label="Irrigation" count={counts.irrigation}>
            {IRRIGATION_OPTS.map(o => (
              <FBtn key={o} active={filters.irrigation === o} onPress={() => setF('irrigation', o)}>
                <Text style={[fs.btnMain, filters.irrigation === o && fs.active]}>{o}</Text>
              </FBtn>
            ))}
          </Section>

          {/* Plant Type */}
          <Section label="Plant Type" count={counts.type}>
            {TYPE_OPTS.map(t => {
              const tc = TypeColors[t] || { dot: C.mutedFg };
              return (
                <FBtn key={t} active={filters.type === t} onPress={() => setF('type', t)}>
                  <View style={[fs.dot, { backgroundColor: tc.dot }]} />
                  <Text style={[fs.btnMain, filters.type === t && fs.active]}>{t}</Text>
                </FBtn>
              );
            })}
          </Section>

          {/* Family */}
          <Section label="Plant Family" count={counts.family}>
            {ALL_FAMILIES.map(f => (
              <FBtn key={f} active={filters.family === f} onPress={() => setF('family', f)}>
                <Text style={[fs.btnMainItalic, filters.family === f && fs.active]}>{f}</Text>
              </FBtn>
            ))}
          </Section>

          {/* Attributes */}
          <Section label="Plant Attributes" count={counts.booleans}>
            <TriToggle label="Native" value={filters.native} onChange={v => setF('native', v)} />
            <TriToggle label="Nativar" value={filters.nativar} onChange={v => setF('nativar', v)} />
            <TriToggle label="Evergreen" value={filters.evergreen} onChange={v => setF('evergreen', v)} />
            <TriToggle label="Salt Tolerant" value={filters.saltTolerant} onChange={v => setF('saltTolerant', v)} />
          </Section>

          {/* Bloom Color */}
          <Section label="Bloom Color" count={counts.bloomColor}>
            <View style={fs.swatchGrid}>
              {BLOOM_COLOR_OPTS.map(o => {
                const active = filters.bloomColor === o.value;
                return (
                  <TouchableOpacity key={o.value} onPress={() => setF('bloomColor', o.value)} style={fs.swatch}>
                    <View style={[fs.swatchCircle, { backgroundColor: o.swatch }, active && fs.swatchActive]} />
                    <Text style={[fs.swatchLabel, active && fs.swatchLabelActive]}>{o.value}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {/* Bloom Month */}
          <Section label="Bloom Month" count={counts.bloomMonth}>
            <View style={fs.monthGrid}>
              {MONTHS.map((m, i) => {
                const mo = i + 1;
                const active = filters.bloomMonth === mo;
                return (
                  <TouchableOpacity
                    key={m} onPress={() => setF('bloomMonth', mo)}
                    style={[fs.monthPill, active && fs.monthPillActive]}
                  >
                    <Text style={[fs.monthText, active && fs.monthTextActive]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          {/* Hardiness Zone */}
          <Section label="Hardiness Zone" count={counts.zone}>
            <View style={fs.zoneGrid}>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(z => {
                const active = filters.zone === z;
                return (
                  <TouchableOpacity
                    key={z} onPress={() => setF('zone', z)}
                    style={[fs.zonePill, active && fs.zonePillActive]}
                  >
                    <Text style={[fs.zoneText, active && fs.zoneTextActive]}>{z}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={fs.hint}>USDA Hardiness Zone</Text>
          </Section>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: 12,
  },
  handle: {
    width: 36, height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  title: { fontFamily: 'Fraunces_600SemiBold', fontSize: 22, color: C.fg },
  headerActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  clearBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  clearText: { fontSize: 13, fontFamily: 'Nunito_700Bold', color: C.primary },
  doneBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primary, borderRadius: 999 },
  doneText: { fontSize: 13, fontFamily: 'Nunito_700Bold', color: C.primFg },
  scroll: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
});

const fs = StyleSheet.create({
  btnMain: { fontSize: 13, fontFamily: 'Nunito_600SemiBold', color: C.fg },
  btnMainItalic: { fontSize: 13, fontFamily: 'Fraunces_400Regular_Italic', color: C.fg },
  btnSub: { fontSize: 11, fontFamily: 'Nunito_400Regular', color: C.mutedFg },
  active: { color: C.primary },
  dot: { width: 12, height: 12, borderRadius: 6 },
  swatchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 4 },
  swatch: { alignItems: 'center', gap: 4, width: '22%' },
  swatchCircle: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: C.border },
  swatchActive: { borderColor: C.primary, shadowColor: C.primary, shadowOpacity: 0.3, shadowRadius: 4, elevation: 2 },
  swatchLabel: { fontSize: 9, color: C.mutedFg, fontFamily: 'Nunito_600SemiBold', textAlign: 'center' },
  swatchLabelActive: { color: C.primary },
  monthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  monthPill: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8, backgroundColor: C.muted, borderWidth: 1, borderColor: C.border },
  monthPillActive: { backgroundColor: C.primary, borderColor: C.primary },
  monthText: { fontSize: 12, fontFamily: 'Nunito_600SemiBold', color: C.mutedFg },
  monthTextActive: { color: C.primFg, fontFamily: 'Nunito_700Bold' },
  zoneGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  zonePill: { width: 48, paddingVertical: 8, borderRadius: 10, backgroundColor: C.muted, borderWidth: 1, borderColor: C.border, alignItems: 'center' },
  zonePillActive: { backgroundColor: C.primary, borderColor: C.primary },
  zoneText: { fontSize: 13, fontFamily: 'Fraunces_600SemiBold', color: C.fg },
  zoneTextActive: { color: C.primFg },
  hint: { fontSize: 10, color: C.mutedFg, textAlign: 'center', fontFamily: 'Nunito_400Regular' },
});
