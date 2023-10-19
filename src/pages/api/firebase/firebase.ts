// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyARw2ZZ4s06XGevQpMmrV06J6A8rOHtc8Q",
  authDomain: "webnest-f4392.firebaseapp.com",
  projectId: "webnest-f4392",
  storageBucket: "webnest-f4392.appspot.com",
  messagingSenderId: "232253787380",
  appId: "1:232253787380:web:71cd6941b60cc0983262a1",
  measurementId: "G-012X9GRCG0"
};

try {
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.error('Firebase initialization error', err);
}

export const db = firebase.firestore();
export const storage = firebase.storage();
