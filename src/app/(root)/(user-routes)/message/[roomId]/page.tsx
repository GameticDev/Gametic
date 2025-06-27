"use client";

import Chat from "@/components/chat/page"; 
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { roomId } = useParams();
  console.log(roomId, "hooo");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axiosInstance.get("/user");
        setUserId(res.data.user.user._id);
        console.log(res.data.user.user._id);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  if (!roomId || !userId) return <p>Loading chat...</p>;

  return <Chat roomId={roomId as string} userId={userId} />;
}