import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";

type SignupScreenProps = {
  navigation: any;
  route: {
    params: {
      email: string;
    };
  };
};

export default function SignupScreen({ navigation, route }: SignupScreenProps) {
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
