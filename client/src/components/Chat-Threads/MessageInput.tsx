"use client"

import { useSelectedUser } from '@/store/userStore';
import { SendMsIcon, SmileFaceIcon } from '@/utils/icons';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';

const Picker = dynamic(  //package assumes it runs in the browser.
    () => {
        return import("emoji-picker-react");
    },
    {ssr:false}   //server-side rendering to false from package docs
)

const MessageInput = () => {

    const [inputValue, SetInputValue] = useState<string>("");
    const [showEmojies, setShowEmojies] = useState<boolean>(false);

    const [cookie, setCookie] = useCookies(["user"]);  // me token from cookies

    const selectedUser = useSelectedUser((state) => state.selectedUser);  //from states store

    const socket = io("http://localhost:4000");  // to Backend server

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        socket.emit("private message", selectedUser.email, inputValue, cookie.user);

        SetInputValue("") //clear input area after sending text
    }

    function emojiClickFunc(emojiObject: {emoji: string | number}) {
        SetInputValue((pre) => (pre + emojiObject.emoji));  //add to the input values typed
    }

  return (
    <form onSubmit={handleSubmit} className='mt-auto relative'>
        <div className='w-full relative'>
            <input type="text" value={inputValue} placeholder='Message'
                onChange={(e) => SetInputValue(e.target.value)}
                onClick={() => setShowEmojies(false)} //dont show emoji list after picking one
                className='w-full input pl-14 input-bordered'
            />
        </div>

        <button type='button' onClick={() => setShowEmojies(!showEmojies)}
            className='absolute top-1/2 left-5 -translate-y-1/2'
        >
            <SmileFaceIcon />
        </button>

        {/* Show emojies to pick */}
        {
            showEmojies && (
                <div className='absolute bottom-full'>
                    <Picker onEmojiClick={emojiClickFunc} />
                </div>
            )
        }

        <button type='submit' className='absolute top-1/2 right-5 -translate-y-1/2'
            onClick={() => setShowEmojies(false)} //drop emoji icon after hitting send
        >
            <SendMsIcon />
        </button>
    </form>
  )
}

export default MessageInput