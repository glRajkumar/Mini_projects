import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useParams, useHistory } from 'react-router-dom';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import CurrentUsers from './CurrentUsers';
import "../css/chat.css"

let socket;
const EndPoint = '/' // localhost:5000

function ChatRoom() {
    const history = useHistory()
    const { name, room } = useParams()
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [istyping, setTyping] = useState(false)
    const [typing_name, setTypName] = useState("")

    useEffect(() => {
        socket = io(EndPoint)

        socket.emit('join', { name, room }, ({ error }) => {
            if (error) {
                alert(error)
            }
        })

        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        socket.on("typing", ({ typing_name, istyping }) => {
            setTypName(typing_name.typing_name)
            setTyping(istyping)
        })

        socket.on("stopedtyping", ({ istyping }) => {
            setTyping(istyping)
        })

        return () => leave()
    }, [])

    const leave = () => {
        socket.on('disconnect')
        socket.off()
        history.push('/')
    }

    const OnKeyPressEvent = (e) => {
        if (e.key === 'Enter') {
            socket.emit("stopedtyping")
            sendMessage(e)
        } else {
            socket.emit('typing', { typing_name: name })
        }
    }

    //function for sending message
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="chatcontainer">
                <InfoBar room={room} leave={leave} />
                <Messages messages={messages} name={name} />
                <Input
                    istyping={istyping}
                    typing_name={typing_name}
                    OnKeyPressEvent={OnKeyPressEvent}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>

            <CurrentUsers users={users} />
        </div>
    )
}

export default ChatRoom