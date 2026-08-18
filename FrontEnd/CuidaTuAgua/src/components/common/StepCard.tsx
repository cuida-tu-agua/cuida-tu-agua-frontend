import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme, spacing, typography } from '@theme/index';

interface StepCardProps {
  step: string;       
  icon: string;
  title: string;
  description: string;
}



const StepCard = ({ step, icon, title, description }: StepCardProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.stepBadge, { backgroundColor: colors.secondary }]}> 
        <Text style={[styles.stepText, { color: colors.surface }]}>{step}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}> 
        <View style={[styles.iconContainer, { backgroundColor: colors.grayLight }]}> 
          <Ionicons name={icon as any} size={28} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      </View>
    </View>
  );
};

export default StepCard;

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    position: 'relative',
    marginBottom: spacing.lg,
    top: spacing.md,
  },
  stepBadge: {
    position: 'absolute',
    top: -14,
    right: 12,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  stepText: {
    ...typography.small,
    fontWeight: '700',
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 220,
    maxHeight: 300,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.subtitle,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    lineHeight: 20,
  },
});