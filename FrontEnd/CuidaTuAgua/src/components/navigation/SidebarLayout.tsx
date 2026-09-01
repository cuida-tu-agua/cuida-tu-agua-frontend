import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Sidebar from "./Sidebar";
import HomeScreen from "@screens/dashboard/layouts/home/HomeScreen";
import ProfileScreen from "@screens/dashboard/layouts/profile/ProfileScreen";
import SettingsScreen from "@screens/dashboard/layouts/settings/SettingsScreen";
import StatsScreen from "@screens/dashboard/layouts/home/statsHome/StatsScreen";
import InitialHome from "@screens/dashboard/layouts/home/initialHome/InitialHome";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState<string | undefined>(undefined);
  const { colors } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    closeSidebar();
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={{ flex: 1, flexDirection: "column", minHeight: 0 }}>
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
              ☰
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
                // Callback opcional para contacto
                console.log("Contact us clicked from home:", selectedHome);
              }}
            />
          )}
        </View>
      </View>

      {/* BACKDROP - oscurece el contenido sin achicarlo, clic afuera cierra */}
      {sidebarOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeSidebar}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <View style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}>
          <Sidebar
            tab={tab}
            onTabChange={handleTabChange}
            onSignOut={safeOnSignOut}
            onClose={closeSidebar}
          />
        </View>
      )}
    </View>
  );
}