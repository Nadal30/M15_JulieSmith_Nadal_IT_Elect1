// CounterApp.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="➕ Increment" onPress={() => setCount(count + 1)} />
        <Button title="➖ Decrement" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  count: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
});