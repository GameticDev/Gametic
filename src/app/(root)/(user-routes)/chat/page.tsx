"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

type Player = {
  _id: string;
  title: string;
  joinedPlayers: string[];
};

type Message = {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
};

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<null | Player>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axiosInstance.get("/getplayes");
        setPlayers(res.data.players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const openChat = async (player: Player) => {
    setSelectedPlayer(player);
    setMessageLoading(true);
    try {
      const res = await axiosInstance.get(`/getmessage/${player._id}`);
      setMessages(res.data.chat);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setMessageLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>

      {loading ? (
        <p>Loading...</p>
      ) : players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <div className="space-y-4">
          {players.map((player) => (
            <div
              key={player._id}
              onClick={() => openChat(player)}
              className="bg-white shadow p-4 rounded-lg border cursor-pointer hover:bg-gray-100"
            >
              <h2 className="text-lg font-semibold text-blue-600">{player.title}</h2>
              <p className="text-sm text-gray-600">
                Joined Players: {player.joinedPlayers.length}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Chat Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] h-[500px] shadow-lg flex flex-col relative">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-semibold">{selectedPlayer.title}</h3>
              <button
                onClick={() => {
                  setSelectedPlayer(null);
                  setMessages([]);
                }}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2 text-sm">
              {messageLoading ? (
                <p className="text-gray-500">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-400">No messages found.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="flex flex-col">
                    <span className="text-gray-700">{msg.senderId}:</span>
                    <span className="bg-gray-200 rounded px-3 py-1 inline-block w-fit">
                      {msg.message}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Input (dummy) */}
            <div className="p-3 border-t flex items-center gap-2">
              <input
                type="text"
                disabled
                placeholder="Type a message..."
                className="flex-1 border rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <button
                disabled
                className="bg-blue-400 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
