import React from 'react'
import onlineIcon from "../img/chat/onlineIcon.png"

function CurrentUsers({ users }) {
  return (
    <div className="textContainer">
      <div>
        <h1>People currently chatting:</h1>
      </div>
      {
        users
          ? (
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon} />
                  </div>
                ))}
              </h2>
            </div>
          )
          : null
      }
    </div>
  )
}

export default CurrentUsers