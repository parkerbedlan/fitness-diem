import { useIsFocused, useNavigation } from "@react-navigation/core";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { CachelessImage } from "../components/CachelessImage";
import FormikInput from "../components/FormikInput";
import { LineRule } from "../components/LineRule";
import { ModalTapOutsideToClose } from "../components/ModalTapOutsideToClose";
import { useMeQuery } from "../generated/graphql";
import { getProfilePicUri } from "../utils/getProfilePicUri";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";

type ProfileHeaderInfo = {
  username: string;
  displayName: string;
  email: string;
  bio: string;
};

type ProfileStatsInfo = { streakDays: number; totalWorkouts: number };

const fakeResult = {
  data: {
    profile: {
      username: "parker",
      displayName: "Parker B",
      email: "parkerbedlan@gmail.com",
      bio: "",
      stats: {
        streakDays: 15,
        totalWorkouts: 420,
      },
    },
  },
};

type ProfileStackScreenList = {
  ViewProfile: undefined;
  EditProfile: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackScreenList>();

const useProfileStackNavigation = () =>
  useNavigation<
    NativeStackNavigationProp<
      ProfileStackScreenList,
      keyof ProfileStackScreenList
    >
  >();

const ProfileNavigator = () => {
  const { navigation: rootNavigation } = useRootScreen();
  useIsAuth(rootNavigation, useIsFocused());
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ViewProfile"
    >
      <ProfileStack.Screen name="ViewProfile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          header: ({ navigation: { navigate }, options }) => {
            return (
              <View style={tw`flex flex-row items-center border-b`}>
                <Button
                  icon={<Icon name="chevron-left" color="#6D28D9" />}
                  title="Cancel"
                  type="outline"
                  buttonStyle={tw`bg-white m-2 w-24`}
                  titleStyle={tw`text-purple-700`}
                  onPress={() => navigate("ViewProfile")}
                />
                <Text h4 style={tw`text-purple-700`}>
                  Edit Profile
                </Text>
              </View>
            );
          },
          headerTitle: "Edit Profile",
        }}
      />
    </ProfileStack.Navigator>
  );
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

const EditProfileScreen = () => {
  const navigation = useProfileStackNavigation();
  const {
    data: { profile },
  } = fakeResult;
  const profilePicUri = getProfilePicUri(profile.username);

  return (
    <ScrollView>
      <Formik
        initialValues={{
          displayName: profile.displayName,
          username: profile.username,
          email: profile.email,
          bio: profile.bio,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <>
            <View
              style={tw`rounded-lg p-2 border-4 border-purple-700 m-2 w-56 h-56 flex items-center justify-center`}
            >
              <TouchableOpacity>
                <View
                  style={tw`absolute w-full h-full z-10 flex items-center justify-center`}
                >
                  <Icon name="edit" color="white" size={40} />
                </View>
                <CachelessImage
                  uri={profilePicUri}
                  style={tw`opacity-80 w-52 h-52`}
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row`}>
              <View style={tw`w-6/12`}>
                <FormikInput
                  name="displayName"
                  label="Display Name"
                  placeholder="Joe Mama"
                  leftIcon={<Icon name="badge" />}
                  autoCompleteType="name"
                  autoCapitalize="words"
                />
              </View>
              <View style={tw`w-6/12`}>
                <FormikInput
                  name="username"
                  label="Username"
                  placeholder="joemama123"
                  leftIcon={<Icon name="alternate-email" />}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <FormikInput
              name="email"
              label="Email"
              placeholder="joe@mama.edu"
              leftIcon={<Icon name="email" />}
              autoCompleteType="email"
            />
            <FormikInput
              name="bio"
              label="Bio"
              placeholder="I love reaching my fitness goals with Fitness Dium!"
              multiline
            />
            <Button
              icon={<Icon name="check" color="white" />}
              title="accept changes"
              buttonStyle={tw`bg-green-600`}
              onPress={() => navigation.navigate("ViewProfile")}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ProfileNavigator;
