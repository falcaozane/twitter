// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-24cf8.firebaseapp.com",
  projectId: "twitter-clone-24cf8",
  storageBucket: "twitter-clone-24cf8.appspot.com",
  messagingSenderId: "325925960262",
  appId: "1:325925960262:web:abddff1a9543a930fce847"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const storage = getStorage();

//export default {app, db, storage}