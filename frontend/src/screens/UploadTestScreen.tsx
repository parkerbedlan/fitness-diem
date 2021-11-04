import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import * as mime from "react-native-mime-types";
import { useUploadTestImageMutation } from "../generated/graphql";
import { Platform } from "react-native";
import { urltoFile } from "../utils/urlToFile";
import { generateRNFile } from "../utils/generateRNFile";

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [uploadTestImage] = useUploadTestImageMutation();

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
      console.log("react native file:");
      if (Platform.OS === "web") {
        const file = await urltoFile(
          result.uri,
          "testfile.png",
          mime.lookup(result.uri) || "image"
        );
        console.log("file", file);
        uploadTestImage({ variables: { fileUpload: file } });
      } else {
        // const file = generateRNFile(result.uri, `picture-${Date.now()}`);
        const file = generateRNFile(result.uri, "testfile.png");
        console.log(file);
        uploadTestImage({ variables: { fileUpload: file } });
      }
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
