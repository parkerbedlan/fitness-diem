import React from "react";
import { Text } from "react-native-elements";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export const MyRoutinesScreenName = "MyRoutines";

export type MyRoutinesScreenParams = undefined;

export default function MyRoutinesScreen() {
  const { navigation } = useRootScreen(MyRoutinesScreenName);
  return (
    <CenteredContainer>
      <Text h1>These are My Routines</Text>
      <BigButton
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </CenteredContainer>
  );
}
