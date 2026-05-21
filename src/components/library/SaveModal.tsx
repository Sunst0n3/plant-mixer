import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../constants/colors';
import { PrimaryBtn } from '../ui/Button';
import type { Plant, Palette } from '../../data/types';

interface Props {
  visible: boolean;
  plant: Plant;
  palettes: Palette[];
  onClose: () => void;
  onSave: (mode: 'new' | 'add', plant: Plant, nameOrId: string) => void;
}

export function SaveModal({ visible, plant, palettes, onClose, onSave }: Props) {
  const [tab, setTab] = useState<'new' | 'add'>(palettes.length > 0 ? 'add' : 'new');
  const [name, setName] = useState('');
  const insets = useSafeAreaInsets();

  function handleSave() {
    onSave('new', plant, name);
    setName('');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.subtitle}>Save plant</Text>
            <Text style={styles.title}>Add {plant.commonName} to a palette</Text>
          </View>

          {/* Tab switcher */}
          <View style={styles.tabBar}>
            {(['new', 'add'] as const).map(t => (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(t)}
                style={[styles.tab, tab === t && styles.tabActive]}
              >
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                  {t === 'new' ? 'New Palette' : 'Add to Existing'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tab === 'new' && (
            <View style={styles.body}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Palette name (optional)"
                placeholderTextColor={C.mutedFg}
                style={styles.input}
              />
              <PrimaryBtn fullWidth onPress={handleSave}>Create palette</PrimaryBtn>
            </View>
          )}

          {tab === 'add' && (
            palettes.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>No palettes yet</Text>
                <Text style={styles.emptyText}>Create one with the other tab.</Text>
              </View>
            ) : (
              <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                {palettes.map(p => (
                  <TouchableOpacity
                    key={p.id}
                    onPress={() => { onSave('add', plant, p.id); onClose(); }}
                    style={styles.paletteRow}
                    activeOpacity={0.8}
                  >
                    <View>
                      <Text style={styles.paletteName}>{p.name}</Text>
                      <Text style={styles.paletteMeta}>{p.plants.length} plant{p.plants.length !== 1 ? 's' : ''}</Text>
                    </View>
                    <Text style={styles.plus}>＋</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    width: 36, height: 4, backgroundColor: C.border,
    borderRadius: 2, alignSelf: 'center', marginBottom: 16,
  },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  subtitle: { fontSize: 11, fontFamily: 'Nunito_700Bold', color: C.mutedFg, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontFamily: 'Fraunces_600SemiBold', fontSize: 22, color: C.fg, marginTop: 4 },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: C.muted,
    borderRadius: 999,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center' },
  tabActive: { backgroundColor: C.card, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 1 },
  tabText: { fontSize: 13, fontFamily: 'Nunito_700Bold', color: C.mutedFg },
  tabTextActive: { color: C.fg },
  body: { flex: 1, paddingHorizontal: 20, gap: 12 },
  input: {
    height: 48, borderRadius: 999,
    borderWidth: 1.5, borderColor: C.border,
    paddingHorizontal: 20,
    fontSize: 14, fontFamily: 'Nunito_400Regular',
    color: C.fg, backgroundColor: '#fff',
    marginBottom: 12,
  },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontFamily: 'Fraunces_600SemiBold', fontSize: 18, color: C.fg, marginBottom: 6 },
  emptyText: { fontSize: 13, color: C.mutedFg, fontFamily: 'Nunito_400Regular' },
  paletteRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, backgroundColor: C.muted,
    borderRadius: 14, borderWidth: 1.5, borderColor: C.border, marginBottom: 8,
  },
  paletteName: { fontFamily: 'Fraunces_600SemiBold', fontSize: 16, color: C.fg },
  paletteMeta: { fontSize: 12, color: C.mutedFg, fontFamily: 'Nunito_400Regular', marginTop: 2 },
  plus: { fontSize: 22, color: C.primary },
  closeBtn: { alignItems: 'center', paddingVertical: 14, marginHorizontal: 20 },
  closeText: { fontSize: 14, fontFamily: 'Nunito_700Bold', color: C.mutedFg },
});
