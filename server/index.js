const http = require('http')
const path = require("path")
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const connectDB = require('./db')
require('dotenv').config()

const { addUser, removeUser, getUser, getUsersInRoom } = require('./helper/userInChat')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const userControllers = require('./controllers/userControllers')
const weatherControllers = require('./controllers/weatherControllers')
const expenseControllers = require('./controllers/expenseControllers')

app.use("/user", userControllers)
app.use("/weather", weatherControllers)
app.use("/expense", expenseControllers)

//chat related
io.on('connection', (socket) => {
    //Join the chat
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return cb(error)

        if (user) {
            socket.join(user.room)
            socket.emit('message', { user: "admin", text: `${user.name}, Welcome to the room ${user.room}` })
            socket.broadcast.to(user.room).emit('message', { user: "admin", text: `${user.name} has joined` })

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })

    //Send messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: user.name, text: message })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
        callback()
    })

    // handle typing event
    //when start typing
    socket.on('typing', (typing_name) => {
        const user = getUser(socket.id)

        if (user) {
            socket.broadcast.to(user.room).emit('typing', { typing_name, istyping: true });
        }
    });

    //when stop typing
    socket.on('stopedtyping', () => {
        const user = getUser(socket.id)

        if (user) {
            socket.broadcast.to(user.room).emit('stopedtyping', { istyping: false });
        }
    });

    //disconnect from the chat
    socket.on('disconnect', () => {
        // console.log('User had left!!!');
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
})

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message || "Internal Server Error"
        }
    })
})

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server is running on ${port}`))