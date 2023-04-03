// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlkUV19rqvZVrieg1UskgF1oWSiBvMam8",
  authDomain: "money-app-8391f.firebaseapp.com",
  projectId: "money-app-8391f",
  storageBucket: "money-app-8391f.appspot.com",
  messagingSenderId: "598679094614",
  appId: "1:598679094614:web:edebc7e87a5391c68102f7"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


