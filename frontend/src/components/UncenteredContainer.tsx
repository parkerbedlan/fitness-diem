import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

type UncenteredContainer = {};

export default function UncenteredContainer({
  children,
}: React.PropsWithChildren<UncenteredContainer>) {
  return <View style={tw`bg-gray-50 p-2 w-full h-full`}>{children}</View>;
}
