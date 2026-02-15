import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "SUA_CHAVE_API",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializa o Firebase Auth com AsyncStorage para persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };

export default app;
