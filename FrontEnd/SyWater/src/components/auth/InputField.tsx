import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, spacing, typography } from "@theme/index";

type Props = TextInputProps & {
  label: string;
  errorMessage?: string;
};

export default function InputField({
  label,
  secureTextEntry,
  style,
  errorMessage,
  ...props
}: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = secureTextEntry === true;
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          secureTextEntry={isPasswordField && !showPassword}
          style={[
            styles.input,
            {
              borderColor: hasError ? colors.error : colors.primary,
              color: colors.textPrimary,
              backgroundColor: colors.surface,
            },
            isPasswordField && styles.inputWithToggle,
            style,
          ]}
          placeholderTextColor={colors.grayMedium}
        />

        {isPasswordField && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage ? (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },

  label: {
    ...typography.body,
    marginBottom: spacing.sm,
    fontWeight: "600",
    fontSize: 16,
  },

  inputContainer: {
    position: "relative",
    // marginBottom: spacing.md,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 40,
  },

  inputWithToggle: {
    paddingRight: 110,
  },

  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
  },

  toggleButton: {
    position: "absolute",
    right: spacing.sm,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
