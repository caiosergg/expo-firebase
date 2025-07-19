import React from "react";
import { StyleSheet, View } from "react-native";
import { FormUsers } from "../src/FormUsers";

export default function App() {
  return (
    <View style={styles.container}>
      <FormUsers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
