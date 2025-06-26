"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

type Match = {
  _id: string;
  title: string;
};

export default function JoinedMatchList() {
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axiosInstance.get("/user");
        setMatches(res.data.user.joinedOnlyMatches);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Your Joined Matches</h2>
      <ul className="space-y-2">
        {matches?.length > 0 ? (
          matches.map((match) => (
            <li
              key={match._id}
              className="p-3 bg-blue-100 rounded cursor-pointer hover:bg-blue-200"
             onClick={() => router.push(`/message/${match._id}`)}

            >
              {match.title}
            </li>
          ))
        ) : (
          <p>No joined matches found.</p>
        )}
      </ul>
    </div>
  );
}



// "use client"; 

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: Socket;

// type ChatMessage = {
//   _id: string;
//   roomId: string;
//   senderId: string;
//   message: string;
//   createdAt: string;
// };

// type Props = {
//   roomId: string;
//   userId: string;
// };

// export default function Chat({ roomId, userId }: Props) {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   useEffect(() => {
//     // Initialize socket connection
//     socket = io("http://localhost:5000", {
//       query: { userId },
//       transports: ["websocket"],
//     });

//     // Join the room
//     socket.emit("joinRoom", roomId);

//     // Listen for new messages
//     socket.on("newMessage", (msg: ChatMessage) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // Listen for errors
//     socket.on("errorMessage", (err: string) => {
//       console.log(err , "hlooooo");
      
//       alert(err);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId, userId]);

//   const handleSend = () => {
//     if (!message.trim()) return;

//     socket.emit("sendMessage", {
//       roomId,
//       senderId: userId,
//       message,
//     });

//     setMessage("");
//   };

//   return (
//     <div className="max-w-md p-4 mx-auto mt-10 bg-white border rounded shadow">
//       <h2 className="mb-4 text-xl font-bold">Match Chat</h2>

//       <div className="h-64 p-2 mb-3 overflow-y-auto border rounded bg-gray-50">
//         {messages.map((msg) => (
//           <div key={msg._id} className="mb-2">
//             <p className="text-sm">
//               <strong>{msg.senderId === userId ? "You" : msg.senderId}</strong>:
//               {msg.message}
//             </p>
//             <span className="text-xs text-gray-500">
//               {new Date(msg.createdAt).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 px-3 py-1 border rounded"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={handleSend}
//           className="px-4 py-1 text-white bg-blue-500 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


// components/chat/FloatingChat.tsx
