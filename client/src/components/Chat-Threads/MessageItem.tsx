import React from 'react'

const MessageItem = ({user, message}:{user:boolean|undefined, message:string|undefined}) => {
  return (
    <div className={`chat ${user ? "chat-end" : "chat-start"}`}>
        <div className={`${user ? "chat-bubble": "chat-bubble-primary"}`}>
            {message}
        </div>
    </div>
  )
}

export default MessageItem