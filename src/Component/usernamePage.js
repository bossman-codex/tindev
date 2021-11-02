import React, {useState} from 'react'
import firebaseApp from '../firebase'
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import '../Style/login.css'
import {InputLabel, Input, Button, FormControl, Typography } from '@material-ui/core'
import styles from "./styles"
import background from "./81744.jpg"
//import google from "./Google.svg.webp"


function SignUp() {
   let history = useHistory();

    const [username, setusername] = useState('')
    const [signError, setSignerror] = useState(" ")
         
     const [fileUrl, setFileUrl]= useState({})
  
    const Handlechange = async(e) =>{
      const file = e.target.files[0]
      const storageRef = firebaseApp.storage().ref()
      const fileRef= storageRef.child(file.name)
      await fileRef.put(file)
      setFileUrl(await fileRef.getDownloadURL()) 
    }

    // const onsubmit = (e) =>{
    //     e.preventDefault()
    //     const username = e.target.username.value
    //     if(!username){
    //         return
    //     }
    //     const things = database.collection("images")

    //     things.doc(username).set({
    //         Name: username, img : fileUrl
        
    //     }).then(function() {
    //      alert("upload successful")
    //     })
    //     .catch(function(error) {
    //         console.error("Error writing document: ", error);
    //     });
    // }
    
      
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
        
       firebase.auth().onAuthStateChanged(function(user) {

                if (user) {
                  console.log(user.email)
                   // Updates the user attributes:

                  user.updateProfile({ // <-- Update Method here

                    displayName: username,
                    photoURL:  fileUrl

                  })
                      .then(() => {
                          const userObj = {
                              Username: username,
                              profilepic: fileUrl
                          };
                          firebase
                              .firestore()
                              .collection("users")
                              .doc(user.email)
                              .update(userObj)
                      })
                      .then(function () {

                    // Profile updated successfully!
                    //  "NEW USER NAME"
                      history.push("/username")
                      var displayName = user.displayName;
                      console.log(displayName)
                    // "https://example.com/jane-q-user/profile.jpg"
                      var photoURL = user.photoURL;
                      console.log(photoURL)

                  }, function (error) {
                       console.log(error);
                       setSignerror("Failed to add user")
                   });     

                }
    });

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
          <InputLabel htmlFor='login-email-input'>Enter Your Username</InputLabel>
              <Input  className="emailInput"
                type="text"
                name="username"
                value={username}
                placeholder="Enter your UserName" 
                onChange={(e)=>setusername(e.target.value) }
                />
        </FormControl>
        
          <FormControl required fullWidth margin='normal'>
              <Input
                type = 'file'
                onChange = {Handlechange}
             />
            </FormControl>
        
        <Button onClick={signup} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up 
        </Button>
        <p style={{textAlign:"center" , marginBottom:"auto"}}>OR</p>
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
