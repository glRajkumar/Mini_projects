import React from 'react'
import onlineIcon from '../img/chat/onlineIcon.png'
import closeIcon from '../img/chat/closeIcon.png'

function InfoBar({ room, leave }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>

            <div className="rightInnerContainer">
                <img src={closeIcon} alt="close icon" onClick={() => leave()} />
            </div>
        </div>
    )
}

export default InfoBar