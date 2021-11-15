import { useFocusEffect } from "@react-navigation/core";
import * as Notifications from "expo-notifications";

import { Formik } from "formik";
import React, { useRef } from "react";
import { ActivityIndicator, Keyboard, ScrollView, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../../components/CenteredContainer";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import UncenteredContainer from "../../components/UncenteredContainer";
import {
  useGetConversationQuery,
  useMeQuery,
  useSendMessageMutation,
} from "../../generated/graphql";
import { useMessagesStackScreen } from "../MessagesScreen";

export const ConversationScreenName = "Conversation";
export type ConversationScreenParams = {
  conversationId: number;
};

export const ConversationScreen = () => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    route,
    navigation: { navigate },
  } = useMessagesStackScreen();
  const conversationId = route.params?.conversationId!;
  const { data, loading, fetchMore } = useGetConversationQuery({
    variables: { conversationId },
  });
  const [sendMessage] = useSendMessageMutation();

  const scrollViewRef = useRef(null);

  const notifListener: any = useRef();
  useFocusEffect(() => {
    fetchMore({});
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    notifListener.current = Notifications.addNotificationReceivedListener(
      (notif) => {
        console.log(
          "notif-convo-screen",
          notif.request.identifier,
          notif.request.content
        );
        fetchMore({});
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notifListener.current);
    };
  });

  if (!data)
    return (
      <CenteredContainer>
        <ActivityIndicator size="large" color="#10B981" />
      </CenteredContainer>
    );

  if (!meData || !meData.me)
    return (
      <CenteredContainer>
        <Text h1>You are not logged in.</Text>
      </CenteredContainer>
    );

  if (!data || !data.getConversation)
    return (
      <CenteredContainer>
        <Text h1>This conversation does not exist.</Text>
      </CenteredContainer>
    );

  const conversation = data?.getConversation;

  const user = conversation.members.find(
    (member) => member.id !== meData!.me!.id
  )!;

  const messages = conversation.messages;

  return (
    <>
      <HeaderForSubscreens
        backLabel="Back"
        title={
          <View style={tw`flex`}>
            <Text h4>{user.displayName}</Text>
            <Text>@{user.username}</Text>
          </View>
        }
        handleBack={() => navigate("ConversationPreviews")}
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (scrollViewRef.current)
            (scrollViewRef.current as any).scrollToEnd({ animated: true });
        }}
      >
        <UncenteredContainer>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              username={message.sender.username}
              body={message.body}
            />
          ))}
        </UncenteredContainer>
      </ScrollView>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={async (values, { resetForm }) => {
          const response = await sendMessage({
            variables: { conversationId, body: values.message },
          });
          if (!response.data?.sendMessage) {
            console.error(response.errors);
          } else if (response.data?.sendMessage) {
            fetchMore({});
          }
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
