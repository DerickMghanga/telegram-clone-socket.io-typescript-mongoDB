"use client"

import { fetchMessages } from '@/lib/fetchers'
import { useSelectedUser, useUser } from '@/store/userStore'
import React, {useEffect} from 'react'


const MessageList = () => {

    const sender = useUser((state:any) => state.myUser);
    const receiver = useSelectedUser((state:any) => state.selectedUser);

    useEffect(() => {
       fetchMessages(sender, receiver, setMessages);
    }, [])
    

  return (
    <div>MessageList</div>
  )
}

export default MessageList