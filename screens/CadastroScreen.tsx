import { createUserWithEmailAndPassword } from "firebase/auth";
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
  onCadastroSuccess: (email: string, uid: string) => void;
  onVoltar: () => void;
};

export function CadastroScreen({ onCadastroSuccess, onVoltar }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreateUser() {
    if (!email || !password) {
      alert("Email e senha são obrigatórios!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      alert("Usuário criado com sucesso!");
      onCadastroSuccess(
        userCredential.user.email || "",
        userCredential.user.uid,
      );
    } catch (error: any) {
      alert("Erro ao criar usuário: " + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireAuth</Text>
      <Text style={styles.subtitle}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um email..."
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite uma senha..."
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555" }]}
        onPress={onVoltar}
      >
        <Text style={styles.buttonText}>Voltar</Text>
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
    marginBottom: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 25,
    fontFamily: "Anton_400Regular",
    color: "#00f5ff",
    alignSelf: "center",
    marginBottom: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
});
