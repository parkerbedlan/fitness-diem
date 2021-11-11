import { useIsFocused } from "@react-navigation/core";
import * as Notifications from "expo-notifications";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import UncenteredContainer from "../components/UncenteredContainer";
import { useMeQuery } from "../generated/graphql";
import { getProfilePicUri } from "../utils/getProfilePicUri";
import { useCacheyImage } from "../utils/hooks/cacheyImage/useCacheyImage";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const MessagesScreenName = "Messages";

export type MessagesScreenParams = undefined;

function MessagesScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const { data: meData, loading: meLoading } = useMeQuery();

  if (meLoading)
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
        <ConversationPreview
          user={{ userId: 2, username: "joe", displayName: "Joe Mama" }}
          lastMessage={{ date: 1636654349096, snippet: "heyy" }}
        />
        <ConversationPreview
          user={{ userId: 1, username: "parker", displayName: "Pk" }}
          lastMessage={{ date: 1636655076493, snippet: "hello" }}
        />
      </ScrollView>
      <NewMessageButton />
    </UncenteredContainer>
  );
}

const ConversationPreview = ({
  user,
  lastMessage,
}: {
  user: { userId: number; username: string; displayName: string };
  lastMessage: { date: number; snippet: string };
}) => {
  const [UserPic] = useCacheyImage(getProfilePicUri(user.userId));

  const getMessageTimeString = (timestamp: number) => {
    const date = new Date(timestamp);
    const secondsPassed = Math.floor((new Date().getTime() - timestamp) / 1000);
    if (secondsPassed < 60) return `${secondsPassed}s`;
    const minutesPassed = Math.floor(secondsPassed / 60);
    if (minutesPassed < 60) return `${minutesPassed}m`;
    return date.toLocaleDateString("en-US");
  };

  return (
    <>
      <View style={tw`flex flex-row justify-start w-full bg-gray-200 mb-2`}>
        <TouchableOpacity style={tw`rounded-full w-20 h-20 mr-4`}>
          <UserPic style={tw`rounded-full w-20 h-20 mr-4`} />
        </TouchableOpacity>
        <View style={tw`flex-auto flex w-full`}>
          <View style={tw`absolute w-full h-full`}>
            <TouchableOpacity style={tw`h-full w-full`}>
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex flex-row items-center`}>
                  <Text style={tw`font-bold text-xl`}>{user.displayName}</Text>
                  <Text style={tw`ml-2 text-lg font-semibold opacity-60`}>
                    @{user.username}
                  </Text>
                </View>
                <Text style={tw`mr-2`}>
                  {getMessageTimeString(lastMessage.date)}
                </Text>
              </View>
              <Text>{lastMessage.snippet}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const NewMessageButton = () => (
  <View
    style={tw`absolute w-full h-full z-10 pb-4 pr-2 flex justify-end items-end`}
  >
    <Button
      icon={<Icon name="add-comment" color="white" size={40} />}
      buttonStyle={tw`rounded-full w-20 h-20 bg-purple-600`}
    />
  </View>
);

export default MessagesScreen;
