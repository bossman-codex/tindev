import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import LogIn from './LogIn';
import SignUp from './SignUp';
import Header from "./Header"


function Auth() {
    return (
        <div>
            <Router>  
            <Switch>
        <Route path="/login">
           <Header/>
           <LogIn/>
         </Route>  
        <Route path="/signUp">
           <Header/>
           <SignUp/>
         </Route>  
            </Switch>
            </Router>
        </div>
    )
}

export default Auth

