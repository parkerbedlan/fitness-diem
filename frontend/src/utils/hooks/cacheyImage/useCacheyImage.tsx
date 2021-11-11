import React, { useEffect } from "react";
import { Image } from "react-native-elements";
import { PartialBy } from "../../PartialBy";
import { useCacheyUriStore } from "./useCacheyUriStore";

type CacheyImage = React.FC<Omit<CacheyImageProps, "baseUri">>;
type Revalidate = () => void;
type Setter = (cacheyUri: string) => void;

export const useCacheyImage = (
  baseUri: string
): [CacheyImage, Revalidate, Setter] => {
  const initialize = useCacheyUriStore(
    (state) => () => state.initialize(baseUri)
  );
  useEffect(() => {
    initialize();
  }, []);

  const revalidate = useCacheyUriStore(
    (state) => () => state.revalidate(baseUri)
  );

  const setCacheyUri = useCacheyUriStore(
    (state) => (cacheyUri: string) => state.set(baseUri, cacheyUri)
  );

  const CustomCacheyImage: CacheyImage = (props) => {
    return <CacheyImage {...props} baseUri={baseUri} />;
  };

  return [CustomCacheyImage, revalidate, setCacheyUri];
};

type CacheyImageProps = PartialBy<
  React.ComponentProps<typeof Image>,
  "source"
> & { baseUri: string };

const CacheyImage: React.FC<CacheyImageProps> = (props) => {
  const getCacheyUri = useCacheyUriStore(
    (state) => () => state.get(props.baseUri)
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
