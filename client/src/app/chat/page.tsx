import Messages from '@/components/Chat-Threads/Messages'
import SideBar from '@/components/SideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>
      <div className="mx-auto flex">
        {/* SIDE BAR */}
        <SideBar/>

        {/* MESSAGES */}
        <Messages />
      </div>
    </div>
  )
}

export default page