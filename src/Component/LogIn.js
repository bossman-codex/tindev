import React, { useState } from 'react'
import firebase from "firebase/app"
import firebaseApp from '../firebase'




function LogIn() {
    const auth =firebaseApp.auth();
    // let auth_ = firebaseApp.auth;
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})

    const handlesumbit = (e) =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            alert("upload successful")
           })
           .catch(function(error) {
               console.log(error)
           });
           setEmail("")
           setPassword("")
        }
        
        const signinwithGoogle = () =>{
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function(result) {
             // This gives you a Google Access Token.
             var token = result.credential.accessToken;
             // The signed-in user info.
             var user = result.user;
            });
        }
    
       
    return (
        <div>
            <form onSubmit={handlesumbit}>
            <input
             type="email"
             value={email}
             placeholder="Enter your Email" 
             onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button
            onSubmit={handlesumbit}
            >
            LOG IN
            </button>

            </form>

            <div>
                <button onClick={signinwithGoogle}>Sign In With Google</button>
            </div>
        </div>
    )
}

export default LogIn
