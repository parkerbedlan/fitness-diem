import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import LineBreak from "../components/LineBreak";
import UncenteredContainer from "../components/UncenteredContainer";
import {
  PostsQuery,
  useApproveNotificationsMutation,
  usePostsQuery,
} from "../generated/graphql";
import { getPostPicUri } from "../utils/getPostPicUri";
import { getProfilePicUri } from "../utils/getProfilePicUri";
import { useCacheyImage } from "../utils/hooks/cacheyImage/useCacheyImage";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationsAsync";
import { useMessagesStackScreen } from "./MessagesScreen";

export const HomeScreenName = "Home";

export type HomeScreenParams = undefined;

function HomeScreen() {
  const { navigation } = useRootScreen();
  useIsAuth(navigation, useIsFocused());
  const [approveNotifications] = useApproveNotificationsMutation();

  const { data: postsData, loading: postsFetching } = usePostsQuery();

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
      {postsFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <UncenteredContainer>
          {!postsData ? (
            <Text>No posts to see yet!</Text>
          ) : (
            <ScrollView>
              {postsData.posts
                ?.slice(0)
                .reverse()
                .map((post) => (
                  <PostPreview key={post.id} post={post} />
                ))}
            </ScrollView>
          )}
          <NewMessageButton />
        </UncenteredContainer>
      )}
    </CenteredContainer>
  );
}

const PostPreview = ({ post }: { post: PostsQuery["posts"][number] }) => {
  const profilePicUri = getProfilePicUri(post.creator.id);
  const [UserPic] = useCacheyImage(profilePicUri);

  const postPicUri = getPostPicUri(post.id);
  const [PostPic] = useCacheyImage(postPicUri);

  return (
    <View style={tw`flex flex-row justify-start w-full bg-gray-200 mb-1`}>
      <TouchableOpacity
        style={tw`rounded-full w-20 h-20 mr-4`}
        onPress={() => {
          // console.log("pls");
        }}
      >
        <UserPic
          style={tw`rounded-full w-20 h-20 mr-4`}
          PlaceholderContent={<Icon name="account-circle" size={60} />}
        />
      </TouchableOpacity>

      <View style={tw`w-full`}>
        <View style={tw`flex flex-row items-center`}>
          {post.creator.displayName && (
            <Text style={tw`font-bold text-xl`}>
              {post.creator.displayName}
            </Text>
          )}
          <Text style={tw`ml-2 text-lg font-semibold opacity-60`}>
            @{post.creator.username}
          </Text>
        </View>
        <View style={tw`flex flex-row w-11/12 mr-3`}>
          <View style={tw`flex flex-col w-60`}>
            <Text style={tw`font-semibold text-xl`}>{post.title}</Text>
            <Text>{post.text}</Text>
          </View>
        </View>
        <View style={tw` flex flex-row mb-1`}>
          <Icon name="favorite" onPress={() => console.log("liked")} />
          <Text>1</Text>
        </View>
        {post.hasImage && (
          <PostPic
            style={tw`rounded-md w-40 h-40 mr-4`}
            PlaceholderContent={<Icon name="image" size={60} />}
          />
        )}
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
