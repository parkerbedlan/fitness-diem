import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, Icon, Input, Text } from "react-native-elements";
import CenteredContainer from "../components/CenteredContainer";
import { useRootScreen } from "./RootScreensManager";
import * as yup from "yup";
import { yupSchemaEmailAndPassword } from "./LoginScreen";
import LineBreak from "../components/LineBreak";
import FormikInput from "../components/FormikInput";
import tw from "tailwind-react-native-classnames";
import BigButton from "../components/BigButton";

export default function SignupScreen() {
  const { navigation, route } = useRootScreen("Sign Up");

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
            navigation.navigate("Home", { email: values.email });
            setSubmitting(false);
          }, 1000);
        }}
        validationSchema={yup.object({
          email: yupSchemaEmailAndPassword.email,
          username: yup
            .string()
            .required("You must select a username.")
            .min(4, "Your username must contain at least 4 characters.")
            .max(15, "Your username cannot be more than 15 characters.")
            .matches(
              /^[A-Za-z0-9]+$/,
              "Your username can contain letters and numbers only."
            ),
          password: yupSchemaEmailAndPassword.password
            // .min(8, "Password must contain at least 8 characters.")
            .matches(/.*\d.*/, "Password must contain at least one number")
            .matches(
              /.*[A-Z].*/,
              "Password must contain at least one uppercase letter."
            )
            .matches(
              /.*[a-z].*/,
              "Password must contain at least one lowercase letter."
            ),
          confirmPassword: yup
            .string()
            .required("Please re-enter your selected password.")
            .equals([yup.ref("password")], "Passwords must match."),
        })}
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
