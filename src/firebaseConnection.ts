import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "expofire-3ac95.firebaseapp.com",
  projectId: "expofire-3ac95",
  storageBucket: "expofire-3ac95.firebasestorage.app",
  messagingSenderId: "914008467371",
  appId: "1:914008467371:web:bdfc32a22a08b3a5c4d4ee",
  measurementId: "G-ZCLDEZT4Q6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializa o Firebase Auth com AsyncStorage para persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };
