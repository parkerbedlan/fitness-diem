import { ReactNativeFile } from "extract-files";
import * as mime from "react-native-mime-types";

export const generateRNFile = (uri: string, name: string) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || "image",
        name,
      })
    : null;
};
