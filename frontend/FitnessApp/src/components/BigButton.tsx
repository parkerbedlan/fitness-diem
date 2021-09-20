import React from "react";
import tw from "tailwind-react-native-classnames";
import { Button } from "react-native-elements";

type ButtonProps = React.ComponentProps<typeof Button>;

export default function BigButton(props: ButtonProps) {
  return (
    <Button
      raised
      buttonStyle={tw`bg-purple-500 w-44 h-20`}
      titleStyle={tw`text-3xl p-3`}
      loadingProps={{ size: "large" }}
      {...props}
    />
  );
}
