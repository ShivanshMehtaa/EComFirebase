import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBILtP24RwANAqF1dCi7WEvTFG7r58TEdA",
  authDomain: "ecommercefirebase-8e994.firebaseapp.com",
  projectId: "ecommercefirebase-8e994",
  storageBucket: "ecommercefirebase-8e994.appspot.com",
  messagingSenderId: "250358293756",
  appId: "1:250358293756:web:5f1a6bfa76005c538a6379"
};


export const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const  storage = getStorage(app);
export const  db= getFirestore(app);