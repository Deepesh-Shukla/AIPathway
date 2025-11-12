// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "loginaipathway.firebaseapp.com",
//   projectId: "loginaipathway",
//   storageBucket: "loginaipathway.firebasestorage.app",
//   messagingSenderId: "412909030707",
//   appId: "1:412909030707:web:2159b3d4fb23956fd24246",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginaipathway.firebaseapp.com",
  projectId: "loginaipathway",
  storageBucket: "loginaipathway.appspot.com", // <-- FIXED
  messagingSenderId: "412909030707",
  appId: "1:412909030707:web:2159b3d4fb23956fd24246",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

