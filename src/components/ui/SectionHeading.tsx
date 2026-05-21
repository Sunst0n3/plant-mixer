import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';

interface Props {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: C.mutedFg,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 22,
    color: C.fg,
    lineHeight: 26,
  },
});
