"use client"

import { fetchMessages } from '@/lib/fetchers'
import { useMessages, useSelectedUser, useUser } from '@/store/userStore'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, {useEffect} from 'react'
import shallow from 'zustand/shallow';
import MessageItem from './MessageItem';
import { io } from 'socket.io-client';


const MessageList = () => {

    const sender = useUser((state:any) => state.myUser);
    const receiver = useSelectedUser((state:any) => state.selectedUser);

    const {messages, setMessages} = useMessages((state:any) => ({
      messages: state.messages,
      setMessages: state.setMessages,
    }), shallow);

    const [parent] = useAutoAnimate();

    //Refresh Messages list >> Make it Real Time
    const socket = io("http://localhost:4000");
    socket.on("refresh", () => {
      fetchMessages(sender, receiver, setMessages);
    })


    useEffect(() => {
       fetchMessages(sender, receiver, setMessages);
    }, [receiver])
    

  return (
    <div ref={parent} className='w-full mb-5 flex flex-col max-h-[75vh] overflow-auto no-scrollbar'>
      {
        messages ? (
          messages.map((item:any, i:number) => (

            //Message Item
              <MessageItem key={i} 
                user={sender.email == item.sender ? true : false} 
                message={item.message} 
              />
            
          ))) : (" ")
      }
    </div>
  )
}

export default MessageList