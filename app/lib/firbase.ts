import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA4B1ELU8M67GZXVnphnk8Q9CFs4tj_v7o",
    authDomain: "react-firebase-auth-e25fd.firebaseapp.com",
    databaseURL: "https://react-firebase-auth-e25fd-default-rtdb.firebaseio.com",
    projectId: "react-firebase-auth-e25fd",
    storageBucket: "react-firebase-auth-e25fd.firebasestorage.app",
    messagingSenderId: "191748276512",
    appId: "1:191748276512:web:44b82e370a99a3b9bed745"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();