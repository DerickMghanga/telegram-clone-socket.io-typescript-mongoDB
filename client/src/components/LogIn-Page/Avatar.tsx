import React from 'react'
import Image from 'next/image'
import { AvatarProps } from '@/types'

function Avatar({avatarId, setAvatarId}:AvatarProps) {
  return (
    <div className='avatar cursor-pointer mx-auto mb-5 tooltip' 
       onClick={() => setAvatarId((Math.random() * 20).toFixed())} data-tip="click to regenerate avatar"
    >

        <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <Image alt='avatar' src={`https://robohash.org/${avatarId}.png`} 
                width={256} height={256}
            />
        </div>
        
    </div>
  )
}

export default Avatar