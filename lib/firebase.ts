// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config (use .env.local in production!)
const firebaseConfig = {
  apiKey: "AIzaSyAFmIDMPnkD6-0rMz0FUNK2YUUnvQ8BHp4",
  authDomain: "racing-rapido.firebaseapp.com",
  projectId: "racing-rapido",
  storageBucket: "racing-rapido.appspot.com",
  messagingSenderId: "859533657954",
  appId: "1:859533657954:web:ecce9360a5c3b242474e3b",
};

// Prevent re-initialization in Next.js (Hot Reload fix)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;