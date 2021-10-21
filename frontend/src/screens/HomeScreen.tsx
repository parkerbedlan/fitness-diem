import React from "react";
import { Button, Text } from "react-native-elements";
import { useMeQuery } from "../generated/graphql";
import CenteredContainer from "../components/CenteredContainer";
import { LoginScreenName } from "./LoginScreen";
import { useRootScreen } from "./RootScreensManager";

export const HomeScreenName = "Home";

export type HomeScreenParams = { email: string };

export default function HomeScreen() {
  const { navigation } = useRootScreen(HomeScreenName);
  const [{ data }] = useMeQuery();

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      <Text h2>Greetings, {data?.me?.username}</Text>
      <Button
        onPress={() => navigation.navigate(LoginScreenName)}
        title="Log out"
      />
    </CenteredContainer>
  );
}
