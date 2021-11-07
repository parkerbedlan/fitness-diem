import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";
import { updateLogout } from "../utils/GraphQLUtils";
import { nameToNavIcon } from "../utils/ReactNavigationUtils";
import { HomeScreenName, HomeScreenParams } from "./HomeScreen";
import { LoginScreenName, LoginScreenParams } from "./LoginScreen";
import { ProfileScreenName, ProfileScreenParams } from "./ProfileScreen";
import { SignupScreenName, SignupScreenParams } from "./SignupScreen";
import { UploadTestName, UploadTestParams } from "./UploadTestScreen";

export type RootScreenList = {
  [HomeScreenName]: HomeScreenParams;
  [SignupScreenName]: SignupScreenParams;
  [LoginScreenName]: LoginScreenParams;
  [UploadTestName]: UploadTestParams;
  [ProfileScreenName]: ProfileScreenParams;
};

export type RootNavigation = NativeStackNavigationProp<
  RootScreenList,
  keyof RootScreenList
>;

export type RootRoute = RouteProp<RootScreenList, keyof RootScreenList>;

export const useRootScreen = (routeName: keyof RootScreenList) => ({
  navigation: useNavigation<RootNavigation>(),
  route: useRoute<RootRoute>(),
});

export const RootDrawerContent: React.FC<DrawerContentComponentProps> = ({
  descriptors,
  navigation,
  state,
}) => {
  const [logout] = useLogoutMutation();

  const noDrawer = [LoginScreenName, SignupScreenName];
  const defaultIcon = nameToNavIcon("chevron-right");

  return (
    <DrawerContentScrollView>
      {state.routes
        .filter((route) => !noDrawer.includes(route.name))
        .map((route) => {
          return (
            <DrawerItem
              key={route.name}
              label={route.name}
              icon={descriptors[route.key].options.drawerIcon || defaultIcon}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      <DrawerItem
        label="Log out"
        icon={nameToNavIcon("logout")}
        onPress={() => {
          logout({ update: updateLogout });
        }}
      />
    </DrawerContentScrollView>
  );
};
