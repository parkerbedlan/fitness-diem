import React from "react";
import { Button, Text } from "react-native-elements";
import { useMeQuery } from "../generated/graphql";
import CenteredContainer from "../components/CenteredContainer";
import { LoginScreenName } from "./LoginScreen";
import { useRootScreen } from "./RootScreensManager";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { ActivityIndicator } from "react-native";

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen(HomeScreenName);
  const [{ data, fetching }] = useMeQuery();

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      {fetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {data?.me?.username}</Text>
      )}
      <Button
        onPress={() => navigation.navigate(LoginScreenName)}
        title="Log out"
      />
    </CenteredContainer>
  );
}

export default withUrqlClient(createUrqlClient)(HomeScreen);
