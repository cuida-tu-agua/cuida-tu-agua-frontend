import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';

interface FeatureCardProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, iconColor, iconBg, title, description }: FeatureCardProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.grayMedium }]}> 
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}> 
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>
      <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>{description}</Text>
    </View>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },

});