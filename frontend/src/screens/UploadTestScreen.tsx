import React from "react";
import { withUrqlClient } from "next-urql";
import { Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { createUrqlClient } from "../utils/createUrqlClient";

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  return (
    <CenteredContainer>
      <Text h1>Upload test screen</Text>
    </CenteredContainer>
  );
}

export default withUrqlClient(createUrqlClient)(UploadTestScreen);
