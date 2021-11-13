import { useIsFocused } from "@react-navigation/core";
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

export const MessagesScreenName = "Messages";

export type MessagesScreenParams = undefined;

export const MessagesScreen = () => <MessagesNavigator />;

type MessagesStackScreenList = {
  [ConversationPreviewsScreenName]: ConversationPreviewsScreenParams;
  [ConversationScreenName]: ConversationScreenParams;
};

export const { Stack: MessagesStack, useScreen: useMessagesStackScreen } =
  useNavigator<MessagesStackScreenList>();

const MessagesNavigator = () => {
  const { navigation: rootNavigation } = useRootScreen();
  useIsAuth(rootNavigation, useIsFocused());
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
    </MessagesStack.Navigator>
  );
};
