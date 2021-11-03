import React from "react";
import { Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  return (
    <CenteredContainer>
      <Text h1>Upload test screen</Text>
    </CenteredContainer>
  );
}

export default UploadTestScreen;
