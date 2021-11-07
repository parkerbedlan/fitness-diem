import { Formik } from "formik";
import React from "react";
import { Icon, Text } from "react-native-elements";
import { toErrorMap } from "../utils/toErrorMap";
import BigButton from "../components/BigButton";
import CenteredContainer from "../components/CenteredContainer";
import FormikInput from "../components/FormikInput";
import LineBreak from "../components/LineBreak";
import { HomeScreenName } from "./HomeScreen";
import { useRootScreen } from "./RootScreensManager";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { useAuthSkip } from "../utils/hooks/useAuthSkip";
import { useIsFocused } from "@react-navigation/core";

export const SignupScreenName = "Sign Up";

export type SignupScreenParams = { usernameOrEmail: string | undefined };

function SignupScreen() {
  const { navigation, route } = useRootScreen(SignupScreenName);
  useAuthSkip(navigation, useIsFocused());
  const [register] = useRegisterMutation();

  return (
    <CenteredContainer>
      <Text h4>Sign up and seize your fitness!</Text>
      <LineBreak />
      <Formik
        initialValues={{
          email: route.params?.usernameOrEmail?.includes("@")
            ? route.params.usernameOrEmail
            : "",
          username:
            route.params?.usernameOrEmail &&
            !route.params.usernameOrEmail.includes("@")
              ? route.params?.usernameOrEmail
              : "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            navigation.navigate(HomeScreenName);
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <FormikInput
              name="email"
              label="Email"
              placeholder="joe@mama.edu"
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

export default SignupScreen;
