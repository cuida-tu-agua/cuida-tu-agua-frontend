import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "@screens/LandingScreen";
import LoginScreen from "@screens/auth/login/LoginScreen";
import RegisterScreen from "@screens/auth/register/RegisterScreen";
import DashboardScreen from "@screens/dashboard/DashboardScreen";
import StatsScreen from "@screens/dashboard/StatsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Platform.OS === "web" ? "landing" : "login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* LANDING (solo web) */}
      <Stack.Screen
        name="landing"
        options={{ cardStyle: { height: "100vh" as any } }}
      >
        {({ navigation }) => (
          <LandingScreen onAccess={() => navigation.navigate("login")} />
        )}
      </Stack.Screen>

      {/* LOGIN (mobile default) */}
      <Stack.Screen name="login">
        {({ navigation }) => (
          <LoginScreen
            goToRegister={() => navigation.navigate("register")}
            onLoginSuccess={() => navigation.replace("dashboard")}
            goBack={() => navigation.navigate("landing")}
          />
        )}
      </Stack.Screen>
      
      {/* REGISTER */}
      <Stack.Screen name="register">
        {({ navigation }) => (
          <RegisterScreen
            goToLogin={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate("login")
            }
          />
        )}
      </Stack.Screen>

      {/* DASHBOARD */}
      <Stack.Screen name="dashboard">
        {({ navigation }) => (
          <DashboardScreen
            onSignOut={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "landing" }],
              })
            }
          />
        )}
      </Stack.Screen>

      {/* STATS */}
      <Stack.Screen name="stats" component={StatsScreen} 
      options={{ cardStyle: { height: "100vh" as any } }}/>
    </Stack.Navigator>
  );
}
