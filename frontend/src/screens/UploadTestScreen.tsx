import { useIsFocused } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, Text } from "react-native-elements";
import * as mime from "react-native-mime-types";
import tw from "tailwind-react-native-classnames";
import { CachelessImage } from "../components/CachelessImage";
import CenteredContainer from "../components/CenteredContainer";
import { useUploadTestImageMutation } from "../generated/graphql";
import { serverBaseUrl } from "../utils/constants";
import { generateRNFile } from "../utils/generateRNFile";
import { useForceRerender } from "../utils/hooks/useForceRerender";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { urltoFile } from "../utils/urlToFile";

export const UploadTestName = "UploadTest";

export type UploadTestParams = undefined;

function UploadTestScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const initialImage = `${serverBaseUrl}/testimage.png`;
  const [image, setImage] = useState<string>(initialImage);
  const [uploadTestImage] = useUploadTestImageMutation();

  const forceRerender = useForceRerender();

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
        console.log("file", file);
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
      <CachelessImage
        uri={image}
        style={{ width: 200, height: 200 }}
        cacheless={image.startsWith("http")}
      />
      <Button
        title="Refresh"
        onPress={() => {
          setImage(initialImage);
          forceRerender();
        }}
        buttonStyle={tw`m-4`}
      />
    </CenteredContainer>
  );
}

export default UploadTestScreen;
