import React,{useState, useRef} from 'react'
import Avatar from '@material-ui/core/Avatar'
import '../Style/chatscreen.css'
import firebase from "firebase/app"
import emoji from "./download.png"
import { Send } from '@material-ui/icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'




function ChatScreen({Selectedchat,email,buildDocKey,textmessages,selectChatFn}) {
    const dummy = useRef()

    const [input, setInput] =useState('')
    const [emojiPickerState, SetEmojiPicker] = useState(false);
 


    let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect = {emoji => setInput(input + emoji.native)} 
      />
    );
  }

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


 const userClickedInput = () => messageRead(selectChatFn)

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
  

    return(
        <div className="chatscreen">
        <p className="chatscreen_timestamp">"You Matched With Ellen on 23/09/2020"</p>

            {Selectedchat.messages.map((msg ,index)=>(      
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
                    alt={Selectedchat.email}
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
           
                {
                        Selectedchat.Friend === false && !userisSender(Selectedchat) ?
                        <div>
                        <p>Do you want to let {Selectedchat.users.filter(_users => _users !== email)} message you?</p> 
                          <button onClick ={FriendAdmitted}>Accept</button>  
                        </div>
                        :
                        
                        <div className='chatscreen_input'>
                            {emojiPicker}
                            <form>
                            
                                <input
                                id="chattextbox"
                                className ="chatscreen_inputfield"
                                type="text"
                                aria-describedby="name-desc"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                placeholder ="Type your message"
                                onKeyUp = {(e) => userTyping(e)} 
                                onFocus ={userClickedInput}
                                />
                                 
                                 <img src={emoji} alt="emoji" width="20px" heiight="20px" onClick={triggerPicker}/>
                                 
                                 
                                <Send 
                                // style = {{position:"fixed"}}
                                onClick={handlesend}
                                className = "inputbutton"
                                ></Send> 
                                
                                
                                </form> 
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




export default ChatScreen
