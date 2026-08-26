import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";



import { useNavigation } from "@react-navigation/native";

import { useTheme } from "@theme/ThemeContext";

import { createStyles } from "./SettingsScreen.styles";

import { useResponsive } from "@hooks/useResponsive";

import LanguageSelector from "@components/common/LenguageSelector";
import FeedbackModal from "@components/common/FeedbackModal";
import { useTranslation } from "react-i18next";

type ThemeOption =
  | "light"
  | "dark"
  | "ecoLight"
  | "ecoDark";

export default function SettingsScreen() {

  const navigation = useNavigation<any>();

  const { isMobile } = useResponsive();

  const {
    colors,
    themeType,
    setThemeType,
    mode,
    setThemeMode,
  } = useTheme();

  const styles = createStyles(colors);
  const { t } = useTranslation("settings");

  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(
    `${themeType}${mode === "dark" ? "Dark" : "Light"}` as ThemeOption,
  );

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // THEME
  const handleThemeChange = (
    option: ThemeOption,
  ) => {

    setSelectedTheme(option);

    if (option === "light") {
      setThemeType("standard");
      setThemeMode("light");
    }

    if (option === "dark") {
      setThemeType("standard");
      setThemeMode("dark");
    }

    if (option === "ecoLight") {
      setThemeType("eco");
      setThemeMode("light");
    }

    if (option === "ecoDark") {
      setThemeType("eco");
      setThemeMode("dark");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    const targetRoute =
      Platform.OS === "web"
        ? "landing"
        : "login";

    setLogoutModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [
        { name: targetRoute },
      ],
    });
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>
        {t('title')}
      </Text>

      <Text style={styles.subtitle}>
        {t('subtitle')}
      </Text>

      {/* IDIOMA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {t('language.title')}
        </Text>

        <Text style={styles.cardDescription}>
          {t('language.description')}
        </Text>
      </View>

      <View style={styles.languageFloating}>
        <LanguageSelector />
      </View>

      {/* TEMA */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          {t('theme.title')}
        </Text>

        <Text style={styles.cardDescription}>
          {t('theme.description')}
        </Text>

        <View style={styles.themeGrid}>

          {[
            { key: "light", label: t("theme.light") },
            { key: "dark", label: t("theme.dark") },
            { key: "ecoLight", label: t("theme.ecoLight") },
            { key: "ecoDark", label: t("theme.ecoDark") },
          ].map((item) => {

            const active =
              selectedTheme === item.key;

            return (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.themeButton,
                  active &&
                    styles.themeButtonActive,
                ]}
                onPress={() =>
                  handleThemeChange(
                    item.key as ThemeOption,
                  )
                }
              >
                <Text
                  style={[
                    styles.themeText,
                    active &&
                      styles.themeTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}

        </View>
      </View>

      {/* LOGOUT (fixed on mobile) */}
      {isMobile && (
        <></>
      )}

      <FeedbackModal
        visible={logoutModalVisible}
        title={t("logout.title") ?? ""}
        message={t("logout.confirm") ?? ""}
        type="error"
        secondaryButtonText={t("logout.cancel") ?? ""}
        onClose={handleCancelLogout}
        onSecondaryPress={handleConfirmLogout}
      />

      {isMobile && (
        <View style={styles.fixedLogout} pointerEvents="box-none">
          <TouchableOpacity style={styles.fixedLogoutInner} onPress={handleLogout}>
            <Text style={styles.fixedLogoutText}>{t("logout.title")}</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}