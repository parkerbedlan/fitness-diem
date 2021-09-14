import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, Button, Input, Text } from "react-native-elements";
import useSWR from "swr";
import tw from "tailwind-react-native-classnames";

export default function App() {
  const [userInput, setUserInput] = useState("");

  const { message, isLoading } = useHelloWorld();
  const [isVisibleHelloWorld, setIsVisibleHelloWorld] = useState(true);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View
          style={tw`bg-gray-50 h-full w-full flex justify-center items-center`}
        >
          <Text style={tw`text-3xl`}>Welcome to Fitness Dium!</Text>
          <LineBreak />
          <StatusBar style="auto" />
          <Input
            placeholder="Your Input Here"
            value={userInput}
            onChangeText={setUserInput}
          />
          <Button
            raised
            onPress={() => setIsVisibleHelloWorld(!isVisibleHelloWorld)}
            title="Press Me"
            buttonStyle={tw`w-48 h-24 bg-purple-500`}
            titleStyle={tw`text-3xl`}
          />
          {isVisibleHelloWorld && (
            <View
              style={{
                borderWidth: 1,
                margin: "5%",
                padding: "5%",
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text h1 style={tw`text-red-500`}>
                {isLoading ? "Loading..." : message}
              </Text>
            </View>
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const LineBreak = () => {
  return <Text>{"\n"}</Text>;
};

const useHelloWorld = () => {
  const { data, error, isValidating, mutate } = useSWR<HelloWorldType, string>(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );

  return {
    message: data ? data.address.city : null,
    isLoading: !data && !error,
    isError: error,
  };
};

type HelloWorldType = {
  address: { city: string };
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

// unnecessary, just used as an example of a StyleSheet equivalent using tailwind if we end up wanting to go this route
const twStyles = {
  container: tw`bg-gray-50 h-full w-full flex justify-center items-center`,
  title: tw`text-3xl`,
  testButton: tw`w-48 h-24 bg-purple-500`,
};

// use inline tailwind instead https://tailwindcss.com/docs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  testButton: {
    width: 200,
    height: 100,
  },
});
