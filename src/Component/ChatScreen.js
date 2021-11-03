import React,{useState, useEffect, useRef} from 'react'
import Avatar from '@material-ui/core/Avatar'
import {Box , TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import '../Style/chatscreen.css'
import styles from '../Style/textbox';
import firebase from "firebase/app"
import firebaseApp from '../firebase'
import emoji from "./download.png"
import { Send , EmojiEmotions } from '@material-ui/icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useHistory } from "react-router-dom";



//import { getAuth } from "firebase/auth";




function ChatScreen({  classes }) {
   const textmessages = JSON.parse(window.localStorage.getItem("chat"))
   const props = JSON.parse(window.localStorage.getItem("props"))
   const Selectedchat = textmessages[props]

  
    const dummy = useRef()

  const db = firebaseApp.firestore()
  //const Selectedchat1 = textmessages[window.localStorage.getItem("props")]
  const [input, setInput] = useState('')
  const [state , setstate] = useState({
    email: [],
    chats :[]
    })
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [mydataimg, Setmydataimg] = useState("")
  const [mydata, Setmydata] = useState("")
  const [friendDataimg, SetfriendDataimg] = useState("")
  const [friendData, SetfriendData] = useState("")
  const Selectedchat1 = state.chats[props]
  const container = document.getElementById('chatview-container');
  const email = window.localStorage.getItem("email")
  const buildDocKey = (friend) => [email, friend].sort().join(":")
  const friendName = Selectedchat.users.filter(word => word !== `${email}` )
console.log(friendName)
  useEffect(() => {

     
    let docRefFriend = db.collection("users").doc(`${friendName}`);

    docRefFriend.get().then((doc) => {
      if (doc.exists) {
       
        SetfriendData(doc.data().Username);
        SetfriendDataimg(doc.data().profilepic);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });


    let docRefSelf = db.collection("users").doc(`${email}`);

    docRefSelf.get().then((doc) => {
      if (doc.exists) {

        Setmydata(doc.data().Username);
        Setmydataimg(doc.data().profilepic);

        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

   
    if(container)
      container.scrollTo(0, container.scrollHeight);
    
    
     
  }, [])





  
 


  // ( () => {
  // if (Selectedchat === undefined) {
  //    return history.push("/chat")
  //   }
  // })()
  
  
  
 
const auth = firebaseApp.auth();
const user = auth.currentUser;
  // if (user !== null) {
  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  
  //   console.log(Selectedchat,displayName, email, photoURL, emailVerified)
  // }
  //   let emojiPicker;
  // if (emojiPickerState) {
  //   emojiPicker = (
  //     <Picker
  //       title="Pick your emoji…"
  //       emoji="point_up"
  //       onSelect = {emoji => setInput(input + emoji.native)} 
  //     />
  //   );
  // }

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

    const userTyping = (e) => {
       if (e.keyCode === 13) {
           handlesend()
       } else {
           setInput(e.target.value)
       }
    }
  
   const messageValid = (txt) =>{
     return  txt && txt.replace(/\s/g,"").length
   } 


const clickedwherenotsender = (chatIndex) => textmessages[chatIndex].messages[textmessages[chatIndex].messages.length - 1].sender !== email;


const messageRead = (index) => {
 const dockey = buildDocKey(Selectedchat.users.filter(usr => usr !== email))
  if (clickedwherenotsender(index)){
    firebase
    .firestore()
    .collection("chats")
    .doc(dockey)
    .update({receiverHasRead : true})
  }else{
    console.log("clicked")
  }
}

const AdmitFriend = () => {
    const dockey = buildDocKey(Selectedchat.users.filter(usr => usr !== email))
       firebase
       .firestore()
       .collection("chats")
       .doc(dockey)
       .update({Friend : true})
   }


 const userClickedInput = () => messageRead(props)

 const FriendAdmitted = () => AdmitFriend()
 
   const handlesend = () =>{
       
       const docKey = buildDocKey(Selectedchat.users.filter(usr => usr !== email))
      
   
        if (messageValid(input)) {
        firebase     
       .firestore()
       .collection("chats")
       .doc(docKey)
       .update({
           messages : firebase.firestore.FieldValue.arrayUnion({
               sender : email,
               message:input,
               timestamp:Date.now()
           }),
           receiverHasRead :false
       })

         setInput("")
        }


       

       dummy.current.scrollIntoView({behaviour : "smooth"})
   }

  
   const userisSender = (chat) => chat.messages[chat.messages.length - 1].sender === email

//   const addEmoji = (e) => {
//     let emoji = e.native;
//     console.log(e.native += input)
//     // setInput(e.target.value += emoji)
//     setInput(input + emoji)
//   };
  
  const myName = (Selectedchat.users[Selectedchat.users.length - 2])


 
  
    


    return(
        <div className="chatscreen">
        

        
        <main id='chatview-container' className={classes.content} style={emojiPickerState ? {height: 'calc(100vh - 463px)',} : {height: 'calc(100vh - 107px)',}}>

          <p className="chatscreen_timestamp">"You Matched With {friendName} on 23/09/2020"</p>
        {Selectedchat?.messages.map((msg, index) => {
          
          return (
             
              msg.sender === email ?
                (<div className="chatscreen_message " key={index}>
                  <p className="chatscreen_textuser">{msg.message}</p>
                
                  <Avatar
                    style={{ marginLeft: "10px" }}
                    className='chatscreen_image'
                    alt={`${mydata}`}
                    src={mydataimg}
                  />
                </div>
                
                )
                :
              (
                <div className="chatscreen_message" key={index}>
                  <Avatar
                    style={{ marginLeft: "10px" }}
                    className='chatscreen_image'
                    alt={`${friendData}`}
                    src={friendDataimg}
                  />
                  <p className="chatscreen_text">{msg.message}</p>
                </div>
              
                )
              )
        }  
            )
            
            }
            </main>
        {/* <div className="space"></div> */}

        {/* <form className='chatscreen_input'>
            <input
             value={input}
             onChange={(event) => setInput(event.target.value)}
             className='chatscreen_inputfield'
             placeholder="Type a message"

            />
            <button onClick={handlesend} className='inputbutton'><i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
             
            
        </form> */}
           
                {
                        Selectedchat.Friend === false && !userisSender(Selectedchat) ?
                        <div>
                        <p>Do you want to let {Selectedchat.users.filter(_users => _users !== email)} message you?</p> 
                          <button onClick ={FriendAdmitted}>Accept</button>  
                        </div>
                        :
            
              <div className={classes.chatTextBoxContainer} >
                <Box id="textbox" className={classes.box}>        
                  
                          

              
              
                 <EmojiEmotions className={classes.image} src={emoji} alt="emoji" width="20px" heiight="20px" onClick={triggerPicker}/>

                                <TextField
                                //id="chattextbox"
                                // className={classes.chatTextBox}
                                type="text"
                                aria-describedby="name-desc"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                placeholder ="Type your message"
                                onKeyUp = {(e) => userTyping(e)} 
                                onFocus ={userClickedInput}
                                multiline
                                maxrows={2}
                                 />
     
                                <Send 
                                // style = {{position:"fixed"}}
                                onClick={handlesend}
                                className = {classes.sendBtn}
                                ></Send>   
                               
              </Box>
              
              {emojiPickerState ?
                <div style={{maxHeight:"300px"}}>
                {container.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})}
                  <Picker
                  theme="light"  
                  title="Pick your emoji…"
                  emoji="point_up"
                  onSelect={emoji => setInput(input + emoji.native)}
                    style={{ width: "100%", position: 'absolute' , overflowY: 'hidden'}}
                    showPreview= {false}
                    showSkinTones={false}
                    emojiSize={35}
                    sheetSize={64}
                  />
                  </div>
                  : null}
           
            </div>
             
              

                
            
              
              
                                /* <TextField 
                                id = "chattextbox"
                                className = " chatscreen_inputfield"
                                placeholder ="Type your message"
                                onKeyUp = {(e) => userTyping(e)} 
                                onFocus ={userClickedInput}>

                                </TextField> */
                                
                            
       
                    
        }
        
             
          

            <div ref={dummy}></div>
 
        </div>
       
    )
}




export default withStyles( styles )(ChatScreen)
