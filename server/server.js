const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const app = express()

app.use(cors())
app.use(express.json())


const server = http.createServer(app)
const io = new Server( server, {
    cors : {
        origin: "http://localhost:5173",
        methods: [ "GET", "POST" ],
    },
})

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
})

server.listen(3000, () => {
    console.log("server running...")
})