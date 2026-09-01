import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TabButton from "@components/navigation/TabButton";

import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResponsive } from "@hooks/useResponsive";

type Props = {
  onClose?: () => void;
};

export default function StatsScreen({ onClose }: Props) {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const { isMobile } = useResponsive();

  const stats = [
    {
      title: t("stats.monthlyConsumption"),
      value: "12.450 L",
      icon: "water-outline",
      color: "#3B82F6",
    },
    {
      title: t("stats.estimatedSavings"),
      value: "32%",
      icon: "leaf-outline",
      color: "#10B981",
    },
    {
      title: t("stats.goalAchieved"),
      value: "85%",
      icon: "trophy-outline",
      color: "#F59E0B",
    },
    {
      title: t("stats.dailyAverage"),
      value: "415 L",
      icon: "analytics-outline",
      color: "#8B5CF6",
    },
  ];

  const history = [
    { month: t("stats.january"), value: "13.200 L" },
    { month: t("stats.february"), value: "12.900 L" },
    { month: t("stats.march"), value: "12.450 L" },
    { month: t("stats.april"), value: "11.980 L" },
  ];
  // On web, allow the ScrollView to manage overflow and grow to available space
  const webOverflowStyle = Platform.OS === "web" ? { overflow: "auto" as any } : {};

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <View style={{ flex: 1, minHeight: 0, position: "relative" as any }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.background,
            ...webOverflowStyle,
            maxHeight: "100%",
          }}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: isMobile ? 100 : 40,
            // Let content determine height so ScrollView can overflow
            flexGrow: 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
        {/* BACK BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (onClose) return onClose();
            return navigation.goBack();
          }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            backgroundColor: colors.surface,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 24,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.08,
            shadowRadius: 8,

            elevation: 3,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        {/* HEADER */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: colors.textPrimary,
            }}
          >
            {t("stats.title")}
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 15,
              color: colors.textSecondary,
            }}
          >
            {t("stats.subtitle")}
          </Text>
        </View>

        {/* STATS GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {stats.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              style={{
                width: "48%",
                backgroundColor: colors.surface,
                borderRadius: 24,
                padding: 18,
                marginBottom: 16,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.08,
                shadowRadius: 10,

                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: `${item.color}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={item.color}
                />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: colors.textPrimary,
                }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PERFORMANCE CARD */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 28,
            padding: 24,
            marginTop: 12,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.08,
            shadowRadius: 10,

            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Ionicons name="trending-down-outline" size={26} color="#10B981" />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "700",
                color: colors.textPrimary,
              }}
            >
              {t("stats.performanceTitle")}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: colors.textSecondary,
            }}
          >
            {t("stats.performanceDescription")}
          </Text>

          {/* Progress */}
          <View
            style={{
              marginTop: 22,
            }}
          >
            <View
              style={{
                height: 12,
                width: "100%",
                backgroundColor: "#E5E7EB",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "85%",
                  height: "100%",
                  backgroundColor: "#10B981",
                  borderRadius: 999,
                }}
              />
            </View>

            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                color: colors.textSecondary,
              }}
            >
              {t("stats.progressText")}
            </Text>
          </View>
        </View>

        {/* HISTORIAL */}
        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: colors.textPrimary,
              marginBottom: 18,
            }}
          >
            {t("stats.historyTitle")}
          </Text>

          {history.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: colors.surface,
                borderRadius: 20,
                padding: 18,
                marginBottom: 14,

                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.05,
                shadowRadius: 8,

                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    backgroundColor: "#DBEAFE",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                  }}
                >
                  <Ionicons name="water" size={22} color="#2563EB" />
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.textPrimary,
                  }}
                >
                  {item.month}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#2563EB",
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        </ScrollView>
          {/* MOBILE TABBAR - fixed at bottom */}
          {isMobile && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 60,
                flexDirection: "row",
                backgroundColor: colors.surfaceAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                overflow: "hidden",
              }}
            >
              <TabButton label={t("drawer.home")} active={false} onPress={() => navigation.navigate("dashboard")} />
              <TabButton label={t("drawer.profile")} active={false} onPress={() => navigation.navigate("dashboard")} />
              <TabButton label={t("drawer.settings")} active={false} onPress={() => navigation.navigate("dashboard")} />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
}
