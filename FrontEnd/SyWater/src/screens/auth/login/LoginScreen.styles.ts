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


    container: {
      flex: 1,
      justifyContent: "center",
    },

    webContainer: {
      marginTop: spacing.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: 1200,
      alignSelf: "center",
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: 40,
      minHeight: 420,
      maxHeight: 625,
    },

    formSection: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      justifyContent: "space-between",
    },

    webForm: {
      flex: 1,
      maxWidth: 540,
      minWidth: 320,
      marginRight: spacing.lg,
      flexShrink: 1,
    },

    mobileForm: {
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    },

    logoContainer: {
      alignItems: "center",
      marginBottom: spacing.xxl,
    },

    logoTitle: {
      ...typography.title,
      color: colors.textPrimary,
      textAlign: "center",
      marginTop: spacing.md,
    },

    mobileFormFields: {
      marginTop: spacing.xl,
    },


    webAuthLink: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.md,
      marginRight: spacing.md,
    },

    rightPanel: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      height: "100%",
      maxWidth: 520,
      minWidth: 300,
      marginLeft: spacing.xl,
    },

    carouselRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },

    carouselItem: {
      alignItems: "center",
      justifyContent: "center",
    },

    imageContainer: {
      width: "100%",
      alignItems: "center",
    },

    leftArrow: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.grayLight,
      borderRadius: 20,
      marginRight: spacing.xs,
    },

    rightArrow: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.grayLight,
      borderRadius: 20,
      marginLeft: spacing.xs,
    },

    arrowText: {
      marginBottom: spacing.xs,
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
    },

    carouselImage: {
      width: "100%",
      maxWidth: 420,
      height: 280,
      borderRadius: 20,
    },

    carouselTitle: {
      ...typography.subtitle,
      marginTop: spacing.md,
      color: colors.primary,
      textAlign: "center",
    },

    carouselDescription: {
      ...typography.body,
      marginTop: spacing.sm,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });
