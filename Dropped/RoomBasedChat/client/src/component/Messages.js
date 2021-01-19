import React, { useRef, useEffect } from 'react'
import Message from './Message'

import '../css/Messages.css'

function Messages({messages, name}){
    const msg = useRef('')
    
    useEffect(()=>{
        msg.current.scrollTop = msg.current.scrollHeight  
    })

    return(
    <div className="messages" ref={msg} >
        {messages.map((message, i) => 
            <div key={i}>
                <Message message={message} name={name} />
            </div>
        )}
    </div>
)
}

export default Messages