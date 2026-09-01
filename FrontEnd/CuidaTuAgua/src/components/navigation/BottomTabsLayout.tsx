import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";

import HomeScreen from "@screens/dashboard/layouts/home/HomeScreen";
import ProfileScreen from "@screens/dashboard/layouts/profile/ProfileScreen";
import SettingsScreen from "@screens/dashboard/layouts/settings/SettingsScreen";
import StatsScreen from "@screens/dashboard/layouts/home/statsHome/StatsScreen";
import InitialHome from "@screens/dashboard/layouts/home/initialHome/InitialHome";
import TabButton from "./TabButton";

export default function BottomTabsLayout() {
  const [tab, setTab] = useState("home");
  const [selectedHome, setSelectedHome] = useState<string | undefined>(undefined);
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  return (
    <View style={{ flex: 1 }}>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        {tab === "home" && (
          <HomeScreen
            onOpenStats={(homeId?: string) => {
              setSelectedHome(homeId);
              setTab("stats");
            }}
            onOpenInitialHome={(homeId?: string) => {
              setSelectedHome(homeId);
              setTab("initialHome");
            }}
          />
        )}
        {tab === "profile" && <ProfileScreen />}
        {tab === "settings" && <SettingsScreen />}
        {tab === "stats" && <StatsScreen onClose={() => setTab("home")} />}
        {tab === "initialHome" && (
          <InitialHome
            onClose={() => setTab("home")}
            onContactUs={() => {
              console.log("Contact us clicked from home:", selectedHome);
            }}
          />
        )}
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