// src/components/ChatComponent.tsx
"use client"
import { useEffect } from "react";
import { socket } from "../../../socket/soket"

const ChatComponent = () => {
  useEffect(() => {
    // Listen for chat messages
    socket.on("chat:receive", (message) => {
      console.log("📩 New message:", message);
    });

    // Cleanup on unmount
    return () => {
      socket.off("chat:receive");
    };
  }, []);

  return <div>Chat UI here</div>;
};

export default ChatComponent;
