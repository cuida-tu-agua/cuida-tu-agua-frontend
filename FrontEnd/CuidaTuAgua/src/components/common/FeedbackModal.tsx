import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';

type FeedbackType = 'success' | 'error' | 'info';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  type?: FeedbackType;
  onClose: () => void;
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
};

export default function FeedbackModal({
  visible,
  title,
  message,
  type = 'info',  
  onClose,
  secondaryButtonText,
  onSecondaryPress,
}: Props) {
  const { colors } = useTheme();

  const typeStyles: Record<
    FeedbackType,
    { titleColor: string; buttonColor: string }
  > = {
    success: {
      titleColor: colors.success,
      buttonColor: colors.success,
    },
    error: {
      titleColor: colors.error,
      buttonColor: colors.error,
    },
    info: {
      titleColor: colors.primary,
      buttonColor: colors.primary,
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: currentStyle.titleColor }]}>
            {title}
          </Text>

          <Text style={[styles.message, { color: colors.textPrimary }]}>
            {message}
          </Text>

          {secondaryButtonText ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: currentStyle.buttonColor }]}
                onPress={onSecondaryPress}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: currentStyle.buttonColor }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    flexDirection: 'column',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});