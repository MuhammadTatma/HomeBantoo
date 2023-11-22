
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC8I7Sc2KogNfiO74uyGAgO6xyOLBH-us",
  authDomain: "test-50f2c.firebaseapp.com",
  projectId: "test-50f2c",
  storageBucket: "test-50f2c.appspot.com",
  messagingSenderId: "861537865057",
  appId: "1:861537865057:web:8804224b88d88c60008920"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);