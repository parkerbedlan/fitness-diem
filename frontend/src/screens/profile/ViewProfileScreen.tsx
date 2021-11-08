import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Button, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { CachelessImage } from "../../components/CachelessImage";
import { LineRule } from "../../components/LineRule";
import { ModalTapOutsideToClose } from "../../components/ModalTapOutsideToClose";
import { useMeQuery } from "../../generated/graphql";
import { getProfilePicUri } from "../../utils/getProfilePicUri";
import {
  fakeResult,
  ProfileHeaderInfo,
  ProfileStatsInfo,
  useProfileStackNavigation,
} from "../ProfileScreen";

export const ViewProfileScreen = () => {
  const { data: meData } = useMeQuery();
  const { data: profileData } = fakeResult;
  const { profile } = profileData;

  return (
    <>
      <ProfileHeader
        profile={profile}
        editable={meData?.me?.username === profile.username}
      />
      <ProfileBody profile={profile} />
    </>
  );
};

const ProfileHeader = ({
  profile: profileHeaderInfo,
  editable,
}: {
  profile: ProfileHeaderInfo;
  editable: boolean;
}) => {
  const { navigate } = useProfileStackNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const profilePicUri = getProfilePicUri(profileHeaderInfo.username);
  return (
    <>
      <View style={tw`top-0 h-40 bg-gray-200 p-4`}>
        <View style={tw`flex flex-row items-start`}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <CachelessImage
              uri={profilePicUri}
              cacheless={false}
              style={tw`rounded-full w-20 h-20 mr-4 mb-4`}
            />
          </TouchableOpacity>
          <View
            style={tw`flex-1 flex flex-row justify-between items-center w-full`}
          >
            <View>
              {!profileHeaderInfo.displayName ? null : (
                <Text h4>{profileHeaderInfo.displayName}</Text>
              )}
              <View style={tw`opacity-50`}>
                <Text h4>@{profileHeaderInfo.username}</Text>
              </View>
            </View>
            {editable && (
              <View>
                <Button
                  icon={<Icon name="edit" color="white" />}
                  title="Edit profile"
                  buttonStyle={tw`bg-purple-600`}
                  onPress={() => navigate("EditProfile")}
                />
              </View>
            )}
          </View>
        </View>
        <Text>
          {profileHeaderInfo.bio ||
            "I love reaching my fitness goals with Fitness Dium!"}
        </Text>
      </View>
      <ProfilePicModal
        uri={profilePicUri}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

const ProfilePicModal = ({
  uri,
  visible,
  onRequestClose,
}: {
  uri: string;
  visible: boolean;
  onRequestClose: (() => void) | undefined;
}) => {
  return (
    <ModalTapOutsideToClose
      animationType="slide"
      transparent={true}
      {...{ visible, onRequestClose }}
    >
      <View
        style={tw`bg-purple-300 rounded-lg w-96 h-96 flex justify-center items-center`}
      >
        <CachelessImage uri={uri} cacheless={false} style={tw`w-80 h-80`} />
      </View>
    </ModalTapOutsideToClose>
  );
};

const ProfileBody = ({
  profile,
}: {
  profile: typeof fakeResult.data.profile;
}) => {
  return (
    <View style={tw`p-4 bg-gray-50`}>
      <ProfileStats stats={profile.stats} />
      <LineRule />
      <ProfileRegimen />
      <LineRule />
      <ProfilePosts />
    </View>
  );
};

const ProfileStats = ({ stats }: { stats: ProfileStatsInfo }) => {
  return (
    <>
      <View style={tw`flex flex-row justify-evenly items-center flex-wrap`}>
        <View style={tw`flex-auto flex items-center w-32 mb-4 mx-4 `}>
          <Text h3 style={tw`text-center`}>
            Current Streak
          </Text>
          <Text h1>{stats.streakDays}</Text>
        </View>
        <View style={tw`flex-auto flex items-center w-32 mb-4 mx-4 `}>
          <Text h3 style={tw`text-center`}>
            Total Workouts
          </Text>
          <Text h1>{stats.totalWorkouts}</Text>
        </View>
      </View>
    </>
  );
};

const ProfileRegimen = () => {
  return (
    <View>
      <Text h1 style={tw`text-center`}>
        Current Regimen
      </Text>
      <View style={tw`flex flex-row justify-between`}>
        {"SMTWTFS".split("").map((day, i) => (
          <Button
            key={i}
            title={day}
            buttonStyle={tw`w-12 h-12 bg-purple-400`}
            titleStyle={tw`text-4xl `}
          />
        ))}
      </View>
    </View>
  );
};

const ProfilePosts = () => {
  return (
    <View>
      <Text h1 style={tw`text-center`}>
        Posts
      </Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
      <Text>hello world</Text>
    </View>
  );
};
