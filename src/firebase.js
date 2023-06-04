import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgWo1iy-rgHou3dI3BdNaSd-j8mWVtZPI",
  authDomain: "myeventorg-10681.firebaseapp.com",
  projectId: "myeventorg-10681",
  storageBucket: "myeventorg-10681.appspot.com",
  messagingSenderId: "143151294569",
  appId: "1:143151294569:web:020d9432e45a48487fdaf8",
  measurementId: "G-W49Q74TTY4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
