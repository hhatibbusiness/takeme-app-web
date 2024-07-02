// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-B0PIEt1V5oErdamdtXsqTAVaXEO6-e4",
  authDomain: "todo-cd3fe.firebaseapp.com",
  databaseURL: "https://todo-cd3fe.firebaseio.com",
  projectId: "todo-cd3fe",
  storageBucket: "todo-cd3fe.appspot.com",
  messagingSenderId: "270468605963",
  appId: "1:270468605963:web:ab8adab9bb0d7039767f0e",
  measurementId: "G-SW272BCBVQ"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyASZz28NQMkPI-lBgdyXeQH4GYpLJNMdC4",
//   authDomain: "takeme-ad987.firebaseapp.com",
//   projectId: "takeme-ad987",
//   storageBucket: "takeme-ad987.appspot.com",
//   messagingSenderId: "535326779667",
//   appId: "1:535326779667:web:fde39b7c6892df9f7fd2e6",
//   measurementId: "G-B1W4B3LE72"
// };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);