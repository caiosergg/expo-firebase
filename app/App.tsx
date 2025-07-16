import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../src/firebaseConnection";

export default function App() {
  const [nome, setNome] = useState("Carregando...");

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

      onSnapshot(doc(db, "users", "1"), (snapshot) => {
        setNome(snapshot.data()?.nome || "Nome não encontrado");
      });
    }
    getDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Nome: {nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
