import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { toErrorMap } from "../utils/toErrorMap";
import tw from "tailwind-react-native-classnames";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import FormikInput from "../components/FormikInput";
import LineBreak from "../components/LineBreak";
import {
  useHelloQuery,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { HomeScreenName } from "./HomeScreen";
import { useRootScreen } from "./RootScreensManager";
import { SignupScreenName } from "./SignupScreen";
import { useAuthSkip } from "../utils/hooks/useAuthSkip";

export const LoginScreenName = "Log in";

export type LoginScreenParams = undefined;

const LoginScreen = () => {
  const { navigation } = useRootScreen(LoginScreenName);
  useAuthSkip(navigation);
  const [{ data, fetching }] = useHelloQuery();
  const [, login] = useLoginMutation();
  const [{ data: meData }] = useMeQuery();

  const handleSignup = (email?: string) => {
    navigation.navigate(SignupScreenName, { usernameOrEmail: email });
  };

  return (
    <CenteredContainer>
      <Text style={tw`text-3xl`}>Welcome to Fitness Dium!</Text>
      <Text style={tw`text-3xl text-red-500`}>
        {fetching
          ? "Loading..."
          : data
          ? data.hello
          : "couldn't connect to server"}
      </Text>
      <Text>{meData?.me?.username}</Text>
      <LineBreak />
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            navigation.navigate(HomeScreenName);
          }
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <>
            <FormikInput
              name="usernameOrEmail"
              label="Username or Email"
              placeholder="joe@mama.edu"
              leftIcon={<Icon name="email" />}
            />
            <FormikInput
              name="password"
              label="Password"
              placeholder="password123"
              leftIcon={<Icon name="lock" />}
              secureTextEntry={true}
            />
            <LoginSignupButtonGroup
              onSubmit={handleSubmit}
              onSignup={() => handleSignup(values.usernameOrEmail)}
              isLoading={isSubmitting}
            />
          </>
        )}
      </Formik>
    </CenteredContainer>
  );
};

const LoginSignupButtonGroup = ({
  onSubmit,
  onSignup,
  isLoading,
}: {
  onSubmit: any;
  onSignup: any;
  isLoading: boolean;
}) => {
  return (
    <View style={tw`flex justify-center items-center`}>
      <BigButton
        title="Log in"
        onPress={(e) => onSubmit()}
        loading={isLoading}
      />
      <View style={tw`mt-1`}>
        <Button
          type="clear"
          title="Don't have an account? Sign Up!"
          buttonStyle={tw`h-20`}
          titleStyle={tw`text-lg text-purple-800`}
          onPress={(e) => onSignup()}
        />
      </View>
    </View>
  );
};

export default withUrqlClient(createUrqlClient)(LoginScreen);
