import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBenRjztgdZX_gGLuFfw0GgW2nAkCS864c",
    authDomain: "bhinchar-india-tours.firebaseapp.com",
    projectId: "bhinchar-india-tours",
    storageBucket: "bhinchar-india-tours.firebasestorage.app",
    messagingSenderId: "56980684880",
    appId: "1:56980684880:web:2ad036ceef6d440ece5155",
    measurementId: "G-564Z0DJCZL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };
