import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/ThemeContext';

export default function ThemeToggleButton() {
  const { mode, colors, toggleTheme } = useTheme();
  const isLight = mode === 'light';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isLight ? colors.surface : colors.grayLight,
          borderColor: colors.grayMedium,
        },
      ]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isLight ? 'moon' : 'sunny'}
        size={20}
        color={isLight ? colors.textPrimary : '#FACC15'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
