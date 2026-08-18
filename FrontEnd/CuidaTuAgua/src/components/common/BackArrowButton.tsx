import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { useTheme } from '@theme/index';

type BackArrowButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

export default function BackArrowButton({ onPress, style }: BackArrowButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Svg width={40} height={40} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="46" fill={colors.surface} stroke={colors.border} strokeWidth="1"/>
        <Line x1="58" y1="50" x2="36" y2="50" stroke={colors.textPrimary} strokeWidth="3" strokeLinecap="round"/>
        <Path d="M46 38 L34 50 L46 62" fill="none" stroke={colors.textPrimary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    </TouchableOpacity>
  );
}