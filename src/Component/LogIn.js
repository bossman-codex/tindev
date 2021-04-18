import React, { useState } from 'react'
import firebase from "firebase/app"
import firebaseApp from '../firebase'
import Paper from "@material-ui/core/Paper"
import styles from "./styles"
import {Link, InputLabel, Input, Button, FormControl, Typography } from '@material-ui/core'
import '../Style/login.css'
import google from "./Google.svg.webp"




function LogIn() {
    const auth =firebaseApp.auth();
    // let auth_ = firebaseApp.auth;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [servererror , setservererror] = useState(false)

    const handlesumbit = (e) =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            alert("upload successful")
           })
            .catch(function (error) {
                setservererror(true)
                console.log(error)
           });
           
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
    
    const classes = styles()
    console.log(email)
    
    // const paint = (color) => {
    //     colored(color)
    // }

    // paint("red")
       
    return (
       

        <div className="body">
             
         <main  className={classes.main}>
            
        <Paper elevation={9} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form onSubmit={(e) => this.submitLogin(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
              <Input
                autoComplete="current-password"
                type="email"
                value={email}
                placeholder="Enter your Email" 
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
            <Input
            autoComplete="current-password"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e)=> setPassword(e.target.value)}
             />   
            </FormControl>
            <Button onClick={handlesumbit} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
                    <Button onClick={signinwithGoogle} type='submit' fullWidth variant='contained' color='darkblue' className={classes.submit}>
                        <img src={google} alt="google" style={{width:"20px" , height:"20px" }} />
                              Sign In With Google
                            </Button>
          </form>
          { servererror ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              Incorrect Login Information
            </Typography> :
            null
          }
          <h5 className={classes.noAccountHeader}>Don't Have An Account?</h5>
          <Link className={classes.signUpLink} to='/signup'>Sign Up!</Link>
        </Paper>
            </main>
        </div >
            
    )
}

export default LogIn
