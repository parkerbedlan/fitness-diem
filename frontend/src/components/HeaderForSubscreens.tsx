import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

export const HeaderForSubscreens = ({
  title,
  backLabel,
  handleBack,
  rightComponent,
}: {
  title: string | React.ReactNode;
  backLabel: string;
  handleBack: (event: GestureResponderEvent) => void;
  rightComponent?: React.ReactNode;
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
      <View style={tw`flex-1 flex flex-row justify-between mr-2 items-center`}>
        <Text h4 style={tw`text-purple-700`}>
          {title}
        </Text>
        {rightComponent}
      </View>
    </View>
  );
};
