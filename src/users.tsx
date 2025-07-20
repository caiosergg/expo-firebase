import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "./firebaseConnection";

type User = {
  id: string;
  nome: string;
  idade: number;
  cargo: string;
};

type Props = {
  data: User;
  handleEdit: (item: User) => void;
};

export function UsersList({ data, handleEdit }: Props) {
  // Função para lidar com a exclusão do usuário
  async function handleDeleteItem() {
    const docRef = doc(db, "users", data.id);
    try {
      // Deleta o documento do Firestore
      await deleteDoc(docRef);
      console.log("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  // Função para lidar com a edição do usuário
  function handleEditUser() {
    handleEdit(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Nome: {data.nome}</Text>
      <Text style={styles.item}>Idade: {data.idade}</Text>
      <Text style={styles.item}>Cargo: {data.cargo}</Text>

      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Deletar usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEdit} onPress={handleEditUser}>
        <Text style={styles.buttonText}>Editar usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 14,
  },
  item: {
    color: "#000",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#001f3f",
    padding: 4,
    borderRadius: 4,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonEdit: {
    backgroundColor: "#000",
    alignSelf: "flex-start",
    padding: 4,
    borderRadius: 4,
    marginTop: 16,
  },
});
