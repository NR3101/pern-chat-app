import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); // create express app
const server = http.createServer(app); // create a server using express app

// create a socket server using the server
const io = new Server(server, {
  cors: {
    // cors configuration
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// function to get the socketId of the receiver
export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

// This is used to store the mapping of userId to socketId
const userSocketMap: {
  [key: string]: string; // {userId: socketId}
} = {};

// This is used to listen to the connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  const userId = socket.handshake.query.userId as string;

  if (userId) userSocketMap[userId] = socket.id;

  // io.emit is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on is used to listen to events.Can be used on both client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
