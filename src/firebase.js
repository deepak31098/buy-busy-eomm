// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2zEREUa2yWup_vxLVXRBLLNsMtgI1pZs",
  authDomain: "buy-busy-i.firebaseapp.com",
  projectId: "buy-busy-i",
  storageBucket: "buy-busy-i.appspot.com",
  messagingSenderId: "100591396426",
  appId: "1:100591396426:web:482040cf95c019113fe8b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
