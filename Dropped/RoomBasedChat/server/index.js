const http = require('http')
const express = require('express')
const socketio = require('socket.io')
// const cors = require('cors')
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./User')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// app.use(cors)
app.use(router)

io.on('connection', (socket)=>{
    //Join the chat
    socket.on('join', ({name, room}, cb)=>{
        const { error, user } = addUser({ id: socket.id, name, room })

        if(error) return cb(error)

        socket.join(user.room)
        socket.emit('message', { user: "admin", text: `${user.name}, Welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: "admin", text: `${user.name} has joined`})
        
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })

    //Send messages
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    // handle typing event
    //when start typing
    socket.on('typing', ({typing_name}) => {
        const user = getUser(socket.id)

        socket.broadcast.to(user.room).emit('typing', { typing_name, istyping: true});
    });
    
    //when stop typing
    socket.on('stopedtyping', () => {
        const user = getUser(socket.id)

        socket.broadcast.to(user.room).emit('stopedtyping', { istyping: false});
    });

    //disconnect from the chat
    socket.on('disconnect', ()=>{
        // console.log('User had left!!!');
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});        
        }
    })
})

const Port = process.env.PORT || 5000;

server.listen( Port, () => console.log(`Server is running on ${Port}`) )