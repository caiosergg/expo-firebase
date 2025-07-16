import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnO2R5WP3Br1gtBqFmgLQdx55sm4A6Qi8",
  authDomain: "fireexpo-89137.firebaseapp.com",
  projectId: "fireexpo-89137",
  storageBucket: "fireexpo-89137.firebasestorage.app",
  messagingSenderId: "130064611822",
  appId: "1:130064611822:web:2591b3dad007ef85fe76ff",
  measurementId: "G-CSKL8R6YF8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
