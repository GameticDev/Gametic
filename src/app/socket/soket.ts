import { io, Socket } from "socket.io-client";

const URL = "http://localhost:5000";

export const socket: Socket = io(URL, {
  withCredentials: true,
  autoConnect: false, 

// Connection event handlers
socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// Initialize socket connection with userId
export const initializeSocket = (userId: string) => {
  if (userId) {
    socket.io.opts.query = { userId };
    if (!socket.connected) {
      socket.connect();
    }
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
