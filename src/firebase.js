import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-wy_ckQeaAAyjclI0RhIhg4eWA8kI8V0",
  authDomain: "myeventorg-bbc9d.firebaseapp.com",
  databaseURL: "https://myeventorg-bbc9d-default-rtdb.firebaseio.com",
  projectId: "myeventorg-bbc9d",
  storageBucket: "myeventorg-bbc9d.appspot.com",
  messagingSenderId: "2134803470",
  appId: "1:2134803470:web:92c22642db401cee68685f"
  // apiKey: "AIzaSyBgWo1iy-rgHou3dI3BdNaSd-j8mWVtZPI",
  // authDomain: "myeventorg-10681.firebaseapp.com",
  // projectId: "myeventorg-10681",
  // storageBucket: "myeventorg-10681.appspot.com",
  // messagingSenderId: "143151294569",
  // appId: "1:143151294569:web:020d9432e45a48487fdaf8",
  // measurementId: "G-W49Q74TTY4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();