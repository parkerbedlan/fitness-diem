import { Formik } from "formik";
import React from "react";
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import { useMessagesStackScreen } from "../MessagesScreen";

export const NewMessageScreenName = "NewMessage";
export type NewMessageScreenParams = undefined;

export const NewMessageScreen = () => {
  const {
    navigation: { navigate },
  } = useMessagesStackScreen();
  return (
    <Formik
      initialValues={{ username: "" }}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {({ dirty }) => (
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
