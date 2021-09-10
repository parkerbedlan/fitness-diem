import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, Button, Input, Text } from "react-native-elements";
import useSWR from "swr";

export default function App() {
  const [userInput, setUserInput] = useState("");

  const { message, isLoading } = useHelloWorld();
  const [isVisibleHelloWorld, setIsVisibleHelloWorld] = useState(true);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Fitness Dium!</Text>
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
            buttonStyle={styles.testButton}
            titleStyle={styles.title}
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
              <Text h1 style={{ color: "red" }}>
                {isLoading ? "Loading..." : message}
              </Text>
            </View>
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

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
