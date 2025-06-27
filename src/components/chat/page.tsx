"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Send, Smile } from "lucide-react";
import Image from "next/image";

type ChatMessage = {
  _id: string;
  roomId: string;
  senderId: { _id: string; username: string; picture: string };
  message: string;
  createdAt: string;
};

type Props = { roomId: string; userId: string };

export default function Chat({ roomId, userId }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const emojis = ["😂", "😍", "😎", "🔥", "🎉", "👏", "👍", "👎", "🤝", "❤️", "⚽", "🏀", "🏆", "🥇", "🎾", "🥊", "🏈"];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/getmessage/${roomId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setMessages(data.chat);
      } catch (err) {
        console.error("Fetch messages failed", err);
      }
    };

    fetchMessages();

    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom", { roomId, userId });
    });

    socket.on("newMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

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
      userId,
    });

    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-screen bg-[#00423D] flex flex-col pt-16">
      <div className="bg-[#00423D] border-b border-white/10 p-4 shadow-lg">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-white">Game Chat</h2>
        </div>
      </div>

      <div
        ref={chatRef}
        className="flex-1 px-4 py-6 space-y-4 overflow-y-auto"
        style={{ background: "#F5F4EF" }}
      >
        {messages.map((msg) => {
          const isSelf = msg.senderId._id === userId;
          return (
            <div key={msg._id} className={`flex items-start gap-3 ${isSelf ? "justify-end" : "justify-start"}`}>
              {!isSelf && (
                msg.senderId?.picture ? (
                  <Image
                    src={msg.senderId.picture}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center text-sm font-semibold text-white bg-gray-500 rounded-full w-9 h-9">
                    {msg.senderId?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                )
              )}
              <div
                className={`max-w-[70%] px-5 py-3 rounded-xl shadow-md text-sm font-medium whitespace-pre-wrap ${isSelf
                    ? "bg-[#00423D] text-white rounded-tr-none"
                    : "bg-white text-[#1C1C1C] border border-[#998869]/20 rounded-tl-none"
                  }`}
              >
                <div
                  className={`mb-1 font-semibold ${isSelf
                      ? "text-white"
                      : "text-[#2b8607] bg-white/10 px-3 py-1 inline-block "
                    }`}
                >
                  {isSelf ? "You" : msg.senderId.username}
                </div>

                <div>{msg.message}</div>
                <div className="text-xs text-right text-[#998869] mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showEmojiPicker && (
        <div className="w-full max-w-4xl px-6 mx-auto mb-2">
          <div className="p-4 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20">
            <div className="grid grid-cols-8 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-10 h-10 text-xl transition-transform rounded-lg hover:bg-white/20 hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#00423D] border-t border-white/10 p-6">
        <div className="flex items-end max-w-4xl mx-auto space-x-4">
          <div className="relative flex-1">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="w-full px-6 py-4 pr-16 font-medium text-white border rounded-full shadow-lg bg-white/10 placeholder-white/50 border-white/20 focus:outline-none"
            />
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="absolute p-2 transition -translate-y-1/2 right-4 top-1/2 text-white/70 hover:text-white"
            >
              <Smile className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="p-4 bg-[#998869] text-[#00423D] rounded-full hover:bg-[#8b7a58] transition-transform hover:scale-110 shadow-lg"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
