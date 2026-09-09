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
        transparent
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.dropdownMenu,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <FlatList
                  data={options}
                  renderItem={({ item }) => {
                    const isSelected = item === value;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.option,
                          { borderColor: colors.border },
                          isSelected && { backgroundColor: "rgba(255,255,255,0.05)" },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => {
                          onChange(item);
                          setIsPickerVisible(false);
                        }}
                      >
                        <View style={styles.optionContent}>
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color={colors.primary}
                            style={{
                              marginRight: spacing.sm,
                              opacity: isSelected ? 1 : 0, // Se oculta si no está seleccionado
                            }}
                          />
                          <Text
                            style={[
                              styles.optionText,
                              { color: colors.textPrimary },
                              isSelected && {
                                fontWeight: "600",
                                color: colors.primary,
                              },
                            ]}
                          >
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    // Fondo oscuro traslúcido
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  // Ventana flotante estilo Menú (Dropdown)
  dropdownMenu: {
    width: "100%",
    maxWidth: 480,
    maxHeight: 380,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: "hidden",
  },
    optionContent: {
    flexDirection: "row",
    alignItems: "center",
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
