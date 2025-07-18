import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbUOhP-y-SKZUz1TYo6vhM3SZ-QWoCyAU",
  authDomain: "expofire-d58ff.firebaseapp.com",
  projectId: "expofire-d58ff",
  storageBucket: "expofire-d58ff.firebasestorage.app",
  messagingSenderId: "154032791390",
  appId: "1:154032791390:web:1c458572025af0000439cf",
  measurementId: "G-EBG36WQ204",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
