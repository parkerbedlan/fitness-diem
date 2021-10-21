import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { LoginScreenName } from "./LoginScreen";
import { useRootScreen } from "./RootScreensManager";

export const HomeScreenName = "Home";

export type HomeScreenParams = { email: string };

export default function HomeScreen() {
  const { navigation, route } = useRootScreen(HomeScreenName);

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      <Text h2>Greetings, {route.params?.email}</Text>
      <Button
        onPress={() => navigation.navigate(LoginScreenName)}
        title="Log out"
      />
    </CenteredContainer>
  );
}
