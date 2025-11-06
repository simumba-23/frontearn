import { initializeApp } from "firebase/app";
import {getMessaging } from "firebase/messaging";
import { getAuth,GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {

  apiKey: "AIzaSyAU-J25Bn8UgHT9j0bItjfp-O4O8JY16Cg",
  authDomain: "fcm-earn-app.firebaseapp.com",
  projectId: "fcm-earn-app",
  storageBucket: "fcm-earn-app.firebasestorage.app",
  messagingSenderId: "124455440148",
  appId: "1:124455440148:web:5cce164cacfc5e4ab6bc01",
  measurementId: "G-QGK6978LQ0"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
