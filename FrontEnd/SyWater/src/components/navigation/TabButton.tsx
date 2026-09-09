import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@theme/index";


export default function TabButton({ label, active, onPress }: any) {
  const { colors } = useTheme();
  return (

    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 8,
      }}
    >
      <Text
        style={{
          color: active ? colors.primary : colors.textMuted,
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}