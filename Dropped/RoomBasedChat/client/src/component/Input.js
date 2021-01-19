import React from "react"

import '../css/Input.css'

const Input = ({ istyping, typing_name,OnKeyPressEvent, message, setMessage, sendMessage }) => (
  <div>
    { istyping ?
      <p className="status">{`${typing_name} is typing the message...`}</p>
      : null
    }
              
    <div className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={ e => setMessage(e.target.value) }
        onKeyPress={ e => OnKeyPressEvent(e) }
      />
      <button className="sendButton" onClick={ e => sendMessage(e) }>Send</button>
    </div>
  </div>
)


export default Input