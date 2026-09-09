import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";

interface SidebarProps {
  tab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
  onClose: () => void;
}

export default function Sidebar({ tab, onTabChange, onSignOut, onClose }: SidebarProps) {
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const navItems = [
    { label: t("drawer.home"), value: "home" },
    { label: t("drawer.profile"), value: "profile" },
    { label: t("drawer.settings"), value: "settings" },
  ];

  return (
    <View
      style={{
        width: 280,
        backgroundColor: colors.surfaceAlt,
        height: Platform.OS === "web" ? ("100vh" as any) : "100%",
        justifyContent: "space-between",
      }}
    >
      <View>
        {/* CLOSE BUTTON - misma posicion/tamaño que el boton de hamburguesa del header */}
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: colors.textPrimary,
                fontWeight: "bold",
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {/* LOGO */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Logo />
          </View>

          {/* NAV ITEMS */}
          <View style={{ gap: 12 }}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => onTabChange(item.value)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: tab === item.value ? colors.primary : "transparent",
                }}
              >
                <Text
                  style={{
                    color: tab === item.value ? colors.textOnPrimary : colors.textPrimary,
                    fontSize: 16,
                    fontWeight: tab === item.value ? "600" : "400",
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        onPress={onSignOut}
        style={{
          marginHorizontal: 16,
          marginBottom: 16,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: colors.error,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.textOnPrimary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {t("drawer.logout")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
