import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "@navigation/AppNavigator";
import { ThemeProvider } from "@theme/ThemeContext";

const linking = {
  prefixes: [],
  config: {
    screens: {
      landing: "",
      login: "login",
      register: "register",
      dashboard: "dashboard",
      stats: "stats",
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}