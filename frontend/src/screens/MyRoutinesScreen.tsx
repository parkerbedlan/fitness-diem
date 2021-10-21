import { withUrqlClient } from "next-urql";
import React from "react";
import { Button, Text } from "react-native-elements";
import { createUrqlClient } from "src/utils/createUrqlClient";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";

export const MyRoutinesScreenName = "MyRoutines";

export type MyRoutinesScreenParams = undefined;

function MyRoutinesScreen() {
  const {} = useRootScreen(MyRoutinesScreenName);
  return (
    <CenteredContainer>
      <Text h1>This are My Routines</Text>
    </CenteredContainer>
  );
}

export default withUrqlClient(createUrqlClient)(MyRoutinesScreen);
