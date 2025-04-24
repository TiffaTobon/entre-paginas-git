// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración que copias de la consola de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWAklFq6B20iUkHzTEX2WUtL1wRBXR4JI",
    authDomain: "entrepaginas-95e9d.firebaseapp.com",
    projectId: "entrepaginas-95e9d",
    storageBucket: "entrepaginas-95e9d.firebasestorage.app",
    messagingSenderId: "675168897516",
    appId: "1:675168897516:web:d6090efa6df676f9a298c9",
    measurementId: "G-2GRL2174MS"
  };
// Inicializar la app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
