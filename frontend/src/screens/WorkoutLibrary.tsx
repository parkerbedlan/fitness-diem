import React from "react";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";

import { useRootScreen } from "./RootScreensManager";


export default function WorkoutLibrary() {
  const { navigation} = useRootScreen("Home");

  return (
    <div>

      
      <CenteredContainer>
        <Text h1>This is the Workout Libary.</Text>
        <Button onPress={() => navigation.navigate("Log in")} title="Log out" />
        
      </CenteredContainer>
    </div>
  );
}
