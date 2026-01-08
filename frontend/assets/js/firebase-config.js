// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBenRjztgdZX_gGLuFfw0GgW2nAkCS864c",
    authDomain: "bhinchar-india-tours.firebaseapp.com",
    projectId: "bhinchar-india-tours",
    storageBucket: "bhinchar-india-tours.firebasestorage.app",
    messagingSenderId: "56980684880",
    appId: "1:56980684880:web:2ad036ceef6d440ece5155",
    measurementId: "G-564Z0DJCZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
