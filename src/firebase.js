import firebase from "firebase"
import "firebase/auth" // 👈 this could also be in your `firebase.js` file
import 'firebase/storage'

 const firebaseConfig =  {
    apiKey: "AIzaSyB6-6uM2BfGtI8AMC-W28DoIF8Z0CeKecY",
    authDomain: "tinder-clone-5b5c4.firebaseapp.com",
    databaseURL: "https://tinder-clone-5b5c4.firebaseio.com",
    projectId: "tinder-clone-5b5c4",
    storageBucket: "tinder-clone-5b5c4.appspot.com",
    messagingSenderId: "248186803311",
    appId: "1:248186803311:web:2977d04f952c78ff2fe99a",
    measurementId: "G-ECEQ8HWTE4"
  };
 
 let firebaseApp = firebase.initializeApp(firebaseConfig)

// const database = firebaseApp.firestore()

export default firebaseApp