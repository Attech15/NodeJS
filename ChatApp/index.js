const http = require("http"); // we need a http module to use websocket because we cant directly connnect the socket.io with express.js.
const express = require("express");
const path = require("path");
const { Server } = require("socket.io"); // socket.io is library that help us to create the real time chat app

const app = express();
const server = http.createServer(app);
const io = new Server(server); // io is instance of Server.
// Socket.io
io.on("connection", (socket) => { // socket is user and it contains info of users
    // console.log("A new user has connected", socket.id)
    socket.on('user-message',message => {
        io.emit('msg', message);
    // console.log(message);
    })
})



// express
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT: 9000`));