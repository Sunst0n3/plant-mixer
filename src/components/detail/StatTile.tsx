import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';

interface Props {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}

export function StatTile({ label, value, accent }: Props) {
  return (
    <View style={styles.tile}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accent && styles.accent]}>
        {typeof value === 'string' ? value : ''}
      </Text>
      {typeof value !== 'string' && value}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: C.muted,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: C.mutedFg,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Fraunces_600SemiBold',
    color: C.fg,
  },
  accent: { color: C.primary },
});
