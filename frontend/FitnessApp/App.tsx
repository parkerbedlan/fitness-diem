import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, Button, Input, Text } from "react-native-elements";

export default function App() {
  const [message, setMessage] = useState("");

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Fitness Dium!</Text>
          <LineBreak />
          <StatusBar style="auto" />
          <Input
            placeholder="Your Message Here"
            value={message}
            onChangeText={setMessage}
          />
          <Button
            raised
            onPress={() => console.log("hi")}
            title="Press Me"
            buttonStyle={styles.testButton}
            titleStyle={styles.title}
          />
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
