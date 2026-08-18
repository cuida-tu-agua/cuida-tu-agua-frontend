import React from "react";
import { useResponsive } from "@hooks/useResponsive";

import SidebarLayout from "@components/navigation/SidebarLayout";
import BottomTabsLayout from "@components/navigation/BottomTabsLayout";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createStyles } from "./DashboardScreen.styles";
import { useTheme, colors } from "@theme/index";
import { useTranslation } from "react-i18next";

interface DashboardScreenProps {
  onSignOut: () => void;
}

export default function DashboardScreen({ onSignOut }: DashboardScreenProps) {
  const { isMobile } = useResponsive();
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const styles = createStyles(colors);
  const userName = "Diego Pérez";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={["top"]}>
      {isMobile ? (
        <>
          <View style={{backgroundColor: colors.surface }}>
            <View style={styles.expandedHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>DP</Text>
              </View>
              <Text style={styles.userNameExpanded}>{userName}</Text>
            </View>
          </View>
          <BottomTabsLayout />
        </>
      ) : (
        <SidebarLayout onSignOut={onSignOut} userName={userName} />
      )}
    </SafeAreaView>
  );
}
