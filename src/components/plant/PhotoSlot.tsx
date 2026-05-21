import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';
import { LeafIcon } from '../icons/LeafIcon';

interface Props {
  height?: number;
  label?: string;
  borderRadius?: number;
}

export function PhotoSlot({ height = 160, label, borderRadius = 16 }: Props) {
  return (
    <View style={[styles.slot, { height, borderRadius }]}>
      <LeafIcon size={28} color={C.primary} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    backgroundColor: C.muted,
    borderWidth: 1,
    borderColor: C.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 10,
    color: C.mutedFg,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
