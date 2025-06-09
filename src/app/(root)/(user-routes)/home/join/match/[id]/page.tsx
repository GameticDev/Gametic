"use client";
import React, { useEffect } from "react";
import JoinHeader from "@/components/user/join/header";
import JoinBar from "@/components/user/join/joinBar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useParams } from "next/navigation";
import { fetchMatchById } from "@/redux/actions/user/hostActions";

interface MatchHighlight {
  id: number;
  text: string;
}

const formatDate = (dateInput: unknown): string => {
  console.log("formatDate input:", { dateInput, type: typeof dateInput });

  if (!dateInput) {
    console.warn("Invalid date input: null or undefined");
    return "N/A";
  }

  const date =
    typeof dateInput === "string"
      ? new Date(dateInput)
      : dateInput instanceof Date
      ? dateInput
      : null;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn("Invalid date format:", dateInput);
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const SportsMatchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const matchId = params?.id as string;
  const { match } = useAppSelector((state) => state.host);

  useEffect(() => {
    dispatch(fetchMatchById({ matchId }));
  }, [dispatch, matchId]);

  console.log(match);

  const highlights: MatchHighlight[] = [
    { id: 1, text: "Professional coaching and skill development sessions" },
    { id: 2, text: "Complete sports equipment and gear provided" },
    { id: 3, text: "Team formation and strategy briefing included" },
    { id: 4, text: "Post-match analysis and performance feedback" },
    { id: 5, text: "Refreshments and energy drinks during breaks" },
    { id: 6, text: "Professional referee and match officials" },
    { id: 7, text: "Team photos and highlight video recording" },
    { id: 8, text: "Winner's trophy and individual awards ceremony" },
    { id: 9, text: "First aid support and safety equipment" },
    { id: 10, text: "Networking opportunities with fellow athletes" },
  ];

  const matchDate = formatDate(match?.date);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 pt-20 mb-20">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <JoinHeader
            title={match?.title || ""}
            turf={match?.turfId || { _id: "", name: "", city: "", area: "", location: "" }}
            userId={match?.userId || { _id: "", username: "Unknown Host" }}
            sports={match?.sports || ""}
            date={matchDate || ""}
            maxPlayers={match?.maxPlayers || 0}
            startTime={match?.startTime || ""}
            endTime={match?.endTime || ""}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Match Overview */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Match Overview
                </h2>
                <p className="leading-relaxed" style={{ color: "#415C41" }}>
                  Join us for an exciting championship football match featuring
                  competitive teams from across the region. This professionally
                  organized match includes expert coaching, complete equipment,
                  and a chance to showcase your skills in a tournament-style
                  competition. Whether you're a seasoned player or looking to
                  improve your game, this match offers the perfect opportunity
                  to compete at a high level while building lasting connections
                  with fellow athletes.
                </p>
              </div>

              {/* Match Highlights */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#00423D" }}
                >
                  What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((highlight) => (
                    <div key={highlight.id} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "#00423D" }}
                      ></div>
                      <span className="text-sm" style={{ color: "#415C41" }}>
                        {highlight.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Information Cards */}
            </div>

            {/* Right Column - Joined Players */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#00423D" }}
                >
                  Joined Players
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#415C41" }}
                    >
                      A
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Alex Johnson
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Host
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#415C41" }}
                    >
                      M
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Mike Chen
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Player
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#98916D" }}
                    >
                      S
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Sarah Wilson
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Player
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#415C41" }}
                    >
                      D
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        David Rodriguez
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Player
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#00423D" }}
                    >
                      L
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        Lisa Park
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Player
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#98916D" }}
                    >
                      J
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#00423D" }}
                      >
                        James Brown
                      </p>
                      <p className="text-xs" style={{ color: "#998869" }}>
                        Player
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#415C41" }}>Players:</span>
                    <span style={{ color: "#00423D" }}>6/11</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JoinBar />
    </>
  );
};

export default SportsMatchPage;
