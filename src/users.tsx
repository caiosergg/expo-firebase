import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  data: {
    id: string;
    nome: string;
    idade: number;
    cargo: string;
  };
};

export default function UsersList({ data }: Props) {
  const handleDeleteItem = () => {
    console.log(`Usuário ${data.nome} deletado!`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Nome: {data.nome}</Text>
      <Text style={styles.item}>Idade: {data.idade}</Text>
      <Text style={styles.item}>Cargo: {data.cargo}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Deletar usuário</Text>
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
});
