import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { LineRule } from "./LineRule";
import { ModalTapOutsideToClose } from "./ModalTapOutsideToClose";

type ModalCancelConfirmProps = {
  visible: boolean;
  onRequestClose: () => void;
  questionText: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ModalCancelConfirm: React.FC<ModalCancelConfirmProps> = ({
  visible,
  onRequestClose,
  questionText,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}) => {
  return (
    <ModalTapOutsideToClose {...{ visible, onRequestClose }}>
      <View style={tw`bg-gray-300 rounded-lg p-4 flex`}>
        <Text h4>{questionText}</Text>
        <LineRule />
        <View style={tw`flex flex-row justify-between`}>
          <Button
            title={cancelText}
            buttonStyle={tw`bg-white m-2`}
            titleStyle={tw`text-purple-700`}
            onPress={onCancel}
          />
          <Button
            title={confirmText}
            buttonStyle={tw`bg-purple-600 m-2`}
            onPress={onConfirm}
          />
        </View>
      </View>
    </ModalTapOutsideToClose>
  );
};
