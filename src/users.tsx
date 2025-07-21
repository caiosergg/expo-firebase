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
      <View style={styles.row}>
        <Text style={styles.item}>Nome: {data.nome}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
          <Text style={styles.buttonText}>Deletar usuário</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.item}>Idade: {data.idade}</Text>
        <TouchableOpacity style={styles.buttonEdit} onPress={handleEditUser}>
          <Text style={styles.buttonText}>Editar usuário</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.item}>Cargo: {data.cargo}</Text>
        <TouchableOpacity
          style={[styles.buttonEdit, { opacity: 0 }]}
          disabled={true}
        >
          <Text style={styles.buttonText}>rs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    color: "#000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
  },
  buttonEdit: {
    backgroundColor: "#000",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
