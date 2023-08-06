const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const routeController = require("./api/index");
const axios = require("axios");

const server = http.createServer(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "Chatbot";

let chatRoom = "";
let Users = [];
let chatRoomUsers = [];

io.on("connection", (socket) => {
  console.log(`Connection established with ${socket.id}`);

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    console.log(`User ${username} joined room ${room}`);
    chatRoom = room;
    Users.push({ id: socket.id, username, room });
    chatRoomUsers = Users.filter((user) => user?.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    let createdTime = Date.now();
    socket.to(room).emit("recieve_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdAt: createdTime,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__: createdTime,
    });
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.to(data.room).emit("receive_message", {
      message: data.message,
      username: data.username,
      __createdtime__: data.__createdtime__,
    });
    axios.post("http://localhost:5000/messages", data)
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

app.get("/", (req, res) => {
  res.send(`Hello There`);
});

app.route("/messages").post(routeController.addData);
app.route("/messages/:room").get(routeController.getData)

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
