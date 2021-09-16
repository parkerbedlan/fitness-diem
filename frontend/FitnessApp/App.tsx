import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeProvider,
  Button,
  Input,
  Text,
  Icon,
} from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { Formik } from "formik";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Log in" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignupScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
