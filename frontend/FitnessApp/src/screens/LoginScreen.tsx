import { FastField, Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Input, Icon, Text, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import CenteredContainer from "../components/CenteredContainer";
import LineBreak from "../components/LineBreak";
import * as yup from "yup";

type LoginScreenProps = {
  navigation: any;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const handleSignup = () => {
    console.log("signing up");
    navigation.navigate("Sign Up");
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
        validationSchema={yup.object({
          email: yup
            .string()
            .required("Please enter your email.")
            .email("Invalid email"),
          password: yup.string().required("Please enter your password."),
        })}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        }) => (
          <>
            <Input
              placeholder="john@example.com"
              value={values.email}
              onChangeText={handleChange("email")}
              label="Email"
              leftIcon={<Icon name="email" />}
              errorMessage={touched.email ? errors.email : ""}
            />
            <Input
              placeholder="password123"
              value={values.password}
              onChangeText={handleChange("password")}
              label="Password"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" />}
              errorMessage={touched.password ? errors.password : ""}
            />
            <LoginSignupButtonGroup
              onSubmit={handleSubmit}
              onSignup={handleSignup}
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
      <Button
        raised
        title="Log in"
        buttonStyle={tw`bg-purple-500 w-44 h-20`}
        titleStyle={tw`text-3xl p-3`}
        onPress={(e) => onSubmit()}
        loading={isLoading}
        loadingProps={{ size: "large" }}
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
