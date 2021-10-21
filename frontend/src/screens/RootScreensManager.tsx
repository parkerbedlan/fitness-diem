import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootScreenList = {
  Home: { email: string };
  "Sign Up": { email: string | undefined };
  "Log in": undefined;
  "Workout Library": undefined;
};

export const useRootScreen = (routeName: keyof RootScreenList) => ({
  navigation:
    useNavigation<
      NativeStackNavigationProp<RootScreenList, typeof routeName>
    >(),
  route: useRoute<RouteProp<RootScreenList, typeof routeName>>(),
});
