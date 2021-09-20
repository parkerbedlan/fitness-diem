import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export default function HomeScreen() {
  const { navigation, route } = useRootScreen("Home");

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      <Text h2>Greetings, {route.params?.email}</Text>
      <Button onPress={() => navigation.navigate("Log in")} title="Log out" />
    </CenteredContainer>
  );
}
