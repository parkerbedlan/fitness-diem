import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";
import BigButton from "../components/BigButton";
import MyRoutinesScreen, { MyRoutinesScreenName } from "./MyRoutinesScreen";
import {
  NavigationContext,
  NavigationHelpersContext,
} from "@react-navigation/core";
import { FitnessDiumRoutinesScreenName } from "./FitnessDiumRoutines";
import { HomeScreenName } from "./HomeScreen";
import LoginScreen, { LoginScreenName } from "./LoginScreen";

export const RoutineLibraryScreenName = "RoutineLibrary";

export type RoutineLibraryScreenParams = undefined;

export default function RoutineLibraryScreen() {
  const { navigation } = useRootScreen(RoutineLibraryScreenName);
  return (
    <CenteredContainer>
      <Text h1>Routine Library</Text>
      <BigButton
        title="My Routines"
        onPress={() => {
          console.log("going to my routines");
          navigation.navigate(MyRoutinesScreenName);
        }}
      />
      <BigButton
        title="Fitness Dium Routines"
        onPress={() => {
          navigation.navigate(FitnessDiumRoutinesScreenName);
        }}
      />
      <BigButton
        title="Login"
        onPress={() => {
          navigation.navigate(LoginScreenName);
        }}
      />
    </CenteredContainer>
  );
}
