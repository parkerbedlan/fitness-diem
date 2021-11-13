import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import {
  useApproveNotificationsMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const { data: meData, loading: meFetching } = useMeQuery();
  const [approveNotifications] = useApproveNotificationsMutation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((pushToken) => {
      if (pushToken) {
        console.log(
          "--------------------approving notifications--------------------"
        );
        approveNotifications({ variables: { pushToken } });
      }
    });
    Notifications.addNotificationReceivedListener((notif) =>
      console.log("notif", notif.request.identifier, notif.request.content)
    );
    Notifications.addNotificationResponseReceivedListener((response) =>
      console.log(
        "response",
        response.notification.request.identifier,
        response.notification.request.content
      )
    );
  }, []);

  useFocusEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  });

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      {meFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {meData?.me?.username}</Text>
      )}
    </CenteredContainer>
  );
}

export default HomeScreen;
