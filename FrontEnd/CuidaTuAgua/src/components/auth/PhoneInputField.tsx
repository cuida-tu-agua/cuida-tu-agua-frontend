import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, spacing, typography } from "@theme/index";

type CountryCodeItem = {
  label: string;
  code: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
};

const countryCodes: CountryCodeItem[] = [
  { label: "Colombia", code: "+57" },
  { label: "Ecuador", code: "+593" },
  { label: "Estados Unidos", code: "+1" },
];

export default function PhoneInputField({
  label,
  placeholder,
  countryCode,
  onCountryCodeChange,
  value,
  onChangeText,
  errorMessage,
}: Props) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { colors } = useTheme();

  const selectedCode = countryCodes.find((item) => item.code === countryCode) || countryCodes[0];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.codeButton, { borderColor: colors.primary, backgroundColor: colors.surface }]}
          onPress={() => setIsPickerVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.codeText, { color: colors.textPrimary }]}>{selectedCode.code}</Text>
          <Ionicons name="chevron-down" size={18} color={colors.primary} />
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.grayMedium}
          keyboardType="phone-pad"
          style={[
            styles.input,
            {
              borderColor: colors.primary,
              color: colors.textPrimary,
              backgroundColor: colors.surface,
            },
          ]}
          autoComplete="tel"
        />
      </View>

      {errorMessage ? (
        <Text style={[styles.errorText, { color: colors.error }]}> 
          {errorMessage}
        </Text>
      ) : null}

      <Modal
        visible={isPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.modalTitle, { color: colors.primary }]}>Selecciona indicador</Text>
          <FlatList
            data={countryCodes}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={() => {
                  onCountryCodeChange(item.code);
                  setIsPickerVisible(false);
                }}
              >
                <Text style={[styles.optionText, { color: colors.textPrimary }]}> {item.label} {item.code}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  codeButton: {
    minWidth: 96,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  codeText: {
    ...typography.body,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 40,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalContainer: {
    maxHeight: "45%",
    marginHorizontal: spacing.md,
    borderRadius: 16,
    overflow: "hidden",
  },
  modalTitle: {
    ...typography.subtitle,
    fontSize: 18,
    fontWeight: "600",
    padding: spacing.md,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  optionText: {
    ...typography.body,
  },
});
