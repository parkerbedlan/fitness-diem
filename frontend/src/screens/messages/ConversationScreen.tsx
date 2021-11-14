import { Formik } from "formik";
import React from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import UncenteredContainer from "../../components/UncenteredContainer";
import { useMeQuery } from "../../generated/graphql";
import { useMessagesStackScreen } from "../MessagesScreen";

export const ConversationScreenName = "Conversation";
export type ConversationScreenParams = {
  userId: number;
};

export const ConversationScreen = () => {
  const {
    route,
    navigation: { navigate },
  } = useMessagesStackScreen();
  const userId = route.params?.userId;

  return (
    <>
      <HeaderForSubscreens
        backLabel="Back"
        title={`username of user ${userId} here`}
        handleBack={() => navigate("ConversationPreviews")}
      />
      <ScrollView>
        <UncenteredContainer>
          <MessageBubble username="joe" body="hi" />
          <MessageBubble username="joe" body="hi" />
          <MessageBubble
            username="parker"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
                cursus urna, in sollicitudin purus. Praesent ornare mattis urna
                id interdum. Aliquam quis rhoncus odio, eu tincidunt dolor. In
                sed egestas felis. Vestibulum quis varius felis. Etiam ut risus
                ut lacus convallis ultricies sit amet quis metus. Suspendisse
                libero nisl, suscipit at nisl sit amet, ultrices finibus velit.
                Etiam quis posuere augue. Integer imperdiet nulla id diam
                consequat interdum. Sed a justo quis elit iaculis rutrum.
                Aliquam sollicitudin vel elit eget sagittis. Sed porta risus ut
                urna fermentum, ut vulputate risus suscipit. Ut maximus lacinia
                sem, quis mattis magna placerat et. In fermentum, diam eu
                eleifend accumsan, justo nisl placerat purus, eget semper tellus
                mauris eget urna. Etiam ultrices hendrerit arcu vitae tincidunt.
                Vestibulum mattis tortor quis lacus posuere dictum."
          />
        </UncenteredContainer>
      </ScrollView>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log("message", values.message);
          resetForm();
          Keyboard.dismiss();
        }}
      >
        {({ handleSubmit }) => (
          <View style={tw`flex flex-row h-16 border-t pt-2 pr-3`}>
            <View style={tw`w-11/12`}>
              <FormikInput name="message" placeholder="Text message" />
            </View>
            <Button
              icon={<Icon name="send" color="white" />}
              buttonStyle={tw`bg-purple-600`}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </>
  );
};

const MessageBubble = ({
  username,
  body,
}: {
  username: string;
  body: string;
}) => {
  const { data } = useMeQuery();
  const myUsername = data?.me?.username;
  const isMe = username === myUsername;

  if (!isMe)
    return (
      <View style={tw`flex flex-row`}>
        <View style={tw`m-1 max-w-xs`}>
          <Text style={tw`opacity-50`}>{username}</Text>
          <View style={tw`flex-shrink bg-gray-300 px-4 py-2 rounded-lg`}>
            <Text style={tw`text-black text-base`}>{body}</Text>
          </View>
        </View>
      </View>
    );

  return (
    <View style={tw`flex flex-row justify-end`}>
      <View
        style={tw`flex-shrink bg-blue-500 px-4 py-2 m-1 rounded-lg max-w-xs`}
      >
        <Text style={tw`text-white text-base`}>{body}</Text>
      </View>
    </View>
  );
};
