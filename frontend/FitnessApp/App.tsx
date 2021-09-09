import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  const [message, setMessage] = useState("Your Message Here");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fitness Dium!</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
  },
});
