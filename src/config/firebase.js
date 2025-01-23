// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWVD_xPp9UnC9-K42yFrOiBrqZdVAt6dQ",
  authDomain: "docpoint-login.firebaseapp.com",
  projectId: "docpoint-login",
  storageBucket: "docpoint-login.firebasestorage.app",
  messagingSenderId: "670349694675",
  appId: "1:670349694675:web:42d18c305e4b8a7726e626",
  measurementId: "G-CKPMCZFXS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {analytics,auth}