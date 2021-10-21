import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import { FitnessDiumRoutinesScreenName } from "./FitnessDiumRoutinesScreen";
import { LoginScreenName } from "./LoginScreen";
import { MyRoutinesScreenName } from "./MyRoutinesScreen";
import { useRootScreen } from "./RootScreensManager";

export const RoutineLibraryScreenName = "RoutineLibrary";

export type RoutineLibraryScreenParams = undefined;

export default function RoutineLibraryScreen() {
  const { navigation } = useRootScreen(RoutineLibraryScreenName);
  return (
    <CenteredContainer>
      <Text h1>Routine Library</Text>
      <View style={tw`flex-col justify-center`}>
        <RoutineLibButton
          title="My Routines"
          onPress={() => {
            console.log("going to my routines");
            navigation.navigate(MyRoutinesScreenName);
          }}
        />
        <RoutineLibButton
          title="FitnessDium Routines"
          onPress={() => {
            navigation.navigate(FitnessDiumRoutinesScreenName);
          }}
        />
      </View>
    </CenteredContainer>
  );
}

const RoutineLibButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <View style={tw`m-5`}>
      <BigButton title={title} onPress={onPress} />
    </View>
  );
};
