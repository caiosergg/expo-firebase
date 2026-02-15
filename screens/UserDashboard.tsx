import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebaseConnection";

type User = {
  email: string | null;
  uid: string;
};

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      setUsers([{ email: auth.currentUser.email, uid: auth.currentUser.uid }]);
    }
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FireAuth</Text>
      <Text style={styles.subtitle}>Usuário logado</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.uid!}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>Email: {item.email}</Text>
          </View>
        )}
        style={{ marginBottom: 30 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0f2f",
    padding: 20,
    justifyContent: "center",
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
  userCard: {
    backgroundColor: "#0F355A",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#00f5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#00f5ff",
  },
  userText: {
    color: "#00f5ff",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 14,
    textShadowColor: "magenta",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: "#0F355A",
    padding: 18,
    borderRadius: 16,
    shadowColor: "magenta",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 14,
  },
  buttonText: {
    color: "#00f5ff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    fontSize: 18,
    textShadowColor: "red",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Anton_400Regular",
    color: "#00f5ff",
    alignSelf: "center",
    marginBottom: 24,
    letterSpacing: 2,
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    textTransform: "uppercase",
  },
});
