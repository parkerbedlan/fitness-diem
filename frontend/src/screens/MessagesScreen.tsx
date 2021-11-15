import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { setNotificationHandler } from "expo-notifications";
import React from "react";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useNavigator } from "../utils/hooks/useNavigator";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import {
  ConversationPreviewsScreen,
  ConversationPreviewsScreenName,
  ConversationPreviewsScreenParams,
} from "./messages/ConversationPreviewsScreen";
import {
  ConversationScreen,
  ConversationScreenName,
  ConversationScreenParams,
} from "./messages/ConversationScreen";
import {
  NewMessageScreen,
  NewMessageScreenName,
  NewMessageScreenParams,
} from "./messages/NewMessageScreen";

export const MessagesScreenName = "Messages";

export type MessagesScreenParams = undefined;

export const MessagesScreen = () => <MessagesNavigator />;

type MessagesStackScreenList = {
  [ConversationPreviewsScreenName]: ConversationPreviewsScreenParams;
  [ConversationScreenName]: ConversationScreenParams;
  [NewMessageScreenName]: NewMessageScreenParams;
};

export const { Stack: MessagesStack, useScreen: useMessagesStackScreen } =
  useNavigator<MessagesStackScreenList>();

const MessagesNavigator = () => {
  const { navigation: rootNavigation } = useRootScreen();
  useIsAuth(rootNavigation, useIsFocused());

  useFocusEffect(() => {
    return () => {
      setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    };
  });

  return (
    <MessagesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ConversationPreviews"
    >
      <MessagesStack.Screen
        name="ConversationPreviews"
        component={ConversationPreviewsScreen}
      />
      <MessagesStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
      <MessagesStack.Screen name="NewMessage" component={NewMessageScreen} />
    </MessagesStack.Navigator>
  );
};
