import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme, spacing, typography } from '@theme/index';
import { useTranslation } from 'react-i18next';

interface ThemeOption {
  id: string;
  label: string;
  type: 'standard' | 'eco';
}

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ThemeSelector = ({ style }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors, themeType, setThemeType } = useTheme();
  const { t } = useTranslation('settings');

  const THEME_OPTIONS: ThemeOption[] = [
    { id: '1', label: t('theme.standard'), type: 'standard' },
    { id: '2', label: t('theme.eco'), type: 'eco' },
  ];

  const getCurrentTheme = () => {
    return THEME_OPTIONS.find(t => t.type === themeType) || THEME_OPTIONS[0];
  };

  const [selected, setSelected] = useState(getCurrentTheme());

  useEffect(() => {
    const current = getCurrentTheme();
    setSelected(current);
  }, [themeType]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.selectorBtn, { backgroundColor: colors.surface }]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.labelText, { color: colors.textPrimary }]}>{selected.label}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.grayMedium }]}>
          {THEME_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemBtn}
              onPress={() => {
                setSelected(item);
                setThemeType(item.type);
                setIsOpen(false);
              }}
            >
              <Text style={[styles.itemLabel, { color: colors.textPrimary }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ThemeSelector;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    alignSelf: 'flex-end',
  },
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemBtn: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLabel: {
    fontSize: 14,
  },
});