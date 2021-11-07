import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { HomeScreenName } from "../../screens/HomeScreen";
import { RootNavigation } from "../types/navigationTypes";

export const useAuthSkip = (navigation: RootNavigation, isFocused: boolean) => {
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (isFocused && !loading && data?.me) {
      navigation.navigate(HomeScreenName);
    }
  }, [data, loading, navigation, isFocused]);
};
