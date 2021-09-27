import React,{useState} from "react"
// import firebase from "firebase/app"
import firebaseApp from '../firebase'
import SignOut from "./SignOut"
import styles from "./styles"
import {Paper, InputLabel, Input, Button, FormControl, Typography } from '@material-ui/core'


const database = firebaseApp.firestore()

function Profile() {
    //const auth =firebaseApp.auth();
    const [fileUrl, setFileUrl]= useState({})
  
    const Handlechange = async(e) =>{
      const file = e.target.files[0]
      const storageRef = firebaseApp.storage().ref()
      const fileRef= storageRef.child(file.name)
      await fileRef.put(file)
      setFileUrl(await fileRef.getDownloadURL()) 
    }

    const onsubmit = (e) =>{
        e.preventDefault()
        const username = e.target.username.value
        if(!username){
            return
        }
        const things = database.collection("images")

        things.doc(username).set({
            Name: username, img : fileUrl
        
        }).then(function() {
         alert("upload successful")
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    
    const classes = styles()
      
    return (
        <div>
             <main  className={classes.main}>
            
        <Paper elevation={9} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Upload Image
          </Typography>
          <form onSubmit={onsubmit} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <Input
                type = 'file'
                onChange = {Handlechange}
             />
            </FormControl>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='login-password-input'>Enter Your UserName</InputLabel>
            <Input
           type = 'text'
           name='username'
           placeholder= 'Enter Name'
             />   
            </FormControl>
            <Button onSubmit={onsubmit} type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Upload</Button>
                  
          </form>
        </Paper>
            </main>
          
        <SignOut/>
     </div>
        
    )
}



export default Profile