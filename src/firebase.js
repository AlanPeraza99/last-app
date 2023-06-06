// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWpRo3ImpDfPRDCJOP-u0d5STRKOpHZhQ",
  authDomain: "last-app-1cefd.firebaseapp.com",
  projectId: "last-app-1cefd",
  storageBucket: "last-app-1cefd.appspot.com",
  messagingSenderId: "397611607551",
  appId: "1:397611607551:web:b136863e4f7e43ae0733ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export * from '@firebase/firestore';
export const db= getFirestore(app);