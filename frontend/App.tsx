import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import LoginScreen, { LoginScreenName } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen, { HomeScreenName } from "./src/screens/HomeScreen";
import SignupScreen, { SignupScreenName } from "./src/screens/SignupScreen";
import { RootScreenList } from "./src/screens/RootScreensManager";
import UploadTestScreen, {
  UploadTestName,
} from "./src/screens/UploadTestScreen";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Constants from "expo-constants";

const { manifest } = Constants;
const ipAddress = manifest?.debuggerHost?.split(":")[0];
const uri = `http://${ipAddress}:4000/graphql`;
// const uri = "https://fitness-api.sloper.us/graphql";

const Stack = createNativeStackNavigator<RootScreenList>();

const link = createUploadLink({ uri });

const client = new ApolloClient({
  uri,
  credentials: "include",
  cache: new InMemoryCache(),
  link,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Navigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
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
        <Stack.Screen name={UploadTestName} component={UploadTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
