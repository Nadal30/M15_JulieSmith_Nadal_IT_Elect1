// App.js
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CounterApp from "./CounterApp";
import ColorChangerApp from "./ColorChangerApp";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <CounterApp />
        <ColorChangerApp />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: "center",
    paddingVertical: 40,
  },
});