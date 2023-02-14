// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCks-HKooxNb7lxJeCcZTl8hytoqsJwkv4",
  authDomain: "react-cursos-ce758.firebaseapp.com",
  projectId: "react-cursos-ce758",
  storageBucket: "react-cursos-ce758.appspot.com",
  messagingSenderId: "1076767872870",
  appId: "1:1076767872870:web:21bdc2d583fac57cb49aa7",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const CloudFireStore = getFirestore(FirebaseApp);
