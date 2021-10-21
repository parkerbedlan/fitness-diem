import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import * as yup from "yup";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import FormikInput from "../components/FormikInput";
import LineBreak from "../components/LineBreak";
import { useHelloQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { HomeScreenName } from "./HomeScreen";
import { useRootScreen } from "./RootScreensManager";
import { SignupScreenName } from "./SignupScreen";

export const LoginScreenName = "Log in";

export type LoginScreenParams = undefined;

const LoginScreen = () => {
  const { navigation } = useRootScreen(LoginScreenName);
  const [{ data, fetching }] = useHelloQuery();

  const handleSignup = (email?: string) => {
    navigation.navigate(SignupScreenName, { email });
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
      <LineBreak />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("logging in with", values);
            navigation.navigate(HomeScreenName, { email: values.email });
            setSubmitting(false);
          }, 1000);
        }}
        validationSchema={yup.object(yupSchemaEmailAndPassword)}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <>
            <FormikInput
              name="email"
              label="Email"
              placeholder="john@example.com"
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
              onSignup={() => handleSignup(values.email)}
              version={2}
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
  version,
  isLoading,
}: {
  onSubmit: any;
  onSignup: any;
  version: 1 | 2;
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

export const yupSchemaEmailAndPassword = {
  email: yup
    .string()
    .required("Please enter your email.")
    .email("Invalid email"),
  password: yup.string().required("Please enter your password."),
};

export default withUrqlClient(createUrqlClient)(LoginScreen);
