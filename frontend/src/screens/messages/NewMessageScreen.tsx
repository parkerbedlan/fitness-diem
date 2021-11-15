import { Formik } from "formik";
import React from "react";
import { Keyboard } from "react-native";
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import {
  useStartConversationByUsernameMutation,
  useStartConversationMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useMessagesStackScreen } from "../MessagesScreen";

export const NewMessageScreenName = "NewMessage";
export type NewMessageScreenParams = undefined;

export const NewMessageScreen = () => {
  const {
    navigation: { navigate },
  } = useMessagesStackScreen();
  const [startConvoByUsername] = useStartConversationByUsernameMutation();
  return (
    <Formik
      initialValues={{ username: "" }}
      onSubmit={async ({ username }, { setErrors, resetForm }) => {
        const response = await startConvoByUsername({
          variables: { username },
        });
        const convoId = response.data?.startConversationByUsername;
        if (convoId === -1) {
          setErrors(
            toErrorMap([{ field: "username", message: "user not found" }])
          );
        } else {
          // Keyboard.dismiss()
          resetForm();
          navigate("Conversation", { conversationId: convoId! });
        }
      }}
    >
      {({ dirty, handleSubmit }) => (
        <>
          <HeaderForSubscreens
            title="New message"
            backLabel="Back"
            handleBack={() => navigate("ConversationPreviews")}
            rightComponent={
              dirty && (
                <Button
                  title="Next"
                  type="outline"
                  buttonStyle={tw`bg-white m-2 w-24`}
                  titleStyle={tw`text-purple-700`}
                  onPress={() => handleSubmit()}
                  // icon={<Icon name="chevron-right" color="#6D28D9" />}
                  // iconRight={true}
                />
              )
            }
          />
          <FormikInput
            leftIcon={<Icon name="alternate-email" />}
            name="username"
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </>
      )}
    </Formik>
  );
};
