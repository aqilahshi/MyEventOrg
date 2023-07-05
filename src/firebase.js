import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyA-wy_ckQeaAAyjclI0RhIhg4eWA8kI8V0",
  // authDomain: "myeventorg-bbc9d.firebaseapp.com",
  // databaseURL: "https://myeventorg-bbc9d-default-rtdb.firebaseio.com",
  // projectId: "myeventorg-bbc9d",
  // storageBucket: "myeventorg-bbc9d.appspot.com",
  // messagingSenderId: "2134803470",
  // appId: "1:2134803470:web:92c22642db401cee68685f"
  apiKey: "AIzaSyBHxfEOwnJV48-9cIAQ6wH8JiNDFHaELgA",
  authDomain: "module-2-p1.firebaseapp.com",
  projectId: "module-2-p1",
  storageBucket: "module-2-p1.appspot.com",
  messagingSenderId: "837724275142",
  appId: "1:837724275142:web:2f5095412fb7b2e9e9b2c7",
  measurementId: "G-HHJ2BXLTZZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();