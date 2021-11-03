import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (location: "camera" | "library") => {
    if (location === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    const picker =
      location === "camera"
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    let result = await picker({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <CenteredContainer>
      <Text h1>Upload test screen</Text>
      <Button
        title="Take picture"
        onPress={() => pickImage("camera")}
        buttonStyle={tw`m-4`}
      />
      <Button
        title="Upload from library"
        onPress={() => pickImage("library")}
        buttonStyle={tw`m-4`}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </CenteredContainer>
  );
}

export default UploadTestScreen;
