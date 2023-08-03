// import firebase from 'firebase/compat/app';

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi5m1YupJAJwY6kZGxgZpAMkEYT-5NfdA",
  authDomain: "email-confirm-9c14f.firebaseapp.com",
  projectId: "email-confirm-9c14f",
  storageBucket: "email-confirm-9c14f.appspot.com",
  messagingSenderId: "496963003626",
  appId: "1:496963003626:web:e7e4daaec11f0b50806393",
  measurementId: "G-YVEE3PE19N"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default auth;
// import firebase from 'firebase';
 
// const firebaseConfig = {
//     apiKey: "your api key",
//     authDomain: "your credentials",
//     projectId: "your credentials",
//     storageBucket: "your credentials",
//     messagingSenderId: "your credentials",
//     appId: "your credentials"
// };
 
// firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();
// export default auth;