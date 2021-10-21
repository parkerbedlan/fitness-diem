import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./src/screens/SignupScreen";
import { RootScreenList } from "./src/screens/RootScreensManager";
import DrawerMenu from "./src/components/DrawerMenu";





const Stack = createNativeStackNavigator<RootScreenList>();

const MainStack = () => {
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
          component={DrawerMenu}
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




export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainStack/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}