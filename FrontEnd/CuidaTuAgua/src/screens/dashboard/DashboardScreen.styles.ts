// DashboardScreen.styles.ts

import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "@theme/ThemeContext";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // Estilos del Drawer
    expandedHeader: { 
      flexDirection: "row", 
      alignItems: "center", 
      padding: 20 
    },
    userNameExpanded: {
      color: colors.textPrimary,
      marginLeft: 15,
      fontWeight: "bold",
      fontSize: 18,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.success,
    },
    avatarText: { color: colors.textOnPrimary, fontWeight: "bold" },
  });
