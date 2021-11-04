import React from "react";
import { Image } from "react-native-elements";
import { PartialBy } from "../utils/PartialBy";

type CachelessImageProps = PartialBy<
  React.ComponentProps<typeof Image>,
  "source"
> & { uri: string };

export const CachelessImage: React.FC<CachelessImageProps> = (props) => {
  return (
    <Image
      {...props}
      source={{
        ...(props.source as Object),
        uri: `${props.uri}?${new Date()}`,
      }}
    />
  );
};
