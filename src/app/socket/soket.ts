import { io, Socket } from "socket.io-client";

const URL = "http://localhost:5000"; 
export const socket: Socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id);
});