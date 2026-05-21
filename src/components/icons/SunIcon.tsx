import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { C } from '../../constants/colors';

interface Props {
  level: string;
  size?: number;
}

export function SunIcon({ level, size = 16 }: Props) {
  const full = level === 'Full Sun';
  const part = level === 'Part Sun';
  const rayColor = full || part ? C.secondary : C.border;
  const fillColor = full ? C.secondary : 'none';
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      {part && <Path d="M8 4.5 A3.5 3.5 0 0 1 8 11.5 Z" fill={C.secondary} />}
      <Circle cx="8" cy="8" r="3.5" fill={fillColor} stroke={rayColor} strokeWidth="1.2" />
      {rays.map((a, i) => {
        const rad = (Math.PI * a) / 180;
        const x1 = 8 + 5 * Math.cos(rad), y1 = 8 + 5 * Math.sin(rad);
        const x2 = 8 + 7 * Math.cos(rad), y2 = 8 + 7 * Math.sin(rad);
        const c = full || (part && i < 4) ? C.secondary : C.border;
        return (
          <Line key={a} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c} strokeWidth="1.3" strokeLinecap="round" />
        );
      })}
    </Svg>
  );
}
