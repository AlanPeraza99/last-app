
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWpRo3ImpDfPRDCJOP-u0d5STRKOpHZhQ",
  authDomain: "last-app-1cefd.firebaseapp.com",
  projectId: "last-app-1cefd",
  storageBucket: "last-app-1cefd.appspot.com",
  messagingSenderId: "397611607551",
  appId: "1:397611607551:web:b136863e4f7e43ae0733ca"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export * from '@firebase/firestore';
export const db= getFirestore(app);