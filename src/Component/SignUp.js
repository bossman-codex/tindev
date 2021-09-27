import React, {useState} from 'react'
import firebaseApp from '../firebase'
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import '../Style/login.css'
import { Typography } from '@material-ui/core'
import styles from "./styles"


function SignUp() {

    let history = useHistory();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [signError, setSignerror] = useState(" ")
         
      
    const classes = styles()     
    

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
                setSignerror(authErr.message)
            });

    }



    return (
        <div>
             <main  className={classes.main}>
        <Paper elevation={9} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
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
         minlength="6" 
         required
        />
</div>
        <button onClick={signup} >
        SignUp 
        </button>
                    </form>
            <Typography className={classes.errorText} component='h5' variant='h6'>
                        {/* This Email Address Already exist!! */}
                 {signError}       
            </Typography> 
          
        </Paper>
        </main>
        </div>
    )
}

export default SignUp
