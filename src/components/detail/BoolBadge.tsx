import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';

interface Props {
  label: string;
  value: boolean;
}

export function BoolBadge({ label, value }: Props) {
  return (
    <View style={[styles.badge, value && styles.active]}>
      <View style={[styles.dot, value ? styles.dotActive : styles.dotInactive]}>
        <Text style={styles.dotText}>{value ? '✓' : '·'}</Text>
      </View>
      <Text style={[styles.label, value && styles.labelActive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: C.muted,
    borderWidth: 1,
    borderColor: C.border,
  },
  active: {
    backgroundColor: 'rgba(93,112,82,0.10)',
    borderColor: 'rgba(93,112,82,0.3)',
  },
  dot: {
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  dotActive: { backgroundColor: C.primary },
  dotInactive: { backgroundColor: C.border },
  dotText: { color: '#fff', fontSize: 11 },
  label: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: C.mutedFg,
  },
  labelActive: { color: C.primary },
});
