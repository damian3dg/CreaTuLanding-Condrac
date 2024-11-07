import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzs8wDk0f3pa4zd6gAsKGDtHrKUgXWi-U",
    authDomain: "landingcoder.firebaseapp.com",
    projectId: "landingcoder",
    storageBucket: "landingcoder.firebasestorage.app",
    messagingSenderId: "69939621729",
    appId: "1:69939621729:web:c6196a2c89c2bdcdc3df20"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };