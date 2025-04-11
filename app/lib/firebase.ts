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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
const auth = getAuth(app);
auth.languageCode = 'en';

// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); // helps avoid silent errors

export { auth, provider };