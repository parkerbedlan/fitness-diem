import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/components/RootNavigator";
import { serverBaseUrl } from "./src/utils/constants";
import { RootScreenList } from "./src/utils/types/navigationTypes";

const uri = `${serverBaseUrl}/graphql`;
const link = createUploadLink({ uri });
const client = new ApolloClient({
  uri,
  credentials: "include",
  cache: new InMemoryCache(),
  link,
});

const Drawer = createDrawerNavigator<RootScreenList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigator Drawer={Drawer} />
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
