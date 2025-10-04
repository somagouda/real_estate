// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-364fd.firebaseapp.com",
  projectId: "real-estate-364fd",
  storageBucket: "real-estate-364fd.firebasestorage.app",
  messagingSenderId: "941953409831",
  appId: "1:941953409831:web:16dfbca26f4eae90643f02"
};

// Initialize Firebase
    export const app = initializeApp(firebaseConfig);