import React from "react";
import { Text } from "react-native-elements";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export const MyRegimenScreenName = "MyRegimen";

export type MyRegimenScreenParams = undefined;

export default function MyRegimenScreen() {
  const { navigation } = useRootScreen(MyRegimenScreenName);
  return (
    <CenteredContainer>
      <Text h1>These are My Regimens</Text>
      <BigButton
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </CenteredContainer>
  );
}
