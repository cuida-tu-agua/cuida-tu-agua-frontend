import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Linking, Alert } from "react-native";
import { useTheme, spacing, typography } from "@theme/index";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive } from "@hooks/useResponsive";

import Logo from "./Logo";

const Footer = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("footer");
  const { isMobile } = useResponsive();

  const openSocialLink = async (url?: string) => {
    if (!url) {
      return;
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir la URL.");
    }
  };

  const section1Items = ["info1", "info2", "info3", "info4"];
  const section2Items = ["mail", "phone", "address"];
  const section2Info = ["email", "number", "location"];

  const socialIcons = [
    { name: "logo-facebook", key: "fb" , URL: 'https://web.facebook.com/diegoalejandro.alvarado.3133/?locale=es_LA'},
    { name: "logo-instagram", key: "ig", URL: 'https://www.instagram.com/daac_21x/'},
    { name: "logo-x", key: "x" },
    { name: "logo-linkedin", key: "li" },
  ];

  return (
    <View style={{ backgroundColor: colors.surfaceAlt, paddingVertical: spacing.lg, alignItems: "center" }}>
      <View style={[styles.safeArea, { flexDirection: isMobile ? "column" : "row" }]}>
        <View style={[styles.container, isMobile && styles.mobileContainer]}>
          <Logo />

          <View style={{ marginVertical: spacing.sm }}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {" "}
              {t("title")}{" "}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              {" "}
              {t("subtitle")}{" "}
            </Text>
          </View>

          <Text style={[styles.contentText, { color: colors.textMuted }]}>
            {t("description")}{" "}
          </Text>

          <View style={styles.mediaIcons}>
            {socialIcons.map((icon) => (
              <View
                key={icon.key}
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.surfaceAlt },
                ]}
              >
                <Ionicons
                  onPress={() => openSocialLink(icon.URL)}
                  name={icon.name as any}
                  size={28}
                  color={colors.primary}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.container, isMobile && styles.mobileContainer]}>
          <Text style={[styles.minTitle, { color: colors.textPrimary }]}>
            {t("section1.title")}
          </Text>
          <View style={[ {marginTop: spacing.xs}, isMobile && { maxWidth:'90%'} ]}>
            {section1Items.map((itemKey) => (
              <View key={itemKey} style={styles.listItem}>
                <Text style={[styles.bullet, { color: colors.textSecondary }]}>
                  •
                </Text>
                <Text
                  style={[styles.contentText, { color: colors.textSecondary }]}
                >
                  {t(`section1.${itemKey}`)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.container, isMobile && styles.mobileContainer]}>
          <Text style={[styles.minTitle, { color: colors.textPrimary }]}>
            {t("section2.title")}
          </Text>
          <View style={{ marginTop: spacing.xs }}>
            {section2Items.map((itemKey) => (
              <View key={itemKey} style={styles.listItem}>
                <Text style={[styles.bullet, { color: colors.textSecondary }]}>
                  •
                </Text>
                <Text
                  style={[
                    styles.contentText,
                    { color: colors.textSecondary, fontWeight: "600" as const },
                  ]}
                >
                  {t(`section2.${itemKey}`)}
                </Text>
                <Text style={[{ color: colors.textSecondary }]}>
                  {t(
                    `section2.${section2Info[section2Items.indexOf(itemKey)]}`,
                  )}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View>
        <Text style={[styles.copyright, { color: colors.textMuted, textAlign: "center" }]}
        >
          {t("copyright")}
        </Text>
      </View>
    </View>
  );
};
export default Footer;

const styles = StyleSheet.create({
  safeArea: {
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    alignContent: "space-between",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: spacing.md,
    minWidth: 0,
  },
  mobileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
  },
  title: {
    ...typography.subtitle,
    fontWeight: "800" as const,
  },
  subtitle: {
    ...typography.small,
  },
  contentText: {
    ...typography.body,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,

  },
  minTitle: {
    ...typography.body,
    fontWeight: "700" as const,
    margin: spacing.md,
    marginHorizontal: 0,
    width: "100%",
    marginTop: spacing.lg,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
    width: "100%",
  },
  bullet: {
    fontSize: 18,
    lineHeight: 22,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },

  mediaIcons: {
    flexDirection: "row",
    margin: spacing.md,
    marginHorizontal: 0,
    width: "100%",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  copyright: {
    textAlign: 'center',   
    fontSize: 12,
    paddingVertical: 20,
    width: "100%",
  },
});
