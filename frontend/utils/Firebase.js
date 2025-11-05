import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginlms-a7ea1.firebaseapp.com",
  projectId: "loginlms-a7ea1",
  storageBucket: "loginlms-a7ea1.firebasestorage.app",
  messagingSenderId: "665916718747",
  appId: "1:665916718747:web:16dbe0bfe5aeeface0903e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}