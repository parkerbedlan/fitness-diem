import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export const FitnessDiumRoutinesScreenName = "FitnessDiumRoutines";

export type FitnessDiumRoutinesScreenParams = undefined;

export default function FitnessDiumRoutinesScreen() {
  const {} = useRootScreen(FitnessDiumRoutinesScreenName);
  return (
    <CenteredContainer>
      <Text h1>This are Fitness Dium Routines</Text>
    </CenteredContainer>
  );
}
