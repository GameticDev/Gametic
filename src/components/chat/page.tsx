"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Image from "next/image"; // if using profile pic
// import { cn } from "@/lib/utils";

type ChatMessage = {
  _id: string;
  roomId: string;
  senderId: { _id: string; username: string ; picture : string };
  message: string;
  createdAt: string;
};

type Props = { roomId: string; userId: string };

export default function Chat({ roomId, userId }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/getmessage/${roomId}`, {
          withCredentials: true,
        });
        setMessages(res.data.chat);
      } catch (err) {
        console.error("Fetch messages failed", err);
      }
    };

    fetchMessages();

const socket = io("http://localhost:5000");



    socketRef.current = socket;

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
  socket.emit("joinRoom", { roomId, userId });
});

    socket.on("newMessage", (msg: ChatMessage) => {
      console.log("Received:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // socket.on("errorMessage", (msg: string) => alert(msg));

    return () => {
      socket.disconnect();
    };
  }, [roomId, userId]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    socketRef.current?.emit("sendMessage", {
      roomId,
      message,
      userId
    });

    setMessage("");
  };

  return (
       <div className="w-full max-w-4xl px-4 py-6 mx-auto">
  <h2 className="text-2xl font-bold text-[#415C41] mb-6">Game Chat</h2>

  {/* Chat area */}
  <div
    ref={chatRef}
    className="h-[70vh] overflow-y-auto p-4 bg-[#F8F9F8] border border-[#98916D]/40 rounded-xl shadow-inner space-y-4"
  >
    {messages.map((msg) => {
      const isSelf = msg.senderId._id === userId;
      return (
        <div key={msg._id} className={`flex ${isSelf ? "justify-end" : "justify-start"} items-start gap-2`}>
          {!isSelf && (
            <Image
              src={msg.senderId?.picture || "/avatar-default.png"}
              alt="avatar"
              width={36}
              height={36}
              className="object-cover rounded-full"
            />
          )}
          <div
            className={`max-w-[75%] px-4 py-3 text-sm shadow-md rounded-xl ${
              isSelf
                ? "bg-[#415C41] text-white rounded-tr-none"
                : "bg-white text-[#1C1C1C] rounded-tl-none"
            }`}
          >
            <p className="mb-1 font-semibold">
              {isSelf ? "You" : msg.senderId.username}
            </p>
            <p>{msg.message}</p>
            <p className="text-xs text-[#98916D] text-right mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      );
    })}
  </div>

  {/* Input field */}
  <div className="flex gap-3 mt-5">
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 px-4 py-3 border border-[#98916D]/60 rounded-md focus:outline-none focus:ring-2 focus:ring-[#415C41] placeholder:text-sm"
      placeholder="Type your message..."
    />
    <button
      onClick={handleSend}
      disabled={!message.trim()}
      className="bg-[#415C41] hover:bg-[#2D4D2A] text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300 disabled:opacity-50"
    >
      Send
    </button>
  </div>
</div>

  );
}
