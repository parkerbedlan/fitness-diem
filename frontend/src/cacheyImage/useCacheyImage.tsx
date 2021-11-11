import React from "react";
import { ImageStyle, StyleProp } from "react-native";
import { Image } from "react-native-elements";
import { PartialBy } from "../utils/PartialBy";
import { useCacheyUriStore } from "./useCacheyUriStore";

export const useCacheyImage = (
  baseUri: string,
  style: StyleProp<ImageStyle>
): [revalidate: () => void, cacheyImage: React.ReactElement] => {
  const revalidate = useCacheyUriStore(
    (state) => () => state.revalidate(baseUri)
  );
  const cacheyImage = <CacheyImage baseUri={baseUri} style={style} />;

  return [revalidate, cacheyImage];
};

type CacheyImageProps = PartialBy<
  React.ComponentProps<typeof Image>,
  "source"
> & { baseUri: string };

const CacheyImage: React.FC<CacheyImageProps> = (props) => {
  const getCacheyUri = useCacheyUriStore(
    (state) => () => state.getCacheyUri(props.baseUri)
  );
  return (
    <Image
      {...props}
      style={props.style || { width: 200, height: 200 }}
      source={{
        ...(props.source as Object),
        uri: getCacheyUri(),
      }}
    />
  );
};
