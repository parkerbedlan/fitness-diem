import { useIsFocused } from "@react-navigation/core";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import {
  useApproveNotificationsMutation,
  useLogoutMutation,
  useMeQuery,
  useSendMyselfANotificationMutation,
} from "../generated/graphql";
import { updateLogout } from "../utils/GraphQLUtils";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const { data: meData, loading: meFetching } = useMeQuery();
  const [logout] = useLogoutMutation();
  const [approveNotifications] = useApproveNotificationsMutation();
  const [sendMyselfANotification] = useSendMyselfANotificationMutation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((pushToken) => {
      if (pushToken) approveNotifications({ variables: { pushToken } });
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
    sendMyselfANotification({ variables: { messageText: "hi mom" } });
  }, []);

  return (
    <CenteredContainer>
      <Text h1>This is the Home Screen.</Text>
      {meFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {meData?.me?.username}</Text>
      )}
      <Button
        onPress={() => {
          logout({
            update: updateLogout,
          });
        }}
        title="Log out"
      />
    </CenteredContainer>
  );
}

export default HomeScreen;
