import React from 'react'
import "../Style/modal.css"
import { FormControl, InputLabel, Input, Button, Paper, CssBaseline, Typography } from '@material-ui/core';
import firebase from "firebase/app"

function NewChatForm({toggle , newChatSubmitFn ,goToChatFn}) {
     
    const [username , setusername] = React.useState(null)
    const [message , setmessage] = React.useState(null)
    const [serverError , setserverError] = React.useState("")

    const handleClick =()=>toggle()

    const UserTyping =  (type ,e) =>{
        switch (type) {
            case "username":
                setusername(e.target.value)
                break;
            
            case "message" :
                setmessage(e.target.value)
            break
            default:
                break;
        }
    }

    const submitNewChat = async(e) =>{
       e.preventDefault();
       const userExist = await UserExists()
         if (userExist) {
             const chatExist = await ChatExists()
             chatExist ? goToChat() : createChat()
         }

    }

    const createChat =()=>{
        newChatSubmitFn({
            sendTo: username,
            message: message
        })
    }

    const goToChat = () =>{
        goToChatFn(buildDocKey() , message)
    }

     const buildDocKey = () =>{
       return [firebase.auth().currentUser.email , username].sort().join(":")
     }

    const ChatExists = async() =>{
        const docKey = buildDocKey();
        const chat = await firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .get();
        console.log(chat.exists)
        return chat.exists
    }

    const UserExists = async()=>{
        const usersSnapshot = await firebase
        .firestore()
        .collection("users")
        .get();
        const exists = usersSnapshot.docs
        .map(_doc => _doc.data().email)
        .includes(username);
        return exists;
    }

    return (

        <main className="main">
        <CssBaseline/>
        <Paper className="paper">
          <Typography component="h1" variant="h5">Send A Message!</Typography>
          <form className="form" onSubmit={(e) => submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-username'>
                  Enter Your Friend's Email
              </InputLabel>
              <Input required 
                className="input"
                autoFocus 
                onChange={(e) => UserTyping('username', e)} 
                id='new-chat-username'>
              </Input>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
              </InputLabel>
              <Input required 
                className="input"
                onChange={(e) => UserTyping('message', e)} 
                id='new-chat-message'>
              </Input>
            </FormControl>
            <Button fullWidth variant='contained' color='primary' className="submit" type='submit'>Send</Button>
          </form>
          {
            serverError ? 
            <Typography component='h5' variant='h6' className="errorText">
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
      </main>
    );
  }
    

export default NewChatForm


//     <div className="modal">
    //     <div className="modal_content">
    //     <span className="close" onClick={handleClick}>&times;    </span>
    //     <p>I'm A Pop Up!!!</p>
    //    </div>
    //   </div>