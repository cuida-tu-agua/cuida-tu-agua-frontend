import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/ThemeContext";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingTop: 20,
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 30,
      paddingBottom: 120,
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.textPrimary,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: "center",
      marginBottom: 20,
      marginTop: 6,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,

      elevation: 0,
      shadowColor: "transparent",

      overflow: "visible",
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    cardDescription: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 4,
      marginBottom: 12,
    },

    languageFloating: {
      zIndex: 1,
      marginTop: -30,
      marginBottom: 20,
      backgroundColor: colors.surface,
      paddingLeft: 16,
      paddingBottom: 10,
      
      borderEndEndRadius: 14, 
      borderEndStartRadius: 14, 
    },

    themeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 8,
      
    },

    themeButton: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
      
    },

    themeButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    themeText: {
      fontSize: 13,
      color: colors.textPrimary,
    },

    themeTextActive: {
      color: colors.textOnPrimary,
      fontWeight: "600",
    },

    logoutButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.error,
      alignItems: "center",
      marginTop: 16,
      marginBottom: 20,
    },

    logoutButtonText: {
      color: colors.textOnPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
    fixedLogout: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 20,
      alignItems: "center",
    },

    fixedLogoutInner: {
      backgroundColor: colors.error,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      minWidth: 200,
      alignItems: "center",
    },

    fixedLogoutText: {
      color: colors.textOnPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
