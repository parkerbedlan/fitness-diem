import React, { useEffect } from "react";
import { Button, Text } from "react-native-elements";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
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
  const [{ data: meData, fetching: meFetching }, getMe] = useMeQuery();
  const [, logout] = useLogoutMutation();

  return (
    <CenteredContainer>
      <Button
        title="me refresh"
        onPress={() => {
          getMe();
        }}
      />
      <Text h1>This is the Home Screen.</Text>
      {meFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {meData?.me?.username}</Text>
      )}
      <Button
        onPress={async () => {
          await logout();
          // TODO: useIsAuth, so manual navigation to login screen is no longer necessary
          navigation.navigate(LoginScreenName);
        }}
        title="Log out"
      />
    </CenteredContainer>
  );
}

export default withUrqlClient(createUrqlClient)(HomeScreen);
