import React, {useState} from 'react'
import firebaseApp from '../firebase'
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';


function SignUp() {

    let history = useHistory();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [signError, setSignerror] = useState(" ")
         
        
    

    const signup = (e) =>{
        e.preventDefault()
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(authRes => {
            const userObj = { 
                email : authRes.user.email
            };
            firebase
            .firestore()
            .collection("users")
            .doc(email)
            .set(userObj)
            .then(()=>{
               history.push("/")
            } , dbError =>{
                console.log(dbError);
                setSignerror("Failed to add user")
            })
            }, authErr => {
                console.log(authErr);
                setSignerror("Failed to add user")
            });

    }



    return (
        <div>
        <Paper>
        <form onSubmit ={signup}>
            <div className="emailInput">
        <input
         type="email"
         name="email"
         value={email}
         placeholder="Enter your Email" 
         onChange={(e)=>setemail(e.target.value) }
        />
        </div>

        <div className="psdInput">
        <input
        type="password"
        name="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setpassword(e.target.value)}
        />
</div>
        <button onClick={signup} >
        SignUp 
        </button>
        {signError}
        </form>
        </Paper>
        </div>
    )
}

export default SignUp
