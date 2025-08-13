import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig =   {
  apiKey: "AIzaSyA76Be8ZCiLdBlwRq6IjFLFKLNwQ27XnlU",
  authDomain: "contact-nook.firebaseapp.com",
  projectId: "contact-nook",
  storageBucket: "contact-nook.firebasestorage.app",
  messagingSenderId: "970716747117",
  appId: "1:970716747117:web:f5a9104a875f37bde9b664",
  measurementId: "G-VR8BJK7XB8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
