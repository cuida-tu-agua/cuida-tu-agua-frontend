import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";


import HomeScreen from "@screens/dashboard/layouts/HomeScreen";
import ProfileScreen from "@screens/dashboard/layouts/ProfileScreen";
import SettingsScreen from "@screens/dashboard/layouts/SettingsScreen";
import TabButton from "./TabButton";

export default function BottomTabsLayout() {
  const [tab, setTab] = useState("home");
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  return (
    <View style={{ flex: 1 }}>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        {tab === "home" && <HomeScreen />}
        {tab === "profile" && <ProfileScreen />}
        {tab === "settings" && <SettingsScreen />}
      </View>

      {/* BOTTOM BAR */}
      <View
        style={{
          height: 60,
          flexDirection: "row",
          backgroundColor: colors.surfaceAlt,
        }}
      >
        <TabButton label={t("drawer.home")} active={tab === "home"} onPress={() => setTab("home")} />
        <TabButton label={t("drawer.profile")} active={tab === "profile"} onPress={() => setTab("profile")} />
        <TabButton label={t("drawer.settings")} active={tab === "settings"} onPress={() => setTab("settings")} />
      </View>

    </View>
  );
}