import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { LoginScreenName } from "../../screens/LoginScreen";
import { RootNavigation } from "../../screens/RootScreensManager";

export const useIsAuth = (navigation: RootNavigation, isFocused: boolean) => {
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (isFocused && !loading && !data?.me) {
      navigation.navigate(LoginScreenName);
    }
  }, [data, loading, navigation, isFocused]);
};
