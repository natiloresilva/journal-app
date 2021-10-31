import 'firebase/firestore'
import 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

// const firebaseConfig = {
//     apiKey: "AIzaSyCUXCIgKCIBDGPVEypZCSYNflvpfz7oDr4",
//     authDomain: "react-app-cursos-f16eb.firebaseapp.com",
//     projectId: "react-app-cursos-f16eb",
//     storageBucket: "react-app-cursos-f16eb.appspot.com",
//     messagingSenderId: "511338472606",
//     appId: "1:511338472606:web:5859bcf31d9f25258d878f"
// }
// //console.log(process.env)

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyAt9c5XhPEMtxWK3QggMrIj2qa3QvhLNcM",
//     authDomain: "testing-react-journal.firebaseapp.com",
//     projectId: "testing-react-journal",
//     storageBucket: "testing-react-journal.appspot.com",
//     messagingSenderId: "429551985718",
//     appId: "1:429551985718:web:b90866755ab62d20976497"
// }


// export const firebaseApp = (process.env.NODE_ENV === 'test') ? initializeApp(firebaseConfigTesting) : initializeApp(firebaseConfig)


export const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider()

export {
    db,
    googleAuthProvider
}