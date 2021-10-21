import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import LoginScreen, { LoginScreenName } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen, { HomeScreenName } from "./src/screens/HomeScreen";
import SignupScreen, { SignupScreenName } from "./src/screens/SignupScreen";
import { RootScreenList } from "./src/screens/RootScreensManager";
import RoutineLibraryScreen, {
  RoutineLibraryScreenName,
} from "./src/screens/RoutineLibraryScreen";

const Stack = createNativeStackNavigator<RootScreenList>();

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
        <Stack.Screen
          name={RoutineLibraryScreenName}
          component={RoutineLibraryScreen}
          options={{ headerShown: true, title: "Routine Library" }}
        />
        <Stack.Screen name={LoginScreenName} component={LoginScreen} />
        <Stack.Screen
          name={HomeScreenName}
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name={SignupScreenName}
          component={SignupScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
