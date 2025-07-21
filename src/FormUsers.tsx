import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db } from "./firebaseConnection";

import { UsersList } from "./users";

type User = {
  id: string;
  nome: string;
  idade: number;
  cargo: string;
};

type NewUser = {
  nome: string;
  idade: number;
  cargo?: string;
};

export function FormUsers() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");

  // Estado para controlar a exibição do formulário
  const [showForm, setShowForm] = useState(false);

  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState<User[]>([]);

  // Estado para controlar a edição de usuários
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    async function getDados() {
      /* // Obtém o documento com ID "1" da coleção "users"
      const docref = doc(db, "users", "1");
      // Busca os dados do documento
      getDoc(docref)
        .then((snapshot) => {
          setNome(snapshot.data()?.nome || "Nome não encontrado");
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        }); */

      /* // Escuta as mudanças no documento em tempo real
      // Isso permite que o aplicativo reaja a alterações no documento sem precisar recarregar
      onSnapshot(doc(db, "users", "1"), (snapshot) => {
        setNome(snapshot.data()?.nome || "Nome não encontrado");
      }); */

      // Obtém todos os documentos da coleção "users"
      const usersRef = collection(db, "users");

      /* // Busca os dados de todos os documentos na coleção
      getDocs(usersRef)
        .then((snapshot) => {
          let lista: { id: any; nome: any; idade: any; cargo: any }[] = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              idade: doc.data().idade,
              cargo: doc.data().cargo,
            });
          });

          setUsers(lista);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        }); */

      // Escuta as mudanças na coleção "users" em tempo real
      onSnapshot(usersRef, (snapshot) => {
        let lista: User[] = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          });
        });
        // Atualiza o estado com a lista de usuários
        setUsers(lista);
      });
    }

    getDados();
  }, []);

  async function handleRegister({ nome, idade, cargo }: NewUser) {
    /* // Adiciona um novo documento na coleção "users"
    await setDoc(doc(db, "users", "2"), {
      nome: "Maria",
      idade: 20,
      cargo: "Frontend",
    })
      .then(() => {
        console.log("Dados salvos com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao salvar dados", error);
      }); */

    // Adiciona um novo documento na coleção "users" com um ID gerado automaticamente
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log("Dados salvos com sucesso!");
        // Limpa os campos após salvar
        setNome("");
        setIdade("");
        setCargo("");
      })
      .catch((error) => {
        console.error("Erro ao salvar dados", error);
      });
  }

  // Função para esconder o formulário
  function handleToggle() {
    setShowForm(!showForm);
  }

  // Função para editar um usuário
  function editUser(data: User) {
    setNome(data.nome);
    setIdade(String(data.idade));
    setCargo(data.cargo);
    setIsEditing(data.id);
  }

  // Função para lidar com a edição do usuário
  async function handleEditUser() {
    const docRef = doc(db, "users", isEditing);
    await updateDoc(docRef, {
      nome: nome,
      idade: Number(idade),
      cargo: cargo,
    });

    setNome("");
    setIdade("");
    setCargo("");
    setIsEditing("");
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <SafeAreaView style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cargo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          {isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handleEditUser}>
              <Text style={styles.buttonText}>Editar usuário</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleRegister({ nome, idade: Number(idade), cargo })
              }
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity onPress={handleToggle} style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {showForm ? "Esconder Formulário" : "Mostrar Formulário"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 10,
          marginLeft: 16,
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Usuários
      </Text>
      <FlatList<User>
        style={styles.list}
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UsersList data={item} handleEdit={(item) => editUser(item)} />
        )}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
        <Text style={{ color: "#fff" }}>Sair da conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001f3f",
  },
  button: {
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    padding: 8,
    textAlign: "center",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    padding: 6,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    color: "#fff",
    borderColor: "#fff",
  },
  list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonLogout: {
    backgroundColor: "red",
    alignSelf: "center",
    margin: 8,
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  title: {
    marginBottom: 8,
    fontSize: 30,
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
