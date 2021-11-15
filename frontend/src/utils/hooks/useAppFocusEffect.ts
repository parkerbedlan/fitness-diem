import { useFocusEffect } from "@react-navigation/core";
import { useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useAppFocusEffect = (effect: () => void) => {
  const appState = useRef(AppState.currentState);
  useFocusEffect(() => {
    const changeListener = (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      // console.log("AppState", appState.current);
      if (appState.current === "active") effect();
    };

    AppState.addEventListener("change", changeListener);
    return () => {
      AppState.removeEventListener("change", changeListener);
    };
  });
};
