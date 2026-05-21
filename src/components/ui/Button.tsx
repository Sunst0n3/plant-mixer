import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { C } from '../../constants/colors';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  fullWidth?: boolean;
  small?: boolean;
  style?: ViewStyle;
}

export function PrimaryBtn({ children, onPress, fullWidth, small, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.primary, small && styles.small, fullWidth && styles.full, style]}
    >
      <Text style={[styles.primaryText, small && styles.smallText]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function OutlineBtn({ children, onPress, fullWidth, small, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.outline, small && styles.small, fullWidth && styles.full, style]}
    >
      <Text style={[styles.outlineText, small && styles.smallText]}>{children}</Text>
    </TouchableOpacity>
  );
}

interface GhostProps extends Props {
  danger?: boolean;
}

export function GhostBtn({ children, onPress, small, danger, style }: GhostProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.ghost, style]}>
      <Text style={[styles.ghostText, danger && styles.dangerText, small && styles.smallText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: C.primary,
    borderRadius: 999,
    height: 48,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryText: {
    color: C.primFg,
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    letterSpacing: 0.2,
  },
  outline: {
    borderRadius: 999,
    height: 48,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: C.secondary,
  },
  outlineText: {
    color: C.secondary,
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  ghost: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    color: C.primary,
    fontSize: 13,
    fontFamily: 'Nunito_700Bold',
  },
  dangerText: {
    color: C.destructive,
  },
  small: { height: 40, paddingHorizontal: 20 },
  smallText: { fontSize: 13 },
  full: { width: '100%' },
});
