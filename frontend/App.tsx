import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import LoginScreen, { LoginScreenName } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen, { HomeScreenName } from "./src/screens/HomeScreen";
import SignupScreen, { SignupScreenName } from "./src/screens/SignupScreen";
import { RootScreenList } from "./src/screens/RootScreensManager";
import RegimenLibraryScreen, {
  RegimenLibraryScreenName,
} from "./src/screens/RegimenLibraryScreen";
import MyRoutinesScreen, {
  MyRegimenScreenName,
} from "./src/screens/MyRegimensScreen";
import FitnessDiumRoutinesScreen, {
  FitnessDiumRoutinesScreenName,
} from "./src/screens/FitnessDiumRoutinesScreen";

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
          name={RegimenLibraryScreenName}
          component={RegimenLibraryScreen}
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
        <Stack.Screen name={MyRegimenScreenName} component={MyRoutinesScreen} />
        <Stack.Screen
          name={FitnessDiumRoutinesScreenName}
          component={FitnessDiumRoutinesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
