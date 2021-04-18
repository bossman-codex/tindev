import React from  "react"
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tinder from "./tinder-logo.png"
import "../Style/header.css"
import {Link, useHistory} from "react-router-dom"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
 
function Header ({backbutton , menu}){
    const history = useHistory()
 return(
     <div className= "header">
       {backbutton ?
         (
          <IconButton onClick = {()=>history.replace(backbutton)}>
          <ArrowBackIosIcon className="header_icons" fontSize="large"/>
          </IconButton>
         )
         : (
        <Link to="/profile">    
            <IconButton>
            <PersonIcon className="header_icon" fontSize="large"/>
            </IconButton>
        </Link>  
         ) 
        }

        
       
       <Link to='/'>
         <img
         className= "header_logo" 
         src = {Tinder}
         alt = "tinder-logo"
         />
         </Link>



         {
          menu ?
          (
          <IconButton>
          <MoreVertIcon className="header_icons" fontSize="large"/>
          </IconButton>
          )
          :
          (
               <Link to="/chat">
              <IconButton>
                <ForumIcon className="header_icon" fontSize="large"/>  
              </IconButton>  
                </Link>
          )
        }
        
     </div>
 )
}

export default Header 
