import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import { useLogoutMutation } from "../generated/graphql";
import HomeScreen, { HomeScreenName } from "../screens/HomeScreen";
import LoginScreen, { LoginScreenName } from "../screens/LoginScreen";
import { ProfileScreenName, ProfileScreen } from "../screens/ProfileScreen";
import SignupScreen, { SignupScreenName } from "../screens/SignupScreen";
import UploadTestScreen, { UploadTestName } from "../screens/UploadTestScreen";
import { updateLogout } from "../utils/GraphQLUtils";
import { nameToNavIcon } from "../utils/nameToNavIcon";
import {
  NavIcon,
  RootDrawerType,
  RootScreenList,
} from "../utils/types/navigationTypes";

type RootNavigatorProps = {
  Drawer: RootDrawerType;
};

export const RootNavigator: React.FC<RootNavigatorProps> = ({ Drawer }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={LoginScreenName}
        backBehavior="history"
        drawerContent={(props) => (
          <RootDrawerContent
            {...props}
            drawerOmissions={[LoginScreenName, SignupScreenName]}
            defaultIcon={nameToNavIcon("chevron-right")}
          />
        )}
        screenOptions={{
          headerStyle: tw`bg-purple-500`,
          headerTitleStyle: tw`text-white`,
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen
          name={HomeScreenName}
          component={HomeScreen}
          options={{
            title: "Welcome",
            drawerIcon: nameToNavIcon("home"),
          }}
        />
        <Drawer.Screen
          name={ProfileScreenName}
          component={ProfileScreen}
          options={{
            drawerIcon: nameToNavIcon("account-circle"),
          }}
        />
        {/* IMPORTANT NOTE: always keep the drawer omissions last in the drawer order!*/}
        <Drawer.Screen
          name={LoginScreenName}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name={SignupScreenName}
          component={SignupScreen}
          options={{
            header: ({ navigation }) => {
              return (
                <Header
                  leftComponent={
                    <Button
                      icon={<Icon name="chevron-left" color="white" />}
                      title="Back"
                      onPress={() => {
                        navigation.navigate(LoginScreenName);
                      }}
                    />
                  }
                  backgroundColor="#8B5CF6"
                />
              );
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export const RootDrawerContent: React.FC<
  DrawerContentComponentProps & {
    drawerOmissions: (keyof RootScreenList)[];
    defaultIcon: NavIcon;
  }
> = (props) => {
  const [logout] = useLogoutMutation();

  const prepareState = (
    oldState: typeof props.state,
    drawerOmissions: (keyof RootScreenList)[]
  ) => {
    // filter out drawer omissions
    const newState = { ...oldState };
    newState.routes = newState.routes.filter(
      (route) => !drawerOmissions.includes(route.name as keyof RootScreenList)
    );
    newState.routeNames = newState.routeNames.filter(
      (routeName) =>
        !drawerOmissions.includes(routeName as keyof RootScreenList)
    );

    // avoid index out of bounds exception
    if (newState.index > newState.routes.length - 1) {
      newState.index = 0;
      newState.history = [];
    }
    return newState;
  };

  const prepareDescriptors = (
    oldDescriptors: typeof descriptors,
    drawerOmissions: (keyof RootScreenList)[],
    defaultIcon: NavIcon
  ) => {
    // filter out drawer omissions
    const newDescriptors = { ...oldDescriptors };
    Object.keys(oldDescriptors).map((key) => {
      const descriptor = oldDescriptors[key];
      if (
        drawerOmissions.includes(descriptor.route.name as keyof RootScreenList)
      ) {
        delete newDescriptors[key];
      }
    });

    // add default icons
    Object.keys(newDescriptors).map((key) => {
      const descriptor = oldDescriptors[key];
      if (!descriptor.options.drawerIcon) {
        newDescriptors[key].options.drawerIcon = defaultIcon;
      }
    });
    return newDescriptors;
  };

  const { state, descriptors, navigation, drawerOmissions, defaultIcon } =
    props;
  const newState = prepareState(state, drawerOmissions);
  const newDescriptors = prepareDescriptors(
    descriptors,
    drawerOmissions,
    defaultIcon
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList
        state={newState}
        descriptors={newDescriptors}
        navigation={navigation}
      />
      <DrawerItem
        label="Log out"
        icon={nameToNavIcon("logout")}
        onPress={() => {
          logout({ update: updateLogout });
        }}
      />
    </DrawerContentScrollView>
  );
};
