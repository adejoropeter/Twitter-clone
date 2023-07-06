import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCpxMHTpzyR4OW1fwSsm2mnNwQvkAHZ44I",
  authDomain: "mypro-b02e4.firebaseapp.com",
  projectId: "mypro-b02e4",
  storageBucket: "mypro-b02e4.appspot.com",
  messagingSenderId: "460801466603",
  appId: "1:460801466603:web:f0ac463fa372a24752deae",
  measurementId: "G-0DXHB2CYRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
