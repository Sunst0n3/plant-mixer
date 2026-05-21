import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { C } from '../../constants/colors';

interface Props {
  size?: number;
  color?: string;
}

export function FlowerIcon({ size = 18, color = C.secondary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="6" r="3" fill={color} />
      <Circle cx="18" cy="12" r="3" fill={color} />
      <Circle cx="12" cy="18" r="3" fill={color} />
      <Circle cx="6" cy="12" r="3" fill={color} />
      <Circle cx="12" cy="12" r="2.4" fill="#F2E8C4" />
    </Svg>
  );
}
