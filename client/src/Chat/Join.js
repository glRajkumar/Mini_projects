import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/join.css'

function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>

        <input
          placeholder="Name"
          className="input-box"
          type="text"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Room"
          className="input-box"
          type="text"
          onChange={e => setRoom(e.target.value)}
        />

        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat/${name}/${room}`}>
          <button className="gen-but" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join