import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDhAdcxZ2OV9I-VmiODqYQLgkXTEKc9g6Y",
  authDomain: "essential-storm-402405.firebaseapp.com",
  projectId: "essential-storm-402405",
  storageBucket: "essential-storm-402405.appspot.com",
  messagingSenderId: "354059699970",
  appId: "1:354059699970:web:500f1d996b12c2de73241b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);
