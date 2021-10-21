import React from "react";
import { Text } from "react-native-elements";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export const FitnessDiumRoutinesScreenName = "FitnessDiumRoutines";

export type FitnessDiumRoutinesScreenParams = undefined;

export default function FitnessDiumRoutinesScreen() {
  const { navigation } = useRootScreen(FitnessDiumRoutinesScreenName);
  return (
    <CenteredContainer>
      <Text h1>This are Fitness Dium Routines</Text>
      <BigButton
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </CenteredContainer>
  );
}
