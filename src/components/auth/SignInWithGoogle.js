import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB7xqleUJq5R4foVptutn2rAOz7mK_osRI",
    authDomain: "todo-b1063.firebaseapp.com",
    projectId: "todo-b1063",
    storageBucket: "todo-b1063.appspot.com",
    messagingSenderId: "556937375169",
    appId: "1:556937375169:web:6c0cec4fa7512c52905340",
    measurementId: "G-YD1K7T9MQ8"
  };
  

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const storage= getStorage(firebaseApp);