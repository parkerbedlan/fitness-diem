import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { CachelessImage } from "../components/CachelessImage";
import { LineRule } from "../components/LineRule";
import { ModalTapOutsideToClose } from "../components/ModalTapOutsideToClose";
import { useMeQuery } from "../generated/graphql";

type ProfileHeaderInfo = {
  username: string;
  displayName: string;
  bio: string;
  profilePic: string;
};

type ProfileStatsInfo = { streakDays: number; totalWorkouts: number };

const fakeResult = {
  data: {
    profile: {
      username: "parker",
      displayName: "Parker B",
      bio: "I sure love lifting weights.",
      profilePic: "https://placekitten.com/200",
      stats: {
        streakDays: 15,
        totalWorkouts: 420,
      },
    },
  },
};

export const ProfileScreenName = "Profile";

export type ProfileScreenParams = undefined;

function ProfileScreen() {
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
}

const ProfileHeader = ({
  profile: profileHeaderInfo,
  editable,
}: {
  profile: ProfileHeaderInfo;
  editable: boolean;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <View style={tw`top-0 h-40 bg-purple-200 p-4`}>
        <View style={tw`flex flex-row items-start`}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <CachelessImage
              uri={profileHeaderInfo.profilePic}
              cacheless={false}
              style={tw`rounded-full w-20 h-20 mr-4 mb-4`}
            />
          </TouchableOpacity>
          <View
            style={tw`flex-1 flex flex-row justify-between items-center w-full`}
          >
            <View>
              <Text h4>{profileHeaderInfo.displayName}</Text>
              <Text h4 style={tw`opacity-50`}>
                @{profileHeaderInfo.username}
              </Text>
            </View>
            {editable && (
              <View>
                <Button
                  icon={<Icon name="edit" color="white" />}
                  title="Edit profile"
                  buttonStyle={tw`bg-purple-600`}
                  onPress={() => console.log("time to edit!")}
                />
              </View>
            )}
          </View>
        </View>
        <Text>{profileHeaderInfo.bio}</Text>
      </View>
      <ProfilePicModal
        uri={profileHeaderInfo.profilePic}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

const ProfilePicModal = ({
  uri,
  isModalVisible,
  setIsModalVisible,
}: {
  uri: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ModalTapOutsideToClose
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View
        style={tw`bg-white rounded-lg w-96 h-96 flex justify-center items-center`}
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
    <View style={tw`p-4 bg-purple-100`}>
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

export default ProfileScreen;
