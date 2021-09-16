import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";

type HomeScreenProps = {
  navigation: any;
  route: {
    params: {
      email: string;
    };
  };
};

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      <Text h2>Greetings, {route.params.email}</Text>
      <Button onPress={() => navigation.navigate("Log in")} title="Log out" />
    </CenteredContainer>
  );
}
