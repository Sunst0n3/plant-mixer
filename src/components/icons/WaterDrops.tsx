import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { C } from '../../constants/colors';

const LEVELS: Record<string, number> = { Low: 1, Moderate: 2, High: 3 };

interface Props {
  level: string;
  size?: number;
}

export function WaterDrops({ level, size = 9 }: Props) {
  const n = LEVELS[level] ?? 0;
  return (
    <View style={styles.row}>
      {[0, 1, 2].map(i => (
        <Svg key={i} width={size} height={Math.round(size * 1.35)} viewBox="0 0 8 11">
          <Path
            d="M4 0.5C4 0.5 0.5 5 0.5 7.5a3.5 3.5 0 007 0C7.5 5 4 0.5 4 0.5Z"
            fill={i < n ? C.primary : 'transparent'}
            stroke={i < n ? C.primary : C.border}
            strokeWidth="0.9"
          />
        </Svg>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
});
