import React from "react"

const Input = ({ istyping, typing_name, OnKeyPressEvent, message, setMessage, sendMessage }) => (
  <div>
    {
      istyping && <p className="status">{`${typing_name} is typing the message...`}</p>
    }

    <div className="chatform">
      <input
        className="chatinput"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => OnKeyPressEvent(e)}
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </div>
  </div>
)


export default Input