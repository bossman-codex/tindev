import React,{useState ,useEffect} from 'react'
import Header from "./Header"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import TinderCards from './TinderCards';
import SwipeButton from './SwipeButton'
import Chat from "./Chat"
import ChatScreen from './ChatScreen'
import Profile from './Profile'
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useHistory } from 'react-router-dom'
import firebaseApp from '../firebase'
import firebase from "firebase/app"


function Main() {


    const [state , setstate] = useState({
    email: [],
    chats :[]
    })
    const [selectedChat , setSelectedChat] = useState(null)

    

    let history = useHistory()

    const database = firebaseApp.firestore()

    useEffect(() => {
      firebase.auth().onAuthStateChanged( _user =>{
      if (!_user){
          history.push("/login")
      }
      else{
      database
      .collection("chats")
      .where("users" ,"array-contains" , _user.email)
      .onSnapshot(async snaps => {
      const message = snaps.docs.map (docs => docs.data())  
      console.log(message)
      setstate({
          email: _user.email,
          chats: message
      })

      })  
      console.log(Date.now())
      }
      })

    }, [])

    const buildDocKey = (friend) =>[state.email , friend].sort().join(":")


    const selectChat = (chatIndex) => {
      console.log(chatIndex)
      setSelectedChat(chatIndex)
    }

    // const newChatBtnClicked = () => {
    //   setnewChatFormVisible(true) 
    // };

  return (
    <div className="App">
     <Router>  
       <Switch>
        <Route path="/chat/:person">
          <Header backbutton ="/chat"/>
          <ChatScreen 
          text ={state.chats}
          chat = {state.chats[selectedChat]}
          email ={state.email}
          buildDocKey = {buildDocKey}
          
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
           <Header/>
           <LogIn/>
         </Route>  
        <Route path="/signUp">
           <Header/>
           <SignUp/>
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


export default Main
