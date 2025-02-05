// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoVZAViEHEigkHBnkY73SlvMrwEtVwUNs",
  authDomain: "taskbank-db92a.firebaseapp.com",
  projectId: "taskbank-db92a",
  storageBucket: "taskbank-db92a.firebasestorage.app",
  messagingSenderId: "687069351480",
  appId: "1:687069351480:web:ea12a99b3762ce887420cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);

export {app, db, analytics}