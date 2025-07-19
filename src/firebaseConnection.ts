import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "expofire-3ac95.firebaseapp.com",
  projectId: "expofire-3ac95",
  storageBucket: "expofire-3ac95.firebasestorage.app",
  messagingSenderId: "914008467371",
  appId: "1:914008467371:web:bdfc32a22a08b3a5c4d4ee",
  measurementId: "G-ZCLDEZT4Q6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
