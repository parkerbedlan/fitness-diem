import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FitnessDiumRoutinesScreenName,
  FitnessDiumRoutinesScreenParams,
} from "./FitnessDiumRoutinesScreen";
import { HomeScreenParams, HomeScreenName } from "./HomeScreen";
import { LoginScreenName, LoginScreenParams } from "./LoginScreen";
import { MyRegimenScreenName, MyRegimenScreenParams } from "./MyRegimensScreen";
import {
  RegimenLibraryScreenName,
  RegimenLibraryScreenParams,
} from "./RegimenLibraryScreen";
import { SignupScreenName, SignupScreenParams } from "./SignupScreen";

export type RootScreenList = {
  [HomeScreenName]: HomeScreenParams;
  [SignupScreenName]: SignupScreenParams;
  [LoginScreenName]: LoginScreenParams;
  [RegimenLibraryScreenName]: RegimenLibraryScreenParams;
  [MyRegimenScreenName]: MyRegimenScreenParams;
  [FitnessDiumRoutinesScreenName]: FitnessDiumRoutinesScreenParams;
};

export const useRootScreen = (routeName: keyof RootScreenList) => ({
  navigation:
    useNavigation<
      NativeStackNavigationProp<RootScreenList, typeof routeName>
    >(),
  route: useRoute<RouteProp<RootScreenList, typeof routeName>>(),
});
