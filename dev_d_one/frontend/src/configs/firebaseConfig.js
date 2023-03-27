// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9HPvcAD7cS6cKKcLFoRUwMv7zZa1y2qk",
  authDomain: "meatlof-dev.firebaseapp.com",
  projectId: "meatlof-dev",
  storageBucket: "meatlof-dev.appspot.com",
  messagingSenderId: "807317705806",
  appId: "1:807317705806:web:510eb3cb0c4bea74cfdf1f",
  measurementId: "G-B1HG9DNL02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
