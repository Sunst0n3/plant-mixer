import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MONTHS } from '../../constants/layout';
import { C } from '../../constants/colors';

interface Props {
  month: number;
  onSelect: (m: number) => void;
}

export function MonthScrubber({ month, onSelect }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Viewing season</Text>
      <Text style={styles.current}>{MONTHS[month - 1]}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.row}>
          {MONTHS.map((m, i) => {
            const mo = i + 1;
            const active = month === mo;
            return (
              <TouchableOpacity
                key={m}
                onPress={() => onSelect(mo)}
                style={[styles.pill, active && styles.pillActive]}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{m}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 20 },
  label: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: C.mutedFg,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  current: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 28,
    color: C.fg,
    marginBottom: 12,
  },
  scroll: { marginHorizontal: -16 },
  row: { flexDirection: 'row', gap: 6, paddingHorizontal: 16 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: C.muted,
    borderWidth: 1.5,
    borderColor: C.border,
  },
  pillActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  pillText: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: C.fg,
  },
  pillTextActive: { color: C.primFg, fontFamily: 'Nunito_700Bold' },
});
