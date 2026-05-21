import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { C } from '../../constants/colors';

const RADII = [16, 24, 20, 18, 22];

interface Props {
  children: React.ReactNode;
  radiusIdx?: number;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, radiusIdx = 0, style, padding = 0 }: Props) {
  const radius = RADII[radiusIdx % RADII.length];
  return (
    <View style={[styles.card, { borderRadius: radius, padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: '#5D7052',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
});
