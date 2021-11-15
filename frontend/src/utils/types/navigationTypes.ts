import {
  DefaultNavigatorOptions,
  DrawerNavigationState,
  DrawerRouterOptions,
  ParamListBase,
  RouteProp,
  TypedNavigator,
} from "@react-navigation/core";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import {
  DrawerNavigationConfig,
  DrawerNavigationEventMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenName, HomeScreenParams } from "../../screens/HomeScreen";
import { LoginScreenName, LoginScreenParams } from "../../screens/LoginScreen";
import {
  MessagesScreenName,
  MessagesScreenParams,
} from "../../screens/MessagesScreen";
import {
  ProfileScreenName,
  ProfileScreenParams,
} from "../../screens/ProfileScreen";
import {
  SignupScreenName,
  SignupScreenParams,
} from "../../screens/SignupScreen";

export type RootScreenList = {
  [HomeScreenName]: HomeScreenParams;
  [SignupScreenName]: SignupScreenParams;
  [LoginScreenName]: LoginScreenParams;
  [ProfileScreenName]: ProfileScreenParams;
  [MessagesScreenName]: MessagesScreenParams;
};

export type RootNavigation = NativeStackNavigationProp<
  RootScreenList,
  keyof RootScreenList
>;

export type RootRoute = RouteProp<RootScreenList, keyof RootScreenList>;

export type RootDrawerType = TypedNavigator<
  RootScreenList,
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap,
  ({
    initialRouteName,
    defaultStatus: customDefaultStatus,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    ...restWithDeprecated
  }: DefaultNavigatorOptions<
    ParamListBase,
    DrawerNavigationState<ParamListBase>,
    DrawerNavigationOptions,
    DrawerNavigationEventMap
  > &
    DrawerRouterOptions &
    DrawerNavigationConfig) => JSX.Element
>;

export type NavIcon =
  | ((props: {
      focused: boolean;
      size: number;
      color: string;
    }) => React.ReactNode)
  | undefined;
