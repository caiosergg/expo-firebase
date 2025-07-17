import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../src/firebaseConnection";

type Props = {
  nome: string;
  idade: number;
  cargo?: string;
};

export default function App() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");

  // Estado para controlar a exibição do formulário
  const [showForm, setShowForm] = useState(false);

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
      /* Escuta as mudanças no documento em tempo real
      Isso permite que o aplicativo reaja a alterações no documento sem precisar recarregar
      onSnapshot(doc(db, "users", "1"), (snapshot) => {
        setNome(snapshot.data()?.nome || "Nome não encontrado");
      }); */
    }

    getDados();
  }, []);

  async function handleRegister({ nome, idade, cargo }: Props) {
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

  return (
    <View style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleRegister({ nome, idade: Number(idade), cargo })
            }
          >
            <Text style={styles.buttonText}>Pressione aqui</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleToggle} style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder Formulário" : "Mostrar Formulário"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  button: {
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    padding: 8,
    textAlign: "center",
  },
  label: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold",
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});
