import React, {useState} from 'react'
import firebaseApp from '../firebase'
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import '../Style/login.css'
import {InputLabel, Input, Button, FormControl, Typography } from '@material-ui/core'
import styles from "./styles"
import background from "./81744.jpg"
import google from "./Google.svg.webp"


function SignUp() {

    let history = useHistory();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [signError, setSignerror] = useState(" ")
         
      
    const classes = styles()     
    
    const style = {
    display: "flex",
    width: "100 %",
    alignItems: "center",
    justifyContent:" center",
    height: "100vh",
    background: `url(${background}) no-repeat fixed`,
    backgroundSize: "cover"
}


    const signup = (e) =>{
        e.preventDefault()
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(authRes => {
            const userObj = { 
              email: authRes.user.email,
              Username: "",
              profilepic: ""

            };
            firebase
            .firestore()
            .collection("users")
            .doc(email)
            .set(userObj)
            .then(()=>{
               history.push("/username")
            } , dbError =>{
                console.log(dbError);
                setSignerror("Failed to add user")
            })
            }, authErr => {
                console.log(authErr);
                setSignerror(authErr.message)
        });
      
      

  }
  
           

    const signinwithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      console.log(token)
      // The signed-in user info.
      var user = result.user;
      console.log(user)
    })
        firebase.auth().onAuthStateChanged( _user =>{
      if (_user ){
          history.push("/username")
      }
      })
          }



    return (
        <div style={style}>
             <main  className={classes.main}>
        <Paper elevation={9} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        <form onSubmit={signup}>
        <FormControl required fullWidth margin='normal'>
          <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
              <Input  className="emailInput"
                type="email"
                name="email"
                value={email}
                placeholder="Enter your Email" 
                onChange={(e)=>setemail(e.target.value) }
                />
              </FormControl>
              

        <FormControl required fullWidth margin='normal'>
          <InputLabel htmlFor='login-email-input'>Enter Your Password</InputLabel>
            <Input className="psdInput"
        type="password"
        name="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setpassword(e.target.value)}
         minlength="6" 
         required
        />
         </FormControl>
        <Button onClick={signup} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up 
        </Button>
        <p style={{textAlign:"center" , marginBottom:"auto"}}>OR</p>
        <Button onClick={signinwithGoogle}  fullWidth variant='contained' color='darkblue' className={classes.submit}>
              <img src={google} alt="google" style={{width:"20px" , height:"20px" }} />
                Sign Up With Google
        </Button>
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
