// JavaScript
// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbulZlQP9HAxD2Utc2ULRg-UplRGtKYFA",
    authDomain: "househero-d44e9.firebaseapp.com",
    projectId: "househero-d44e9",
    storageBucket: "househero-d44e9.appspot.com",
    messagingSenderId: "667043675175",
    appId: "1:667043675175:web:aa76e3197c3d72493aa202"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}