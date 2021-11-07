import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { updateLogout } from "../utils/GraphQLUtils";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const { data: meData, loading: meFetching } = useMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      {meFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {meData?.me?.username}</Text>
      )}
      <Button
        onPress={() => {
          logout({
            update: updateLogout,
          });
        }}
        title="Log out"
      />
    </CenteredContainer>
  );
}

export default HomeScreen;
