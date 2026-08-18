import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/ThemeContext";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },

    descriptionLogo: {
      textAlign: "center",
      marginVertical: 20,
      color: colors.textMuted,
      fontSize: 30,
    },

    bodyContent: {
      flex: 1,
      paddingHorizontal: 10,
    },

    listContainer: {
      paddingBottom: 20,
    },

    card: {
      flex: 1,
      margin: 8,
      minHeight: 120,
      borderRadius: 12,
      backgroundColor: colors.surface,

      alignItems: "center",
      justifyContent: "center",

      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    addCard: {
      borderStyle: "dashed",
      borderWidth: 1.5,
      borderColor: colors.textMuted,
      backgroundColor: "transparent",
    },

    addIcon: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.textMuted,
      marginBottom: 6,
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
      textAlign: "center",
    },

    cardValue: {
      fontSize: 14,
      marginTop: 6,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });