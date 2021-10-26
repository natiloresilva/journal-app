import 'firebase/firestore'
import 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCUXCIgKCIBDGPVEypZCSYNflvpfz7oDr4",
    authDomain: "react-app-cursos-f16eb.firebaseapp.com",
    projectId: "react-app-cursos-f16eb",
    storageBucket: "react-app-cursos-f16eb.appspot.com",
    messagingSenderId: "511338472606",
    appId: "1:511338472606:web:5859bcf31d9f25258d878f"
}

initializeApp(firebaseConfig)

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider()

export {
    db,
    googleAuthProvider
}