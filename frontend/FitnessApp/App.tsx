import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ThemeProvider,
  Button,
  Input,
  Text,
  Icon,
} from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { Formik } from "formik";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View
          style={tw`bg-gray-50 h-full w-full flex justify-center items-center`}
        >
          <Text style={tw`text-3xl`}>Welcome to Fitness Dium!</Text>
          <LineBreak />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log("logging in with", values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Input
                  placeholder="john@example.com"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  label="Email"
                  leftIcon={<Icon name="email" />}
                />
                <Input
                  placeholder="password123"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  label="Password"
                  secureTextEntry={true}
                  leftIcon={<Icon name="lock" />}
                />
                <LoginSignupButtonGroup
                  handleSubmit={handleSubmit}
                  version={2}
                />
              </>
            )}
          </Formik>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const LineBreak = () => {
  return <Text>{"\n"}</Text>;
};

const LoginSignupButtonGroup = ({
  handleSubmit,
  version,
}: {
  handleSubmit: any;
  version: 1 | 2;
}) => {
  const versions = {
    1: (
      <View
        style={tw`flex flex-row w-full justify-center items-center justify-around mt-2`}
      >
        <Button
          raised
          title="Don't have an account? Sign Up!"
          buttonStyle={tw`bg-purple-500 w-44 h-20`}
          titleStyle={tw`text-lg`}
          onPress={(e) => console.log("signing up")}
        />
        <Button
          raised
          title="Log in"
          buttonStyle={tw`bg-purple-500 w-44 h-20`}
          titleStyle={tw`text-3xl p-3`}
          onPress={(e) => handleSubmit()}
        />
      </View>
    ),
    2: (
      <View style={tw`flex justify-center items-center`}>
        <Button
          raised
          title="Log in"
          buttonStyle={tw`bg-purple-500 w-44 h-20`}
          titleStyle={tw`text-3xl p-3`}
          onPress={(e) => handleSubmit()}
        />
        <View style={tw`mt-1`}>
          <Button
            type="clear"
            title="Don't have an account? Sign Up!"
            buttonStyle={tw`h-20`}
            titleStyle={tw`text-lg text-purple-800`}
            onPress={(e) => console.log("signing up")}
          />
        </View>
      </View>
    ),
  };
  return versions[version];
};
