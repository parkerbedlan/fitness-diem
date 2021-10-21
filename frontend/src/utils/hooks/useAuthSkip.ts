import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { HomeScreenName } from "../../screens/HomeScreen";
import { RootNavigation } from "../../screens/RootScreensManager";

export const useAuthSkip = (navigation: RootNavigation) => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && data?.me) {
      navigation.navigate(HomeScreenName);
    }
  }, [data, fetching, navigation]);
};
