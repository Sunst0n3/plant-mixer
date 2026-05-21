import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator, StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../src/constants/colors';
import { fetchPlantById } from '../../src/data/api';
import { usePalettes } from '../../src/hooks/usePalettes';
import { Card } from '../../src/components/ui/Card';
import { PrimaryBtn } from '../../src/components/ui/Button';
import { TypePill } from '../../src/components/ui/TypePill';
import { Tag } from '../../src/components/ui/Tag';
import { SectionHeading } from '../../src/components/ui/SectionHeading';
import { PhotoSlot } from '../../src/components/plant/PhotoSlot';
import { StatTile } from '../../src/components/detail/StatTile';
import { BoolBadge } from '../../src/components/detail/BoolBadge';
import { BloomCalendar } from '../../src/components/detail/BloomCalendar';
import { SeasonalGrid } from '../../src/components/detail/SeasonalGrid';
import { ScaleComparison } from '../../src/components/detail/ScaleComparison';
import { SaveModal } from '../../src/components/library/SaveModal';
import { SunIcon } from '../../src/components/icons/SunIcon';
import { WaterDrops } from '../../src/components/icons/WaterDrops';
import type { Plant } from '../../src/data/types';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { palettes, save } = usePalettes();
  const [saveOpen, setSaveOpen] = useState(false);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const numId = parseInt(id ?? '', 10);
    if (isNaN(numId) || numId < 1) {
      setError('Invalid plant ID.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchPlantById(numId)
      .then(p => setPlant(p))
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load plant'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );
  }

  if (error || !plant) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>{error ?? 'Plant not found.'}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero photo */}
        <PhotoSlot height={260} label={plant.commonName} borderRadius={24} />

        {/* Identity */}
        <View style={styles.identity}>
          <View style={styles.tags}>
            <TypePill type={plant.type} />
            {plant.native && <Tag tone="moss">Native</Tag>}
            {plant.nativar && <Tag tone="moss">Nativar</Tag>}
            {plant.evergreen && <Tag tone="sand">Evergreen</Tag>}
            {plant.saltTolerant && <Tag tone="clay">🧂 Salt Tolerant</Tag>}
          </View>
          <Text style={styles.commonName}>{plant.commonName}</Text>
          <Text style={styles.sciName}>{plant.scientificName} {plant.variety}</Text>
          <Text style={styles.family}>Family · <Text style={styles.familyItalic}>{plant.family}</Text></Text>
          {!!plant.description && (
            <Text style={styles.description}>{plant.description}</Text>
          )}
          <PrimaryBtn onPress={() => setSaveOpen(true)}>＋ Save to Palette</PrimaryBtn>
        </View>

        {/* Specifications */}
        <Card radiusIdx={1} style={styles.card}>
          <SectionHeading subtitle="Growing Conditions" title="Specifications" />
          <View style={styles.specsGrid}>
            <StatTile label="Light" value={plant.light} />
            <StatTile label="Water" value={plant.water} />
            {!!plant.irrigation && <StatTile label="Irrigation" value={plant.irrigation} />}
            {!!plant.hardinessZone && (
              <StatTile label="Hardiness Zone" value={`Zone ${plant.hardinessZone}`} />
            )}
            {plant.matureHeight > 0 && (
              <StatTile label="Mature Height" value={`${plant.matureHeight} ft`} accent />
            )}
            {plant.matureWidth > 0 && (
              <StatTile label="Mature Width" value={`${plant.matureWidth} ft`} accent />
            )}
            {plant.bloomColor !== 'None' && !!plant.bloomColor && (
              <StatTile label="Bloom Color" value={plant.bloomColor} />
            )}
            {!!plant.spreadingBehavior && (
              <StatTile label="Spreading" value={plant.spreadingBehavior} />
            )}
          </View>
          <View style={styles.boolRow}>
            <BoolBadge label="Native" value={plant.native} />
            <BoolBadge label="Nativar" value={plant.nativar} />
            <BoolBadge label="Evergreen" value={plant.evergreen} />
            <BoolBadge label="Salt Tolerant" value={plant.saltTolerant} />
          </View>
        </Card>

        {/* Scale comparison — only if we have real dimensions */}
        {plant.matureHeight > 0 && plant.matureWidth > 0 && (
          <Card radiusIdx={2} style={styles.card}>
            <SectionHeading subtitle="Mature size in context" title={`How big does ${plant.commonName} get?`} />
            <Text style={styles.scaleCaption}>
              Drawn to scale against a <Text style={{ color: C.fg, fontFamily: 'Nunito_700Bold' }}>6′ person</Text> and a <Text style={{ color: C.fg, fontFamily: 'Nunito_700Bold' }}>15′ house</Text>.
            </Text>
            <ScaleComparison plant={plant} containerHeight={220} />
          </Card>
        )}

        {/* Bloom calendar */}
        {plant.bloomMonths.length > 0 && (
          <Card radiusIdx={3} style={styles.card}>
            <SectionHeading subtitle="When it flowers" title="Bloom Calendar" />
            <BloomCalendar plant={plant} />
          </Card>
        )}

        {/* Seasonal appearance */}
        {Object.keys(plant.seasonal).length > 0 && (
          <Card radiusIdx={4} style={styles.card}>
            <SectionHeading subtitle="Month by month" title="Seasonal Appearance" />
            <Text style={styles.scaleCaption}>Tap any tile to read the plant's character that month.</Text>
            <SeasonalGrid plant={plant} />
          </Card>
        )}

        {/* Maintenance */}
        {(plant.maintenance.length > 0 || !!plant.maintenanceNotes) && (
          <Card radiusIdx={0} style={styles.card}>
            <SectionHeading subtitle="Care notes" title="Maintenance" />
            {plant.maintenance.length > 0 && (
              <View style={styles.maintTags}>
                {plant.maintenance.map(m => (
                  <Tag key={m} tone="sand">{m}</Tag>
                ))}
              </View>
            )}
            {!!plant.maintenanceNotes && (
              <Text style={styles.maintNotes}>"{plant.maintenanceNotes}"</Text>
            )}
          </Card>
        )}
      </ScrollView>

      {saveOpen && (
        <SaveModal
          visible
          plant={plant}
          palettes={palettes}
          onClose={() => setSaveOpen(false)}
          onSave={save}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 16, paddingTop: 8, gap: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontFamily: 'Fraunces_600SemiBold', fontSize: 18, color: C.mutedFg },

  identity: { gap: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  commonName: { fontFamily: 'Fraunces_700Bold', fontSize: 36, color: C.fg, lineHeight: 42 },
  sciName: { fontFamily: 'Fraunces_400Regular_Italic', fontSize: 16, color: C.secondary },
  family: { fontSize: 12, color: C.mutedFg, fontFamily: 'Nunito_600SemiBold', letterSpacing: 0.6, textTransform: 'uppercase' },
  familyItalic: { fontFamily: 'Fraunces_400Regular_Italic', textTransform: 'none' },
  description: { fontSize: 15, color: C.fg, fontFamily: 'Nunito_400Regular', lineHeight: 22, opacity: 0.85 },

  card: { padding: 18 },

  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  boolRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  scaleCaption: { fontSize: 12, color: C.mutedFg, fontFamily: 'Nunito_400Regular', lineHeight: 18, marginBottom: 12 },

  maintTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  maintNotes: {
    fontFamily: 'Fraunces_400Regular_Italic',
    fontSize: 15, color: C.fg,
    lineHeight: 22, opacity: 0.88,
  },
});
