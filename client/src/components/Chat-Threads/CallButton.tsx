"use client";

import { useSelectedUser, useUser } from '@/store/userStore';
import { PhoneIcon } from '@/utils/icons'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';

const CallButton = () => {

  const router = useRouter();
  const socket = io("http://localhost:4000");
  const [cookie] = useCookies(["user"]);

  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const myUser = useUser((state) => state.myUser);

  function handleClick() {
    socket.emit(
      "private message",
      selectedUser.email,
      "📞 "+myUser.name+" is calling"+ " 📞 " + selectedUser.name,
      cookie.user,
    )

    router.push("/chat/room");  //push to Livekit room call
  }


  return (
    <button onClick={handleClick}>
        <PhoneIcon />
    </button>
  )
}

export default CallButton