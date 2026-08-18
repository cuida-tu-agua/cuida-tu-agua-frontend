import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, spacing, typography } from "@theme/index";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  errorMessage?: string;
};

export default function StratumSelectField({
  label,
  value,
  onChange,
  options,
  errorMessage,
}: Props) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { colors } = useTheme();

  const selectedValue = value || options[0] || "";

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text> : null}

      <TouchableOpacity
        style={[
          styles.selector,
          {
            borderColor: errorMessage ? colors.error : colors.primary,
            backgroundColor: colors.surface,
          },
        ]}
        onPress={() => setIsPickerVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectorText, { color: colors.textPrimary }]}> 
          {selectedValue}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.primary} />
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{errorMessage}</Text>
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
          <Text style={[styles.modalTitle, { color: colors.primary }]}>Selecciona un estrato</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { borderColor: colors.border }]}
                activeOpacity={0.7}
                onPress={() => {
                  onChange(item);
                  setIsPickerVisible(false);
                }}
              >
                <Text style={[styles.optionText, { color: colors.textPrimary }]}> {item}</Text>
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
  selector: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorText: {
    ...typography.body,
    fontWeight: "500",
  },
  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
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
