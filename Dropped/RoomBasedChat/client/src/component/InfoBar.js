import React from 'react'

import '../css/InfoBar.css'
import onlineIcon from '../icons/onlineIcon.png'
import closeIcon from '../icons/closeIcon.png'


function InfoBar({room, leave}){
return(
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