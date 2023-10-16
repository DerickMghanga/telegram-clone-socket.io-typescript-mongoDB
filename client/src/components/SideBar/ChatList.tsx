"use client"

import { userProps } from '@/types'
import React, {useEffect} from 'react'
import { fetchUsers } from '@/lib/fetchers'
import { useAllUsers } from '@/store/userStore'
import { shallow } from 'zustand/shallow'
import ChatItem from './ChatItem'

const ChatList = ({mySelf}:{mySelf:userProps}) => {

    const {users, setUsers} = useAllUsers((state:any) => ({users: state.users, setUsers: state.setUsers}), shallow);

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