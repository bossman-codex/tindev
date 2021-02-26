import React from 'react'
import '../Style/chat.css'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import { ListItem, ListItemText ,ListItemAvatar, Typography } from '@material-ui/core'



function Chat({infos , selectChatFn , selectedChatIndex}) {

  
        const selectChat = (index) => {
            selectChatFn(index)
        }
    

    return (
        <>
        
        <Link to={`/chat/${infos.email}`}>
            {infos.chats.map((chats , index)=>{
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
                  </ListItem>
              )
           })}
           
        </Link> 
        </>
    )
  
}

export default Chat
