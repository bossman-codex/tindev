import React from 'react';
import './App.css';
import Header from "./Component/Header"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import TinderCards from './Component/TinderCards';
import SwipeButton from './Component/SwipeButton'
import Chats from "./Chats"
import ChatScreen from './Component/ChatScreen'
import Profile from './Component/Profile'
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app'
import Main from "./Component/Main"
import  Auth from "./Component/Auth"




function App() {
  const auth =firebase.auth();


  console.log(auth)
  return (
      <div> 
       
        <Main/>
      </div>
  );
  
}

export default App;
