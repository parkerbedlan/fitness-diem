import { useNavigation, useRoute } from "@react-navigation/core";
import { RootNavigation, RootRoute } from "../types/navigationTypes";

export const useRootScreen = () => ({
  navigation: useNavigation<RootNavigation>(),
  route: useRoute<RootRoute>(),
});
