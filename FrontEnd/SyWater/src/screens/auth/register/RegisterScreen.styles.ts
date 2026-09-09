import { StyleSheet } from "react-native";
import { ThemeColors, spacing, typography } from "@theme/index";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    safeAreaMobile: {
      backgroundColor: colors.background,
      flex: 1,
    },

    wrapper: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      maxWidth: 1600,
    },

    page: {
      flex: 1,
    },

    pageWeb: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: spacing.xl,
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xl,
      backgroundColor: colors.background,
    },

    container: {
      width: "100%",
      maxWidth: 520,
      minWidth: 340,
      flexShrink: 1,
      paddingHorizontal: spacing.lg,
    },

    containerWeb: {
      marginTop: -spacing.xl,
      maxHeight: 500,
    },

    containerMobile: {
      minWidth: 0,
      maxWidth: "100%",
      paddingHorizontal: spacing.md,
      marginTop: 0,
    },

    card: {
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: 30,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.06)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      marginTop: spacing.xs,
      shadowOpacity: 0.08,
      shadowRadius: 28,
      elevation: 8,
      justifyContent: "flex-start",
      alignSelf: "flex-start",
    },

    cardMobile: {
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },

    cardScrollWrapper: {
      flex: 1,
      maxHeight: "100%",
    },

    cardScrollContent: {
      flexGrow: 1,
      paddingBottom: spacing.lg,
    },

    cardBottom: {
      marginTop: spacing.lg,
    },

    header: {
      backgroundColor: colors.background,
      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.05)",
    },
    headerWeb: {
      padding: spacing.md,
    },

    backButton: {
      padding: spacing.sm,
      marginRight: spacing.md,
    },

    title: {
      ...typography.title,
      color: colors.textSecondary,

      fontSize: 32,
      fontWeight: "700",
      letterSpacing: 0.5,
    },

    section: {
      ...typography.subtitle,
      color: colors.primary,

      fontSize: 20,
      fontWeight: "600",

      marginBottom: spacing.lg,
    },

    sectionWeb: {
      marginBottom: spacing.xl,
    },

    footer: {
      backgroundColor: colors.background,

      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,

      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.05)",
    },
    footerWeb: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
