import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme, spacing, typography } from '@theme/index';

type Props = {
  checked: boolean;
  onPress: () => void;
  label: string;
  onLabelPress?: () => void;
};

export default function CheckboxField({
  checked,
  onPress,
  label,
  onLabelPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: colors.grayMedium },
          checked && { backgroundColor: colors.primary, borderColor: colors.primary },
        ]}
        onPress={onPress}
      />

      <TouchableOpacity onPress={onLabelPress || onPress}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: spacing.sm,
  },

  label: {
    ...typography.body,
  },
});