import React from 'react'
import { Link } from 'react-router-dom'
import netIc from './img/netflix/logo.png'
import weaIc from './img/weather/stars.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/main.css'

function Main() {
    return (
        <section id="main">
            <h1>Mini Project Collections</h1>

            <section className="pages">
                <div id="netflix" className="page-holder">
                    <img src={netIc} alt="netflix-logo" />
                    <Link to="/netflix">Netflix</Link>
                </div>

                <div id="weather" className="page-holder">
                    <img src={weaIc} alt="netflix-logo" />
                    <Link to="/weather">Weather</Link>
                </div>

                <div id="chat" className="page-holder">
                    <FontAwesomeIcon icon="comment" size='lg' />
                    <Link to="/join-in-chat">Chat</Link>
                </div>

                <div id="expense" className="page-holder">
                    <FontAwesomeIcon icon="tags" size='lg' />
                    <Link to="/expense">Expense</Link>
                </div>
            </section>
        </section>
    )
}

export default Main