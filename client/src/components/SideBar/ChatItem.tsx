"use client";

import { useSelectedUser } from '@/store/userStore';
import { userProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const ChatItem = ({user}:{user:userProps}) => {

  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);

   //change classNames of chatItem selcted for Mobile
  function handleClick(e:any) {
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");  //remove element that has this in its className

    e.currentTarget.classList.add("selected-user"); //add className to selected >> check global.css

    setSelectedUser(user);   //added selected user to states store
  }

  return (
    <>
        <li onClick={handleClick} className="flex gap-3 cursor-pointer hover:bg-slate-300 p-5 rounded-lg">
            <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image src={user?.imageId || ""} alt='avatar' width={256} height={256} />
                </div>
            </div>

            <div className='flex flex-col justify-between'>
              <h3 className='font-semibold text-lg text-black'>{user?.name}</h3>
              <p className='text-[#707991] italic'>User has joined!</p>
            </div>
        </li>

        <div className='divider my-0'/>
    </>
  )
}

export default ChatItem