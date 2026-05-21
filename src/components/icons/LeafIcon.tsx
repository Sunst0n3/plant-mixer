import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { C } from '../../constants/colors';

interface Props {
  size?: number;
  color?: string;
}

export function LeafIcon({ size = 18, color = C.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21 3c-7 0-12 4-14 9-2 5 0 9 0 9s4 2 9 0c5-2 9-7 9-14V3z"
        fill={color}
        fillOpacity={0.85}
      />
      <Path
        d="M21 3C16 8 12 12 6 18"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity={0.8}
      />
    </Svg>
  );
}
