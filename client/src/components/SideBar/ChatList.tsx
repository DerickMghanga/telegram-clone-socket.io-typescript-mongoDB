"use client"

import { userProps } from '@/types'
import React, {useEffect} from 'react'
import { fetchUsers } from '@/lib/fetchers'
import { useAllUsers } from '@/store/userStore'
import { shallow } from 'zustand/shallow'
import ChatItem from './ChatItem'
import { io } from 'socket.io-client'

const ChatList = ({mySelf}:{mySelf:userProps}) => {

    const {users, setUsers} = useAllUsers((state:any) => ({users: state.users, setUsers: state.setUsers}), shallow);

    //auto-refresh Chat list after a new user joined
    useEffect(() => {
        const socket = io("http://localhost:4000"); //backend server(socket)
        socket.on("new-user", () => {
        fetchUsers(mySelf, setUsers);
    })
    }, []);
    

    useEffect(() => {
        fetchUsers(mySelf, setUsers);
        // console.log(users);

    }, []);

  return (
    <ul className="my-5 flex flex-col">
 
        {/* ChatItem  >> will display of users are available*/}
        {
            users ? (
                users?.map((user:any) => 
                    <ChatItem key={user._id} user={user} />
                ).reverse()  // reverse to display Recent who joined at the top
                
            ) : (
                <span className='loading loading-spinner w-16' />
            )
        }
    </ul>
  )
}

export default ChatList