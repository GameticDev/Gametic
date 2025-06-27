"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
// import Image from "next/image";
import Chat from "@/components/chat/page";

interface Match {
  _id: string;
  title: string;
  lastUpdated?: string;
}

export default function JoinedMatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [roomId, setRoomId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const fetchMatches = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axiosInstance.get("/user");
      setUserId(res.data.user.user._id);
      const sorted = res.data.user.joinedOnlyMatches.sort(
        (a: Match, b: Match) =>
          new Date(b.lastUpdated ?? 0).getTime() -
          new Date(a.lastUpdated ?? 0).getTime()
      );
      setMatches(sorted);
    } catch (err) {
      setError(true);
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleChatClick = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Side - Match List */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-[#998869]/30 px-4 py-6 overflow-y-auto bg-[#F7F6F0]">
        <h2 className="text-xl font-bold text-[#00423D] mb-4 border-b border-[#998869] pb-2">
          Your Matches
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-10 text-[#00423D]">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            Loading...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            <p>Failed to load matches.</p>
            <button
              onClick={fetchMatches}
              className="mt-3 px-4 py-2 bg-[#00423D] text-white rounded-lg hover:bg-[#003530] transition"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {matches.length > 0 ? (
              matches.map((match) => (
                <div
                  key={match._id}
                  onClick={() => handleChatClick(match._id)}
                  className="flex items-center gap-3 bg-white/10 border border-[#998869]/30 rounded-xl p-3 shadow cursor-pointer hover:scale-[1.01] transition backdrop-blur hover:bg-[#998869]/10"
                >
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    {/* <Image
                      src="../../../../../public/profile.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    /> */}
                  </div>
                  <h3 className="text-[#00423D] font-medium text-sm">
                    {match.title}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-center text-[#00423D]/60">No joined matches found.</p>
            )}
          </div>
        )}
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 bg-[#00423D] text-white">
        {roomId ? (
          <Chat roomId={roomId} userId={userId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-white/80">Select a match to view chat</p>
          </div>
        )}
      </div>
    </div>
  );
}
