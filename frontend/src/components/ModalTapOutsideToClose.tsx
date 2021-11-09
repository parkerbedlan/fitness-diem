import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import tw from "tailwind-react-native-classnames";

type ModalTapOutsideToCloseProps = React.ComponentProps<typeof Modal>;

export const ModalTapOutsideToClose: React.FC<ModalTapOutsideToCloseProps> = (
  props
) => {
  return (
    <Modal
      {...props}
      transparent={props.transparent === undefined ? true : props.transparent}
    >
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
        <View style={tw`h-full w-full p-4 flex justify-center items-center`}>
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
