import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import { FitnessDiumRoutinesScreenName } from "./FitnessDiumRoutinesScreen";
import { LoginScreenName } from "./LoginScreen";
import { MyRegimenScreenName } from "./MyRegimensScreen";
import { useRootScreen } from "./RootScreensManager";

export const RegimenLibraryScreenName = "RegimenLibrary";

export type RegimenLibraryScreenParams = undefined;

export default function RegimenLibraryScreen() {
  const { navigation } = useRootScreen(RegimenLibraryScreenName);
  return (
    <CenteredContainer>
      <Text h1>Routine Library</Text>
      <View style={tw`flex-col justify-center`}>
        <RegimenLibButton
          title="My Routines"
          onPress={() => {
            console.log("going to my routines");
            navigation.navigate(MyRegimenScreenName);
          }}
        />
        <RegimenLibButton
          title="FitnessDium Routines"
          onPress={() => {
            navigation.navigate(FitnessDiumRoutinesScreenName);
          }}
        />
      </View>
    </CenteredContainer>
  );
}

const RegimenLibButton = ({
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
