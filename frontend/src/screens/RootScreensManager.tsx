import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenParams, HomeScreenName } from "./HomeScreen";
import { LoginScreenName, LoginScreenParams } from "./LoginScreen";
import { SignupScreenName, SignupScreenParams } from "./SignupScreen";
import { WorkoutsScreenName, WorkoutsScreenParams } from "./WorkoutsScreen";

export type RootScreenList = {
  [HomeScreenName]: HomeScreenParams;
  [SignupScreenName]: SignupScreenParams;
  [LoginScreenName]: LoginScreenParams;
  [WorkoutsScreenName]: WorkoutsScreenParams;
};

export const useRootScreen = (routeName: keyof RootScreenList) => ({
  navigation:
    useNavigation<
      NativeStackNavigationProp<RootScreenList, typeof routeName>
    >(),
  route: useRoute<RouteProp<RootScreenList, typeof routeName>>(),
});
