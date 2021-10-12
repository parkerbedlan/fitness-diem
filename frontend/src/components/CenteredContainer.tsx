import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

type ContainerProps = {};

export default function CenteredContainer({
  children,
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <View
      style={tw`bg-gray-50 h-full w-full flex justify-center items-center p-5`}
    >
      {children}
    </View>
  );
}
