import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type ScreenListType = Record<string, object | undefined>;

export const useNavigator = <ScreenList extends ScreenListType>() => {
  const Stack = createNativeStackNavigator<ScreenList>();

  type Navigation = NativeStackNavigationProp<ScreenList, keyof ScreenList>;
  type Route = RouteProp<ScreenList, keyof ScreenList>;
  const useScreen = () => ({
    navigation: useNavigation<Navigation>(),
    route: useRoute<Route>(),
  });

  return { Stack, useScreen };
};
