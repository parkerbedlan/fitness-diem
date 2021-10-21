import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { LoginScreenName } from "../../screens/LoginScreen";
import { RootNavigation } from "../../screens/RootScreensManager";

export const useIsAuth = (navigation: RootNavigation) => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      navigation.navigate(LoginScreenName);
    }
  }, [data, fetching, navigation]);
};
