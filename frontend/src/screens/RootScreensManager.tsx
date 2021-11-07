import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";
import { updateLogout } from "../utils/GraphQLUtils";
import { nameToNavIcon, NavIcon } from "../utils/ReactNavigationUtils";
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

export const RootDrawerContent: React.FC<
  DrawerContentComponentProps & {
    drawerOmissions: (keyof RootScreenList)[];
    defaultIcon: NavIcon;
  }
> = (props) => {
  const [logout] = useLogoutMutation();

  const prepareState = (
    oldState: typeof props.state,
    drawerOmissions: (keyof RootScreenList)[]
  ) => {
    // filter out drawer omissions
    const newState = { ...oldState };
    newState.routes = newState.routes.filter(
      (route) => !drawerOmissions.includes(route.name as keyof RootScreenList)
    );
    newState.routeNames = newState.routeNames.filter(
      (routeName) =>
        !drawerOmissions.includes(routeName as keyof RootScreenList)
    );

    // avoid index out of bounds exception
    if (newState.index > newState.routes.length - 1) {
      newState.index = 0;
      newState.history = [];
    }
    return newState;
  };

  const prepareDescriptors = (
    oldDescriptors: typeof descriptors,
    drawerOmissions: (keyof RootScreenList)[],
    defaultIcon: NavIcon
  ) => {
    // filter out drawer omissions
    const newDescriptors = { ...oldDescriptors };
    Object.keys(oldDescriptors).map((key) => {
      const descriptor = oldDescriptors[key];
      if (
        drawerOmissions.includes(descriptor.route.name as keyof RootScreenList)
      ) {
        delete newDescriptors[key];
      }
    });

    // add default icons
    Object.keys(newDescriptors).map((key) => {
      const descriptor = oldDescriptors[key];
      if (!descriptor.options.drawerIcon) {
        newDescriptors[key].options.drawerIcon = defaultIcon;
      }
    });
    return newDescriptors;
  };

  const { state, descriptors, navigation, drawerOmissions, defaultIcon } =
    props;
  const newState = prepareState(state, drawerOmissions);
  const newDescriptors = prepareDescriptors(
    descriptors,
    drawerOmissions,
    defaultIcon
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList
        state={newState}
        descriptors={newDescriptors}
        navigation={navigation}
      />
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
