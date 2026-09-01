import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/ThemeContext";
import { spacing } from "@theme/index";

export const createStyles = (colors: ThemeColors) => {

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 40,
      position: "relative",
    },

    backButton: {
      position: "absolute",
      top: spacing.md,
      left: spacing.md,
      zIndex: 10,
      padding: spacing.sm,
    },

    contentWrapper: {
      alignItems: "center",
      maxWidth: 500,
      width: "100%",
      marginTop: 20,
    },

    qrContainer: {
      width: 280,
      height: 280,
      backgroundColor: colors.surface,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 5,
      padding: 20,
    },

    qrImage: {
      width: "100%",
      height: "100%",
    },

    titleText: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 12,
      textAlign: "center",
    },

    descriptionText: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 8,
      textAlign: "center",
      lineHeight: 20,
    },

    highlightText: {
      fontSize: 14,
      color: colors.warning,
      fontWeight: "600",
      marginBottom: 24,
      textAlign: "center",
    },

    buttonsContainer: {
      width: "100%",
      gap: 12,
    },

    contactButton: {
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: colors.primary,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },

    contactButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textOnPrimary,
    },

    moreInfoButton: {
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: "transparent",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    moreInfoButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.primary,
    },

    infoBox: {
      width: "100%",
      marginTop: 24,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surfaceAlt,
      borderLeftWidth: 4,
      borderLeftColor: colors.info || colors.primary,
      borderRadius: 8,
    },

    infoBoxText: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 16,
    },
  });
};
