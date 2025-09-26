// ColorChangerApp.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ColorChangerApp() {
  const [bgColor, setBgColor] = useState("#FFFFFF");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>Color Changer App</Text>
      <View style={styles.buttonRow}>
        <Button title="White" onPress={() => setBgColor("#FFFFFF")} />
        <Button title="Light Blue" onPress={() => setBgColor("#ADD8E6")} />
        <Button title="Light Green" onPress={() => setBgColor("#90EE90")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
});