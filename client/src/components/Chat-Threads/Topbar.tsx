"use client"

import { userProps } from '@/types'
import { FlashIcon } from '@/utils/icons'
import Image from 'next/image'
import React from 'react'
import CallButton from './CallButton'

const Topbar = ({selectedUser}:{selectedUser:userProps}) => {

    //mobile responsiveness
    function handleClick() {
        document.querySelector(".messages")?.classList.add("hidden");
        document.querySelector(".sidebar")?.classList.remove("hidden");

    }

  return (
    <div className={`bg-white ${selectedUser ? "" : "md:hidden"}`}>
        <div className="w-full px-10 py-3 flex justify-between items-center">
            <div className="flex gap-3">
                <button onClick={handleClick} className='md:hidden'>
                    <FlashIcon />
                </button>

                <div className="avatar ml-3 cursor-auto">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image src={selectedUser?.imageId || ""} alt='user image' width={256} height={256}/>
                    </div>
                </div>

                <div className="flex flex-col justify-between ml-2">
                    <h3 className="font-semibold text-black text-md">
                        {selectedUser?.name}
                    </h3>
                    <p className='text-[#707991] italic'>online</p>
                </div>

            </div>

            {/* CALL Button */}
            <CallButton />

        </div>
    </div>
  )
}

export default Topbar