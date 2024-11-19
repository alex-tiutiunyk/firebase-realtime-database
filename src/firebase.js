import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "contacts-test-project-6ff56.firebaseapp.com",
  databaseURL: "https://contacts-test-project-6ff56-default-rtdb.firebaseio.com",
  projectId: "contacts-test-project-6ff56",
  storageBucket: "contacts-test-project-6ff56.firebasestorage.app",
  messagingSenderId: "1089080938649",
  appId: "1:1089080938649:web:5b22e06c0b8cb07ad3a808"
  // example
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)