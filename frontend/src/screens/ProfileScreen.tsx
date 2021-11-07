import React from "react";
import { Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";

export const ProfileScreenName = "Profile";

export type ProfileScreenParams = undefined;

function ProfileScreen() {
  return (
    <>
      <CenteredContainer>
        <Text h1>hi</Text>
      </CenteredContainer>
    </>
  );
}

export default ProfileScreen;
