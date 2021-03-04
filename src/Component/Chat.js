import React,{useState} from 'react'
import '../Style/chat.css'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import { ListItem, ListItemText ,ListItemAvatar, Typography , ListItemIcon, Button } from '@material-ui/core'
import {NotificationImportant } from "@material-ui/icons"
import firebase from "firebase/app"
import NewChatForm from "./NewChatForm"


function Chat({infos ,chat, selectChatFn , selectedChatIndex ,newChatBtnFn}) {

    const[newChatFormVisible , setnewChatFormVisible] = useState(false)
  
   const buildDocKey = (friend) =>[infos.email , friend].sort().join(":")

   const goToChat = async(dockey ,msg) => {
       const usersInChat = dockey.split()
       const chat = infos.chat.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)))
       setnewChatFormVisible(false)
       await selectChat(infos.chats.indexOf(chat))
       submitMessage(msg)
   }

    const submitMessage = (msg) => {
    const docKey = this.buildDocKey(chat
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  }

   const newChatSubmit =async(chatObj)=>{
      const dockey = buildDocKey(chatObj.sendTo)
      await firebase
      .firestore()
      .collection("chats")
      .doc(dockey)
      .set({
          receiverHasRead : false,
          users:[infos.email, chatObj.sendTo],
          messages:[{
              message:chatObj.message,
              sender:infos.email
          }]
      })
      setnewChatFormVisible(false)
      selectChat(infos.chats.length - 1)
   }

    const messageRead = (index) => {
    const dockey = buildDocKey(infos.chats[index].users.filter(_user => _user !== infos.email)[0])
        if(clickedwherenotsender(index)){
        firebase
        .firestore()
        .collection("chats")
        .doc(dockey)
        .update({receiverHasRead : true})
        }else{
        console.log("clicked")
        }
    }

    const clickedwherenotsender = (chatIndex) => infos.chats[chatIndex].messages[infos.chats[chatIndex].messages.length - 1].sender !== infos.email;

    const selectChat = async (index) => {
        await selectChatFn(index)
        messageRead(index)
    }

    const userisSender = (chat) => chat.messages[chat.messages.length - 1].sender === infos.email

     const togglePop = () => {
      setnewChatFormVisible(!newChatFormVisible)
       };

    //    const newChatBtnClicked = () => {
        //   setnewChatFormVisible(true) 
        // };
    
    const newChat = () => togglePop()

    return (
        <>
        <Button variant="contained" 
              fullWidth 
              color='primary' 
              onClick={newChat} 
              className="btn">
                New Message
            </Button>
        <Link to={`/chat/${infos.email}`}>
            {infos.chats.map((chats , index)=>{
                console.log(index)
              return(
                  <ListItem 
                  onClick={() => selectChat(index)}
                  selected={selectedChatIndex === index}
                  key={index} 
                  >
                     <ListItemAvatar>
                       <Avatar alt={"anybody"}>{chats.users.filter(_users => _users !== infos.email)[0].split("")[0]}</Avatar>
                     </ListItemAvatar>
                     <ListItemText 
                     primary={chats.users.filter(_users => _users !== infos.email)[0]}
                     secondary={
                         <React.Fragment>
                             <Typography component = "span">
                                {
                                    chats.messages[chats.messages.length - 1].message.substring(0, 30)
                                }
                             </Typography>
                         </React.Fragment>
                     }
                     >

                     </ListItemText>
                     {
                        chats.receiverHasRead === false && !userisSender(chats) ? 
                        <ListItemIcon>
                            <NotificationImportant style={{color:"red"}}></NotificationImportant>
                        </ListItemIcon> : null
                     }
                  </ListItem>
              )
           })}
           
        </Link> 

        {
            newChatFormVisible ? 
            <NewChatForm 
            toggle={togglePop}
            goToChatFn ={goToChat}
            newChatSubmitFn = {newChatSubmit}
            >

            </NewChatForm> : null
        }
        </>
    )
  
}

export default Chat
