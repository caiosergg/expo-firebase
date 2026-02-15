import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebaseConnection";

type Props = {
  onNavigateToCadastro: () => void;
  onLoginSuccess: (email: string, uid: string) => void;
};

export function LoginScreen({ onNavigateToCadastro, onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      alert("Email e senha são obrigatórios!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      onLoginSuccess(userCredential.user.email || "", userCredential.user.uid);
    } catch (error: any) {
      alert("Erro ao logar: " + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireAuth</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email..."
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha..."
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onNavigateToCadastro}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0f2b",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00f5ff",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
    fontFamily: "Anton_400Regular",
    color: "#fff",
    letterSpacing: 2,
    textTransform: "lowercase",
    backgroundColor: "rgba(0, 245, 255, 0.05)",
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  button: {
    backgroundColor: "#0f355a",
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#00f5ff",
    letterSpacing: 4,
    textTransform: "uppercase",
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  title: {
    fontSize: 64,
    fontFamily: "Anton_400Regular",
    color: "#00f5ff",
    alignSelf: "center",
    marginBottom: 32,
    letterSpacing: 4,
    textTransform: "uppercase",
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
});
