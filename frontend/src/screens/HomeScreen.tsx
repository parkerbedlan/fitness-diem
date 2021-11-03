import React from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "./RootScreensManager";

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen(HomeScreenName);
  useIsAuth(navigation);
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
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: null,
                },
              });
            },
          });
        }}
        title="Log out"
      />
    </CenteredContainer>
  );
}

export default HomeScreen;
