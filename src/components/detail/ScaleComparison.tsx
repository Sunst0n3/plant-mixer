import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Ellipse, Path, Circle, Rect, Polygon, Line } from 'react-native-svg';
import { C } from '../../constants/colors';
import { BloomHex } from '../../constants/colors';
import type { Plant } from '../../data/types';

// ---- Silhouettes ----

function PersonSil({ pxPerFt }: { pxPerFt: number }) {
  const w = 1.6 * pxPerFt, h = 6 * pxPerFt;
  return (
    <Svg width={w} height={h} viewBox="0 0 16 60" preserveAspectRatio="xMidYEnd meet">
      <Ellipse cx="8" cy="59" rx="6" ry="0.8" fill="#2C2C24" fillOpacity={0.15} />
      <Circle cx="8" cy="6" r="3.2" fill={C.secondary} />
      <Path d="M5 9 Q5 18 6 30 L6 45 Q6 47 5 58 L7 58 L7.5 47 L8 30 L8.5 47 L9 58 L11 58 Q10 47 10 45 L10 30 Q11 18 11 9 Z" fill={C.secondary} />
      <Path d="M4.5 11 Q3 18 3 28 L3.8 28 Q4.5 18 5.5 12 Z" fill={C.secondary} />
      <Path d="M11.5 11 Q13 18 13 28 L12.2 28 Q11.5 18 10.5 12 Z" fill={C.secondary} />
    </Svg>
  );
}

function HouseSil({ pxPerFt }: { pxPerFt: number }) {
  const w = 20 * pxPerFt, h = 15 * pxPerFt;
  return (
    <Svg width={w} height={h} viewBox="0 0 200 150" preserveAspectRatio="xMidYEnd meet">
      <Ellipse cx="100" cy="148" rx="95" ry="3" fill="#2C2C24" fillOpacity={0.12} />
      <Rect x="20" y="60" width="160" height="88" fill={C.accent} stroke={C.secondary} strokeWidth="2" />
      <Polygon points="10,62 100,8 190,62" fill={C.secondary} stroke="#8a6443" strokeWidth="1.5" />
      <Rect x="140" y="22" width="14" height="32" fill={C.secondary} stroke="#8a6443" strokeWidth="1" />
      <Rect x="86" y="100" width="28" height="48" fill={C.primary} />
      <Rect x="40" y="78" width="30" height="26" fill={C.bg} stroke="#8a6443" strokeWidth="1" />
      <Line x1="55" y1="78" x2="55" y2="104" stroke="#8a6443" strokeWidth="1" />
      <Line x1="40" y1="91" x2="70" y2="91" stroke="#8a6443" strokeWidth="1" />
      <Rect x="130" y="78" width="30" height="26" fill={C.bg} stroke="#8a6443" strokeWidth="1" />
      <Line x1="145" y1="78" x2="145" y2="104" stroke="#8a6443" strokeWidth="1" />
      <Line x1="130" y1="91" x2="160" y2="91" stroke="#8a6443" strokeWidth="1" />
    </Svg>
  );
}

interface PlantProps {
  plant: Plant;
  pxPerFt: number;
}

function TreeSil({ plant, pxPerFt }: PlantProps) {
  const w = plant.matureWidth * pxPerFt, h = plant.matureHeight * pxPerFt;
  const bc = BloomHex[plant.bloomColor] || C.primary;
  const blooming = plant.bloomMonths.length > 0;
  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none">
      <Ellipse cx="50" cy="99" rx="40" ry="1.5" fill="#2C2C24" fillOpacity={0.15} />
      <Path d="M46 100 Q47 88 47 70 L53 70 Q53 88 54 100 Z" fill="#7a5a3a" />
      <Path d="M50 5 C75 5,95 22,95 42 C95 58,82 70,65 72 C58 72,52 75,50 76 C48 75,42 72,35 72 C18 70,5 58,5 42 C5 22,25 5,50 5 Z" fill={C.primary} fillOpacity={0.92} />
      {blooming && [
        { cx: 30, cy: 25, r: 3.5 }, { cx: 55, cy: 18, r: 4 }, { cx: 72, cy: 28, r: 3.5 },
        { cx: 22, cy: 45, r: 3 }, { cx: 48, cy: 42, r: 3.8 }, { cx: 75, cy: 50, r: 3.2 },
      ].map((s, i) => (
        <Circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={bc} fillOpacity={0.95} />
      ))}
    </Svg>
  );
}

function ShrubSil({ plant, pxPerFt }: PlantProps) {
  const w = plant.matureWidth * pxPerFt, h = plant.matureHeight * pxPerFt;
  const bc = BloomHex[plant.bloomColor] || C.primary;
  const blooming = plant.bloomMonths.length > 0;
  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none">
      <Ellipse cx="50" cy="99" rx="42" ry="1.5" fill="#2C2C24" fillOpacity={0.15} />
      <Path d="M5 100 C5 70,12 50,25 45 C28 35,38 28,50 28 C62 28,72 35,75 45 C88 50,95 70,95 100 Z" fill={C.primary} fillOpacity={0.92} />
      {blooming && [
        { cx: 22, cy: 60, r: 2.8 }, { cx: 35, cy: 48, r: 3 }, { cx: 50, cy: 38, r: 3.2 },
        { cx: 65, cy: 42, r: 3 }, { cx: 78, cy: 58, r: 2.8 },
      ].map((s, i) => (
        <Circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={bc} fillOpacity={0.95} />
      ))}
    </Svg>
  );
}

function PerennialSil({ plant, pxPerFt }: PlantProps) {
  const w = plant.matureWidth * pxPerFt, h = Math.max(plant.matureHeight * pxPerFt, 20);
  const bc = BloomHex[plant.bloomColor] || C.primary;
  const blooming = plant.bloomMonths.length > 0;
  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none">
      <Ellipse cx="50" cy="99" rx="44" ry="1.5" fill="#2C2C24" fillOpacity={0.15} />
      <Path d="M8 100 C8 76,18 60,32 58 C40 50,60 50,68 58 C82 60,92 76,92 100 Z" fill={C.primary} fillOpacity={0.92} />
      {blooming && [28, 42, 58, 72].map((x, i) => (
        <React.Fragment key={x}>
          <Path d={`M${x} 60 Q${x + (i % 2 ? 2 : -2)} 40 ${x + (i % 2 ? 1 : -1)} 22`} stroke={C.primary} strokeWidth="1.5" fill="none" strokeOpacity={0.7} />
          <Circle cx={x + (i % 2 ? 1 : -1)} cy={20} r={4} fill={bc} />
        </React.Fragment>
      ))}
    </Svg>
  );
}

// ---- Composed scene ----

interface Props {
  plant: Plant;
  containerHeight?: number;
}

export function ScaleComparison({ plant, containerHeight = 260 }: Props) {
  const tallest = Math.max(plant.matureHeight, 15, 6);
  const usableH = containerHeight - 48;
  const pxPerFt = usableH / (tallest * 1.1);

  const PlantSvg = plant.type === 'Tree' ? TreeSil
    : plant.type === 'Shrub' ? ShrubSil
    : PerennialSil;

  return (
    <View style={[styles.scene, { height: containerHeight }]}>
      <View style={styles.ground} />
      <View style={styles.figures}>
        <View style={styles.fig}>
          <PersonSil pxPerFt={pxPerFt} />
          <Text style={styles.tick}>6′{'\n'}person</Text>
        </View>
        <View style={styles.fig}>
          <HouseSil pxPerFt={pxPerFt} />
          <Text style={styles.tick}>15′{'\n'}house</Text>
        </View>
        <View style={styles.fig}>
          <PlantSvg plant={plant} pxPerFt={pxPerFt} />
          <Text style={[styles.tick, styles.tickAccent]}>
            {plant.matureHeight}′ × {plant.matureWidth}′{'\n'}{plant.commonName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'rgba(230,220,205,0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
    position: 'relative',
  },
  ground: {
    position: 'absolute',
    bottom: 28,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },
  figures: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 12,
  },
  fig: { alignItems: 'center' },
  tick: {
    marginTop: 4,
    fontSize: 9,
    fontFamily: 'Nunito_700Bold',
    color: C.mutedFg,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 13,
  },
  tickAccent: { color: C.primary },
});
