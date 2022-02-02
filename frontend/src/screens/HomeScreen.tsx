import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import {Button} from "react-native-elements"
import { Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import UncenteredContainer from "../components/UncenteredContainer";
import {
  useApproveNotificationsMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { useMessagesStackScreen } from "./MessagesScreen";

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

  const posts = {
    "posts" : [
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "1"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is short",
        "likes" : "69",
        "id" : "2"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "3"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. ",
        "likes" : "69",
        "id" : "4"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "5"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is short",
        "likes" : "69",
        "id" : "6"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "7"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. ",
        "likes" : "69",
        "id" : "8"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "9"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is short",
        "likes" : "69",
        "id" : "10"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "11"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. Im Joe and this message is long. ",
        "likes" : "69",
        "id" : "12"
      },
      {
        "poster" : "Justin",
        "content" : "Hello FitnessDium! I'm adding a lot more text to this post because I think the average post would be somewhere around this length.",
        "likes" : "420",
        "id" : "13"
      },
      {
        "poster" : "Joe",
        "content" : "Im Joe and this message is short",
        "likes" : "69",
        "id" : "14"
      }
    ]
  }

  return (
    <CenteredContainer>
      {/* <Text h1>New Activity From Friends</Text> */}
      {meFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text h2>Greetings, {meData?.me?.username}</Text>
      )}
      <UncenteredContainer>
      <ScrollView>
        {posts.posts?.map((post => (
          <PostPreview
            key={post.id}
            post={post}
          />
        )))}
      </ScrollView>
      <NewMessageButton />
    </UncenteredContainer>
    </CenteredContainer>
  );
}

const PostPreview = ({post}) => {
  
  return (
      <View style={tw`flex flex-row justify-start w-full bg-gray-200 mb-1`}>
        <TouchableOpacity
          style={tw`rounded-full w-10 mt-2`}
          onPress={() => {
            console.log("pls");
          }}
        >
          <Icon
            style={tw`rounded-full w-10`}
            name="account-circle"
          />
        </TouchableOpacity>
        <View style={tw`flex-auto flex w-full`}>
          <View style={tw`absolute w-full `}>
            <TouchableOpacity
              style={tw` w-full`}
            >
                <View style={tw`flex flex-row  top-1 w-full `}>

                    <Text style={tw`font-bold text-xl `}>
                      {post.poster}
                    </Text>

                </View>
              
            </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row top-10 w-11/12 mr-3 mb-11`}>
              <Text style={tw` `}>
                {post.content}
              </Text>
            </View>

            <View style={tw` flex flex-row mb-1`}>
              <Icon
                  style={tw``}
                  name="favorite"
                  onPress={() => console.log('liked')}
                />
              <Text style={tw``}>
                  {post.likes}
              </Text>
            </View>
        </View>
      </View>
  );
};


export default HomeScreen;

const NewMessageButton = () => {
  const {
    navigation: { navigate },
  } = useMessagesStackScreen();
  return (
    <Button
      icon={<Icon name="add-comment" color="white" size={40} />}
      buttonStyle={tw`w-20 h-20 rounded-full bg-purple-600`}
      containerStyle={tw`absolute bottom-4 right-4`}
      onPress={() => navigate("NewMessage")}
    />
  );
};