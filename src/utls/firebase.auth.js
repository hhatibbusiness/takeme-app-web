// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASZz28NQMkPI-lBgdyXeQH4GYpLJNMdC4",
  authDomain: "takeme-ad987.firebaseapp.com",
  projectId: "takeme-ad987",
  storageBucket: "takeme-ad987.appspot.com",
  messagingSenderId: "535326779667",
  appId: "1:535326779667:web:fde39b7c6892df9f7fd2e6",
  measurementId: "G-B1W4B3LE72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);