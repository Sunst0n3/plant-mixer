import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../../constants/colors';

type Tone = 'muted' | 'moss' | 'clay' | 'sand';

const TONES: Record<Tone, { bg: string; fg: string; br: string }> = {
  muted: { bg: C.muted, fg: C.mutedFg, br: C.border },
  moss:  { bg: 'rgba(93,112,82,0.10)', fg: C.primary, br: 'rgba(93,112,82,0.25)' },
  clay:  { bg: 'rgba(193,140,93,0.10)', fg: C.secondary, br: 'rgba(193,140,93,0.25)' },
  sand:  { bg: C.accent, fg: '#5A4530', br: C.border },
};

interface Props {
  children: React.ReactNode;
  tone?: Tone;
}

export function Tag({ children, tone = 'muted' }: Props) {
  const t = TONES[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.bg, borderColor: t.br }]}>
      <Text style={[styles.text, { color: t.fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 0.4,
  },
});
