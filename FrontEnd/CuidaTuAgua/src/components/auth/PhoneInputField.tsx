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
  value: string;
  onChangeText: (text: string) => void;
  onChangeCountryCode: (code: string) => void;
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
  value,
  onChangeText,
  onChangeCountryCode,
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
          style={[styles.selector, { borderColor: colors.primary, backgroundColor: colors.surface }]}
          onPress={() => setIsPickerVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.selectorText, { color: colors.textPrimary }]}>{selectedCode.code}</Text>
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
                     data={countryCodes}
                     keyExtractor={(item) => item.code}
                     renderItem={({ item }) => {
                       const isSelected = item.label === value;
                       return (
                         <TouchableOpacity
                           style={[
                             styles.option,
                             { borderColor: colors.border },
                             isSelected && { backgroundColor: "rgba(255,255,255,0.05)" },
                           ]}
                           activeOpacity={0.7}
                           onPress={() => {
                            onChangeCountryCode(item.code);
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
                               {item.label} ({item.code})
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  selector: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorText: {
    ...typography.body,
    fontWeight: "500",
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
    fontSize: 12,
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
    maxWidth: 320,
    maxHeight: 280,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: "hidden",
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    ...typography.body,
    fontSize: 15,
  },
});
