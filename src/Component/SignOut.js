import React from 'react'
import firebase from "firebase/app"
// import {useAuthState} from "react-firebase-hooks/auth"


   

function SignOut() { 
    const auth =firebase.auth();

     console.log(auth)

     const logout = () =>{
        firebase.auth().signOut().then(() => {
           console.log("Sign-out successful.") 
          }).catch((error) => {
            console.log(error)
          });
     }
    return(
        <button onClick ={logout}>SignOut</button>
    )
}

export default SignOut
