import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import HomeScreen, { HomeScreenName } from "./src/screens/HomeScreen";
import LoginScreen, { LoginScreenName } from "./src/screens/LoginScreen";
import ProfileScreen, { ProfileScreenName } from "./src/screens/ProfileScreen";
import {
  RootDrawerContent,
  RootScreenList,
} from "./src/screens/RootScreensManager";
import SignupScreen, { SignupScreenName } from "./src/screens/SignupScreen";
import UploadTestScreen, {
  UploadTestName,
} from "./src/screens/UploadTestScreen";
import { serverBaseUrl } from "./src/utils/constants";
import { nameToNavIcon } from "./src/utils/ReactNavigationUtils";

const uri = `${serverBaseUrl}/graphql`;
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

const Drawer = createDrawerNavigator<RootScreenList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={LoginScreenName}
        backBehavior="history"
        drawerContent={(props) => (
          <RootDrawerContent
            {...props}
            drawerOmissions={[LoginScreenName, SignupScreenName]}
            defaultIcon={nameToNavIcon("chevron-right")}
          />
        )}
        screenOptions={{
          headerStyle: tw`bg-purple-500`,
          headerTitleStyle: tw`text-white`,
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen
          name={HomeScreenName}
          component={HomeScreen}
          options={{
            title: "Welcome",
            drawerIcon: nameToNavIcon("home"),
          }}
        />
        <Drawer.Screen
          name={ProfileScreenName}
          component={ProfileScreen}
          options={{
            drawerIcon: nameToNavIcon("account-circle"),
          }}
        />
        <Drawer.Screen
          name={UploadTestName}
          component={UploadTestScreen}
          options={{
            drawerIcon: nameToNavIcon("file-upload"),
          }}
        />
        {/* IMPORTANT NOTE: always keep the drawer omissions last in the drawer order!*/}
        <Drawer.Screen
          name={LoginScreenName}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name={SignupScreenName}
          component={SignupScreen}
          options={{
            headerShown: true,
            header: ({ navigation }) => {
              return (
                <Header
                  leftComponent={
                    <Button
                      icon={<Icon name="chevron-left" color="white" />}
                      title="Back"
                      onPress={() => {
                        navigation.navigate(LoginScreenName);
                      }}
                    />
                  }
                  backgroundColor="#8B5CF6"
                />
              );
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
