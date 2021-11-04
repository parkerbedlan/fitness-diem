import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import { ReactNativeFile } from "apollo-upload-client";
import * as mime from "react-native-mime-types";

function generateRNFile(uri: string, name: string) {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || "image",
        name,
      })
    : null;
}

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (location: "camera" | "library") => {
    let picker: typeof ImagePicker.launchCameraAsync;

    if (location === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
      picker = ImagePicker.launchCameraAsync;
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      picker = ImagePicker.launchImageLibraryAsync;
    }

    let result = await picker({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const file = generateRNFile(result.uri, `picture-${Date.now()}`);
      console.log(file);
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
