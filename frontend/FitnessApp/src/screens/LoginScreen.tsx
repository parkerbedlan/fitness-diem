import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Input, Icon, Text, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import LineBreak from "../components/LineBreak";
import * as yup from "yup";
import { useRootScreen } from "./RootScreensManager";
import FormikInput from "../components/FormikInput";
import BigButton from "../components/BigButton";

export default function LoginScreen() {
  const { navigation } = useRootScreen("Log in");

  const handleSignup = (email?: string) => {
    navigation.navigate("Sign Up", { email });
  };

  return (
    <CenteredContainer>
      <Text style={tw`text-3xl`}>Welcome to Fitness Dium!</Text>
      <LineBreak />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("logging in with", values);
            navigation.navigate("Home", { email: values.email });
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
}

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
