import React from "react";
import { Image } from "react-native-elements";
import { PartialBy } from "../utils/PartialBy";

type CachelessImageProps = PartialBy<
  React.ComponentProps<typeof Image>,
  "source"
> & { uri: string; cacheless?: boolean };

export const CachelessImage: React.FC<CachelessImageProps> = (props) => {
  const cacheless =
    typeof props.cacheless === "undefined" ? true : props.cacheless;

  return (
    <Image
      {...props}
      style={props.style || { width: 200, height: 200 }}
      source={{
        ...(props.source as Object),
        uri: cacheless ? `${props.uri}?${new Date()}` : props.uri,
      }}
    />
  );
};
