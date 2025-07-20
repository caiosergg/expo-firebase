import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../src/firebaseConnection";

export default function App() {
  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(
      auth,
      "caio@email.com",
      "123123"
    );
    console.log(user);
  }

  return (
    <View style={styles.container}>
      {/*<FormUsers />*/}
      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Email</Text>
      <TextInput
        placeholder="Digite seu email..."
        style={styles.input}
      ></TextInput>

      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Senha</Text>
      <TextInput
        placeholder="Digite seu senha..."
        style={styles.input}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  input: {
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
