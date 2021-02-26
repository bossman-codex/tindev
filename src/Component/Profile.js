import { Folder } from '@material-ui/icons'
import React,{useState} from 'react'
import firebaseApp from '../firebase'
import SignOut from "./SignOut"


const database = firebaseApp.firestore()

function Profile() {
    const auth =firebaseApp.auth();
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
    
      
    return (
        <div>
        <form onSubmit={onsubmit}>
          <input
           type = 'file'
           onChange = {Handlechange}
          />
          <input
           type = 'text'
           name='username'
           placeholder= 'Enter Name'
          />
          <button
          onSubmit= {onsubmit}
          >
          Submit
          </button>
        </form>
    
        <SignOut/>
     </div>
        
    )
}



export default Profile