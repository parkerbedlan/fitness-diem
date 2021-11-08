import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

export const HeaderForSubscreens = ({
  title,
  backLabel,
  handleBack,
}: {
  title: string;
  backLabel: string;
  handleBack: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View style={tw`flex flex-row items-center border-b`}>
      <Button
        icon={<Icon name="chevron-left" color="#6D28D9" />}
        title={backLabel}
        type="outline"
        buttonStyle={tw`bg-white m-2 w-24`}
        titleStyle={tw`text-purple-700`}
        onPress={handleBack}
      />
      <Text h4 style={tw`text-purple-700`}>
        {title}
      </Text>
    </View>
  );
};
