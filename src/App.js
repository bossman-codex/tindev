import React,{useState ,useEffect} from 'react'
import Header from "./Component/Header"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import TinderCards from './Component/TinderCards';
import SwipeButton from './Component/SwipeButton'
import Chat from "./Component/Chat"
import ChatScreen from './Component/ChatScreen'
import Profile from './Component/Profile'
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import Username from './Component/usernamePage'
import { useHistory } from 'react-router-dom'
import firebaseApp from './firebase'
import firebase from "firebase/app" 
import "./App.css"


function App() {

    const [state , setstate] = useState({
    email: [],
    chats :[]
    })
    const [selectedChat , setSelectedChat] = useState(null)
    

    let history = useHistory()

    const database = firebaseApp.firestore()

    useEffect(() => {
      firebase.auth().onAuthStateChanged( _user =>{
      if (!_user ){
          history.push("/login")
      }
      else {
      database
      .collection("chats")
      .where("users" ,"array-contains" , _user.email)
      .onSnapshot(async snaps => {
        const message = snaps.docs.map(docs => docs.data())
        window.localStorage.setItem("chat", JSON.stringify(message))
        window.localStorage.setItem("email", _user.email)
      setstate({
          email: _user.email,
          chats: message
      })

      })
      }
      })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const buildDocKey = (friend) =>[state.email , friend].sort().join(":")
    //window.localStorage.setItem("buildkey" , buildDocKey())
  
  const selectChat = (chatIndex) => {
    window.localStorage.setItem("props" , chatIndex)
      setSelectedChat(chatIndex)
    }

  // const SChat = chat[props]
  // console.log(SChat)
  // window.localStorage.setItem("selectedchat", SChat)
  //   // const newChatBtnClicked = () => {
  //   //   setnewChatFormVisible(true) 
  //   // };

  return (
    <div className="App" >
      <Router>  
       <Switch>
        <Route path="/chat/:person">
          <Header
           backbutton ="/chat"
           menu = "/"
           />
            <ChatScreen
              // textmessages ={state.chats}
              //Selectedchat = {state.chats[props]}
              // buildDocKey = {buildDocKey}
              // selectChatFn={selectedChat} 
              
          />
        </Route>
         <Route path="/chat">
          <Header backbutton ="/"/>
          <Chat 
          infos = {state}
          chat = {state.chats[selectedChat]}
          selectChatFn={selectChat} 
          selectedChatIndex={selectedChat}
          // newchatvisible = {newChatFormVisible}
          // newChatBtnFn = {newChatBtnClicked}
          />
         </Route>
         <Route path="/profile">
          <Header backbutton ="/"/>
          <Profile/>
         </Route>
         <Route path="/login">
            <LogIn/>
         </Route>  
        <Route path="/signUp">
           <SignUp />
          </Route>
        <Route path="/username">
           <Username />
         </Route>  
         <Route path="/">
           <Header/>
           <TinderCards/>
           <SwipeButton/> 
         </Route> 
       </Switch>
     </Router> 
      
   
    </div>
  );
  
}


export default App
