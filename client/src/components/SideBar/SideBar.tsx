"use client";

import React, {useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { fetchUser } from '@/lib/fetchers';
import { useUser } from '@/store/userStore';
import { shallow } from 'zustand/shallow';
import SearchBar from './SearchBar';
import ChatList from './ChatList';

const SideBar = () => {

    const [cookie, setCookie] = useCookies(["user"]);   //access cookies in client

    const {myUser, setUser} = useUser((state) => ({myUser: state.myUser, setUser: state.setUser}), shallow);

    useEffect(() => {
        fetchUser(cookie, setUser);

        // console.log({myUser});

    }, [cookie.user]);
    
  return (
      <div className='w-full md:!block sidebar z-10 border border-r-2 border-slate-500 md:w-1/2 lg:w-1/3 p-3 bg-white h-screen'>
        {/* SEARCH BAR */}
        <SearchBar user={myUser} />

        {/* CHATLIST >> only shows when "myUser is available" */}
        {myUser && <ChatList mySelf={myUser} />}
      </div>
  )
}

export default SideBar