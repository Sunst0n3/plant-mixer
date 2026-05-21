import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, TypeColors } from '../../constants/colors';

interface Props {
  type: string;
  small?: boolean;
}

export function TypePill({ type, small }: Props) {
  const tc = TypeColors[type] || { bg: C.muted, text: C.mutedFg, dot: C.mutedFg };
  return (
    <View style={[styles.pill, { backgroundColor: tc.bg }]}>
      <View style={[styles.dot, { backgroundColor: tc.dot }]} />
      <Text style={[styles.text, { color: tc.text }, small && styles.smallText]}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 11, fontFamily: 'Nunito_700Bold', letterSpacing: 0.2 },
  smallText: { fontSize: 10 },
});
