import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

export const LineRule = (props: React.ComponentProps<typeof View>) => (
  <View {...props}>
    <View style={tw`border-b my-2`} />
  </View>
);
