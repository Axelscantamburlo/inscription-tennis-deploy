import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTX3o2TZiqY6E1a_KoR9q2DodMOdj3Mug",
  authDomain: "inscription-tennis.firebaseapp.com",
  projectId: "inscription-tennis",
  storageBucket: "inscription-tennis.appspot.com",
  messagingSenderId: "337848466867",
  appId: "1:337848466867:web:ff2cd8e0060ab75f165fc6",
  measurementId: "G-5T2JFQ6C75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
