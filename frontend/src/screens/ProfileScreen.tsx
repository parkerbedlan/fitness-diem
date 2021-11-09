import { useIsFocused, useNavigation } from "@react-navigation/core";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import { EditProfileScreen } from "./profile/EditProfileScreen";
import { ViewProfileScreen } from "./profile/ViewProfileScreen";

export const ProfileScreenName = "Profile";

export type ProfileScreenParams = undefined;

export const ProfileScreen = () => {
  return <ProfileNavigator />;
};

export type ProfileHeaderInfo = {
  username: string;
  displayName: string;
  email: string;
  bio: string;
};

export type ProfileStatsInfo = { streakDays: number; totalWorkouts: number };

type ProfileStackScreenList = {
  ViewProfile: undefined;
  EditProfile: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackScreenList>();

export const useProfileStackNavigation = () =>
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
      <ProfileStack.Screen name="ViewProfile" component={ViewProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
};
