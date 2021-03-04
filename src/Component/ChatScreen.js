import React,{useState, useRef} from 'react'
import Avatar from '@material-ui/core/Avatar'
import '../Style/chatscreen.css'
import firebase from "firebase/app"
import { TextField } from '@material-ui/core'
import { Send } from '@material-ui/icons'




function ChatScreen({chat,email,buildDocKey,text}) {
    const dummy = useRef()

    const [input, setInput] =useState('')
 



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
const clickedwherenotsender = (chatIndex) => text[chatIndex].messages[text[chatIndex].messages.length - 1].sender !== email;
console.log(chat)
const messageRead = (index) => {
 const dockey = buildDocKey(chat.users.filter(usr => usr !== email))
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


 const userClickedInput = () => messageRead(chat)
 
   const handlesend = () =>{
       
       const docKey = buildDocKey(chat.users.filter(usr => usr !== email))
      
   
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

        document.getElementById("chattextbox").value = ""
        }


       

       dummy.current.scrollIntoView({behaviour : "smooth"})
   }
    
    
    
    return(
        <div className="chatscreen">
        <p className="chatscreen_timestamp">"You Matched With Ellen on 23/09/2020"</p>

            {chat.messages.map((msg ,index)=>(      
                msg.sender === email?
                (
                <div className="chatscreen_message" key={index}> 
                 <p className="chatscreen_textuser">{msg.message}</p>
                </div> 
                
                )
                : 
               ( <div className="chatscreen_message" key={index}>
                    <Avatar 
                    className='chatscreen_image'
                    alt={chat.email}
                    src={msg.photoURL}
                    />
                <p className="chatscreen_text">{msg.message}</p> 
                </div>
                )
            ))
            
            }
        <div className="space"></div>

        {/* <form className='chatscreen_input'>
            <input
             value={input}
             onChange={(event) => setInput(event.target.value)}
             className='chatscreen_inputfield'
             placeholder="Type a message"

            />
            <button onClick={handlesend} className='inputbutton'><i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
             
            
        </form> */}
            <div className='chatscreen_input'>
              <TextField 
              id = "chattextbox"
              className = " chatscreen_inputfield"
              placeholder ="Type your message"
              onKeyUp = {(e) => userTyping(e)}
              onFocus ={userClickedInput}></TextField>
              <Send 
              onClick={handlesend}
              className = "inputbutton"
              ></Send>
            </div>

            <div ref={dummy}></div>

            
        </div>
    )
}




export default ChatScreen
