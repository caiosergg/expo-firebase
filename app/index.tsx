import { FormUsers } from "@/src/FormUsers";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";

import { Anton_400Regular, useFonts } from "@expo-google-fonts/anton";

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

  //
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
  });

  if (!fontsLoaded) return null; // Aguarda carregar a fonte

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
    <SafeAreaView style={styles.container}>
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

      <Text style={styles.title}>FireAuth</Text>

      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email..."
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></TextInput>

      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Senha
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha..."
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      <TouchableOpacity
        style={[styles.button, { marginTop: 8, marginBottom: 8 }]}
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
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001f3f",
    flex: 1,
    paddingTop: 20,
  },
  input: {
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    padding: 8,
    borderColor: "#fff",
    marginBottom: 8,
    color: "#fff",
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
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 48,
    fontFamily: "Anton_400Regular",
    color: "#00f5ff",
    alignSelf: "center",
    letterSpacing: 3,
    textTransform: "uppercase",
    textShadowColor: "red",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
  },
});
