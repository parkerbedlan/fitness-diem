import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { setNotificationHandler } from "expo-notifications";
import React from "react";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { useNavigator } from "../utils/hooks/useNavigator";
import { useRootScreen } from "../utils/hooks/useRootScreen";
import {
    NewWorkoutScreen,
    NewWorkoutScreenName,
    NewWorkoutScreenParams,
} from "./Workouts/NewWorkoutScreen";
import {
  MainWorkoutsScreen,
  MainWorkoutsScreenName,
  MainWorkoutsScreenParams,
} from "./Workouts/MainWorkoutsScreen";


export const WorkoutsScreenName = "Workouts";

export type WorkoutsScreenParams = undefined;

export const WorkoutsScreen = () => <WorkoutsNavigator />;

type WorkoutsStackScreenList = {
  [MainWorkoutsScreenName]: MainWorkoutsScreenParams;
  [NewWorkoutScreenName]: NewWorkoutScreenParams;
};

export const { Stack: MessagesStack, useScreen: useWorkoutsStackScreen } =
  useNavigator<WorkoutsStackScreenList>();

const WorkoutsNavigator = () => {
  const { navigation: rootNavigation } = useRootScreen();
  useIsAuth(rootNavigation, useIsFocused());

  useFocusEffect(() => {
    return () => {
      setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    };
  });

  return (
    <MessagesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainWorkouts"
    >
      <MessagesStack.Screen
        name="MainWorkouts"
        component={MainWorkoutsScreen}
      />
      <MessagesStack.Screen
        name="NewWorkout"
        component={NewWorkoutScreen}
      />
    </MessagesStack.Navigator>
  );
};
