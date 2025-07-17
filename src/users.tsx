import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  data: {
    id: string;
    nome: string;
    idade: number;
    cargo: string;
  };
};

export default function UsersList({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text>Nome: {data.nome}</Text>
      <Text>Idade: {data.idade}</Text>
      <Text>Cargo: {data.cargo}</Text>
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
});
