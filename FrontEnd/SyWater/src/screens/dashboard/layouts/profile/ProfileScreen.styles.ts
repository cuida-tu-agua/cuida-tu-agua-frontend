import { StyleSheet } from "react-native";
import { ThemeColors } from "@theme/ThemeContext";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingTop: 20,
      paddingHorizontal: 30,
      paddingBottom: 120,
      width: "100%",
    },

    /* HEADER */
    headerCard: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      marginBottom: 16,
    },

    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },

    avatarText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "700",
    },

    userName: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },

    userEmail: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 13,
      marginTop: 4,
    },

    /* INFO CARD */
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingTop: 20,
      paddingHorizontal: 16,
      paddingBottom: 30,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 12,
    },

    label: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 12,
    },

    value: {
      fontSize: 15,
      color: colors.textPrimary,
      marginTop: 4,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.textMuted,
      borderRadius: 8,
      padding: 10,
      marginTop: 6,
      color: colors.textPrimary,
    },

    /* BUTTON */
    buttonContainer: {
      marginTop: 16,
      alignItems: "center",
      
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      minWidth: 200,
      alignItems: "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
    fixedButton: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 20,
      alignItems: "center",
    },

    fixedButtonInner: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      minWidth: 200,
      alignItems: "center",
    },

    fixedButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
  });