import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";
import React, { useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../../components/CenteredContainer";
import UncenteredContainer from "../../components/UncenteredContainer";
import {
  GetConversationPreviewsQuery,
  useGetConversationPreviewsQuery,
  useMeQuery,
} from "../../generated/graphql";
import { getProfilePicUri } from "../../utils/getProfilePicUri";
import { useCacheyImage } from "../../utils/hooks/cacheyImage/useCacheyImage";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { useRootScreen } from "../../utils/hooks/useRootScreen";
import { useMessagesStackScreen } from "../MessagesScreen";

export const ConversationPreviewsScreenName = "ConversationPreviews";
export type ConversationPreviewsScreenParams = undefined;

export const ConversationPreviewsScreen = () => {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const { data: meData } = useMeQuery();
  const { data, refetch, previousData } = useGetConversationPreviewsQuery();
  const convoPreviews = data?.getConversationPreviews;

  const notifListener: any = useRef();
  useFocusEffect(() => {
    if (data !== previousData) {
      refetch();
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }),
    });
    notifListener.current = Notifications.addNotificationReceivedListener(
      (notif) => {
        console.log(
          "notif-previews-screen",
          notif.request.identifier,
          notif.request.content
        );
        refetch();
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

  return (
    <UncenteredContainer>
      <ScrollView>
        {convoPreviews?.map((convoPreview) => (
          <ConversationPreview
            key={convoPreview.id}
            conversation={convoPreview}
          />
        ))}
      </ScrollView>
      <NewMessageButton />
    </UncenteredContainer>
  );
};

const ConversationPreview = ({
  conversation,
}: {
  conversation: GetConversationPreviewsQuery["getConversationPreviews"][number];
}) => {
  const { data: meData } = useMeQuery();
  const user =
    conversation.members.length === 1
      ? conversation.members[0]
      : conversation.members.find((member) => member.id !== meData!.me!.id)!;
  const lastMessagePreview = conversation.lastMessagePreview;
  const profilePicUri = getProfilePicUri(user.id);
  const [UserPic] = useCacheyImage(profilePicUri);
  const {
    navigation: { navigate },
  } = useMessagesStackScreen();

  const getMessageTimeString = (timestamp: number) => {
    const date = new Date(timestamp);
    const secondsPassed = Math.floor((new Date().getTime() - timestamp) / 1000);
    if (secondsPassed < 60) return `${secondsPassed}s`;
    const minutesPassed = Math.floor(secondsPassed / 60);
    if (minutesPassed < 60) return `${minutesPassed}m`;
    const hoursPassed = Math.floor(minutesPassed / 60);
    if (hoursPassed < 24) return `${hoursPassed}h`;
    const daysPassed = Math.floor(hoursPassed / 24);
    if (daysPassed === 1) return "Yesterday";
    return format(date, "d LLL");
  };

  return (
    <>
      <View style={tw`flex flex-row justify-start w-full bg-gray-200 mb-2`}>
        <TouchableOpacity
          style={tw`rounded-full w-20 h-20 mr-4`}
          onPress={() => {
            console.log("pls");
          }}
        >
          <UserPic
            style={tw`rounded-full w-20 h-20 mr-4`}
            PlaceholderContent={<Icon name="account-circle" size={60} />}
          />
        </TouchableOpacity>
        <View style={tw`flex-auto flex w-full`}>
          <View style={tw`absolute w-full h-full`}>
            <TouchableOpacity
              style={tw`h-full w-full`}
              onPress={() =>
                navigate("Conversation", { conversationId: conversation.id })
              }
            >
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex flex-row items-center`}>
                  {user.displayName && (
                    <Text style={tw`font-bold text-xl`}>
                      {user.displayName}
                    </Text>
                  )}
                  <Text style={tw`ml-2 text-lg font-semibold opacity-60`}>
                    @{user.username}
                  </Text>
                </View>
                <Text style={tw`mr-2`}>
                  {getMessageTimeString(parseInt(lastMessagePreview.createdAt))}
                </Text>
              </View>
              <Text>{lastMessagePreview.display}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const NewMessageButton = () => {
  const {
    navigation: { navigate },
  } = useMessagesStackScreen();
  return (
    <View
      style={tw`absolute w-full h-full z-10 pb-4 pr-2 flex justify-end items-end`}
    >
      <Button
        icon={<Icon name="add-comment" color="white" size={40} />}
        buttonStyle={tw`rounded-full w-20 h-20 bg-purple-600`}
        onPress={() => navigate("NewMessage")}
      />
    </View>
  );
};
