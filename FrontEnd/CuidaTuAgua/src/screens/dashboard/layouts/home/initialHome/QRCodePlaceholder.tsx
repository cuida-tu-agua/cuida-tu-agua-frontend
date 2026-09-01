import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "@theme/index";

type QRCodePlaceholderProps = {
  value: string;
  size?: number;
};

export default function QRCodePlaceholder({
  value,
  size = 256,
}: QRCodePlaceholderProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <QRCode
        value={value}
        size={size}
        color={colors.textPrimary || "#000000"}
        backgroundColor={colors.surface || "#FFFFFF"}
        quietZone={10}
      />
    </View>
  );
}
