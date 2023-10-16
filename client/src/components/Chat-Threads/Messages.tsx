"use client"

import React from 'react'
import Topbar from './Topbar'
import { useSelectedUser } from '@/store/userStore'
import MessageList from './MessageList'

const Messages = () => {

    //selected user from store
    const selectedUser = useSelectedUser((state) => state.selectedUser);

  return (
    <div className='bg-image messages w-full min-h-screen z-0 hidden flex-col md:w-1/2 lg:w-2/3 md:flex md:flex-col'>
        {/* TopBar */}
       <Topbar selectedUser = {selectedUser} />

        <div className={`max-w-sm md:max-w-3xl w-full mx-auto mb-10 ${selectedUser ? " " : "md:hidden"}`}>
            {/* MESSAGES LIST */}
            <MessageList />


            {/* MESSAGES INPUT */}
        </div>

    </div>
  )
}

export default Messages