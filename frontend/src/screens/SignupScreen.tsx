import { Formik } from "formik";
import React from "react";
import { Icon, Text } from "react-native-elements";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import FormikInput from "../components/FormikInput";
import LineBreak from "../components/LineBreak";
import { HomeScreenName } from "./HomeScreen";
import { useRootScreen } from "./RootScreensManager";

export const SignupScreenName = "Sign Up";

export type SignupScreenParams = { email: string | undefined };

export default function SignupScreen() {
  const { navigation, route } = useRootScreen(SignupScreenName);

  return (
    <CenteredContainer>
      <Text h4>Sign up and seize your fitness!</Text>
      <LineBreak />
      <Formik
        initialValues={{
          email: route.params?.email || "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("signing up with", values);
            navigation.navigate(HomeScreenName, { email: values.email });
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <FormikInput
              name="email"
              label="Email"
              placeholder="john@example.com"
              leftIcon={<Icon name="email" />}
            />
            <FormikInput
              name="username"
              label="Username"
              placeholder="RandomNinjaPizzaCat"
              leftIcon={<Icon name="badge" />}
            />
            <FormikInput
              name="password"
              label="Password"
              placeholder="password123"
              leftIcon={<Icon name="lock" />}
              secureTextEntry={true}
            />
            <FormikInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="password123"
              leftIcon={<Icon name="enhanced-encryption" />}
              secureTextEntry={true}
            />
            <BigButton
              title="Sign up"
              onPress={() => handleSubmit()}
              loading={isSubmitting}
            />
          </>
        )}
      </Formik>
    </CenteredContainer>
  );
}
