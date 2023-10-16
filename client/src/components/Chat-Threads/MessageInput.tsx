"use client"

import { SendMsIcon, SmileFaceIcon } from '@/utils/icons';
import React, { useState } from 'react'

const MessageInput = () => {

    const [inputValue, SetInputValue] = useState<string>();
    const [showEmojie, setShowEmojies] = useState<boolean>(false);

  return (
    <form className='mt-auto relative'>
        <div className='w-full relative'>
            <input type="text" value={inputValue} placeholder='Message'
                onChange={(e) => SetInputValue(e.target.value)}
                className='w-full input pl-14 input-bordered'
            />
        </div>

        <button type='button' className='absolute top-1/2 left-5 -translate-y-1/2'>
            <SmileFaceIcon />
        </button>

        {/* Show emojies to choose */}
        {
            showEmojie && (
                <div className='absolute bottom-full'>

                </div>
            )
        }

        <button type='submit' className='absolute top-1/2 right-5 -translate-y-1/2'>
            <SendMsIcon />
        </button>
    </form>
  )
}

export default MessageInput