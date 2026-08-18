import React, { useState } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import Sidebar from "./Sidebar";
import HomeScreen from "@screens/dashboard/layouts/HomeScreen";
import ProfileScreen from "@screens/dashboard/layouts/ProfileScreen";
import SettingsScreen from "@screens/dashboard/layouts/SettingsScreen";
import StatsScreen from "@screens/dashboard/StatsScreen";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@theme/index";

interface SidebarLayoutProps {
  onSignOut?: () => void;
  userName?: string;
}

export default function SidebarLayout({ onSignOut, userName = "User" }: SidebarLayoutProps) {
  const safeOnSignOut = onSignOut ?? (() => {});
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedHome, setSelectedHome] = useState<string | undefined>(undefined);
  const { colors } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {sidebarOpen && (
        <Sidebar 
          tab={tab} 
          onTabChange={setTab} 
          onSignOut={safeOnSignOut}
        />
      )}

      <View style={{ flex: 1, flexDirection: "column", minHeight: 0, ...(Platform.OS === "web" ? { height: "100vh" } : {}) }}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={toggleSidebar}
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
              {sidebarOpen ? "✕" : "☰"}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {userName}
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: colors.success,
              }}
            >
              <Text
                style={{
                  color: colors.textOnPrimary,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, minHeight: 0 }}>
          {tab === "home" && (
            <HomeScreen
              onOpenStats={(homeId?: string) => {
                setSelectedHome(homeId);
                setTab("stats");
              }}
            />
          )}
          {tab === "profile" && <ProfileScreen />}
          {tab === "settings" && <SettingsScreen />}
          {tab === "stats" && <StatsScreen onClose={() => setTab("home")} />}
        </View>
      </View>
      
    </View>
  );
}