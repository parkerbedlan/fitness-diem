import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createUploadLink } from "apollo-upload-client";
import React, { useEffect } from "react";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCacheyUriStore } from "./src/utils/hooks/cacheyImage/useCacheyUriStore";
import { RootNavigator } from "./src/components/RootNavigator";
import { serverBaseUrl } from "./src/utils/constants";
import { RootScreenList } from "./src/utils/types/navigationTypes";
import { registerForPushNotificationsAsync } from "./src/utils/registerForPushNotificationsAsync";

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
  const revalidateAllCacheyUris = useCacheyUriStore(
    (state) => state.revalidateAll
  );
  useEffect(() => {
    revalidateAllCacheyUris();
    registerForPushNotificationsAsync();
  }, []);

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
