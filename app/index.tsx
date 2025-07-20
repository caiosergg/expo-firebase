import { FormUsers } from "@/src/FormUsers";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../src/firebaseConnection";

type User = {
  email: string | null;
  uid: string;
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
        // Se houver usuário autenticado, define o estado de loading como false
        setLoading(false);
        return;
      }
      setAuthUser(null);
      setLoading(false);
    });
  }, []);

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário criado com sucesso!", user);
  }
  async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("Usuário logado com sucesso!", user);
        setAuthUser({
          email: user.user.email,
          uid: user.user.uid,
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          console.log("Credenciais inválidas. Verifique o email e a senha.");
        }
      });
  }

  async function handleLogout() {
    await signOut(auth);
    setAuthUser(null);
  }

  if (authUser) {
    return (
      <View style={styles.container}>
        <FormUsers />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*Exibe uma mensagem de carregamento enquanto aguarda a autenticação*/}
      {loading && (
        <Text
          style={{
            fontSize: 20,
            marginLeft: 8,
            marginBottom: 8,
            color: "#000",
          }}
        >
          Carregando informações...
        </Text>
      )}

      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Email</Text>
      <TextInput
        placeholder="Digite seu email..."
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></TextInput>

      <Text style={{ marginLeft: 8, fontSize: 18, color: "#000" }}>Senha</Text>
      <TextInput
        placeholder="Digite seu senha..."
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 8 }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 8 }]}
        onPress={handleCreateUser}
      >
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      {authUser && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      )}
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
