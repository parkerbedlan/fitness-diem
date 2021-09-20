import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export default function SignupScreen() {
  const { navigation } = useRootScreen("Sign Up");

  return (
    <CenteredContainer>
      <Text h1>This is the Signup Screen.</Text>
      <Button
        onPress={() => navigation.navigate("Log in")}
        title="Go back to logging in"
      />
    </CenteredContainer>
  );
}
