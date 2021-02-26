import React,{useState, useEffect} from 'react'
import Chat from './Component/Chat'


function Chats() {





    return (
        <div className="chats">
            <Chat
            Name = "Sarah"
            Message = "Hi there"
            TimeStamp = "35 minutes ago"
            ProfilePic =""
            />
            <Chat
            Name = "Sandra"
            Message = "Hi there"
            TimeStamp = "5 minutes ago"
            ProfilePic =""
            />
            <Chat
            Name = "Ellen"
            Message = "Hi there"
            TimeStamp = "45 minutes ago"
            ProfilePic =""
            />
            <Chat
            Name = "Joan"
            Message = "Hi there"
            TimeStamp = "1 minutes ago"
            ProfilePic =""
            />
        </div>
    )
}

export default Chats
