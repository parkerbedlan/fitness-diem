import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenParams, HomeScreenName } from "./HomeScreen";
import { LoginScreenName, LoginScreenParams } from "./LoginScreen";
import { SignupScreenName, SignupScreenParams } from "./SignupScreen";
import { UploadTestName, UploadTestParams } from "./UploadTestScreen";

export type RootScreenList = {
  [HomeScreenName]: HomeScreenParams;
  [SignupScreenName]: SignupScreenParams;
  [LoginScreenName]: LoginScreenParams;
  [UploadTestName]: UploadTestParams;
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
