import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqrYZowGDpkH7Z3C5AlUpm-uPDP4gXHyM",
  authDomain: "interview-form-40f5c.firebaseapp.com",
  projectId: "interview-form-40f5c",
  storageBucket: "interview-form-40f5c.firebasestorage.app",
  messagingSenderId: "106918676061",
  appId: "1:106918676061:web:c53c887610ef5bf0272fb4",
  measurementId: "G-Z32QBK286T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};