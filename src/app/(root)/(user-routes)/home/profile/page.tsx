"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot, FaRupeeSign, FaCalendarCheck } from "react-icons/fa6";
import { IoFootball, IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdEmail, MdPhone, MdSportsScore } from "react-icons/md";
import { BiTrophy } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import Image from "next/image";
import { Edit } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import EditProfileModal from "@/components/user/editProfileModal";
import TicketModal from "@/components/user/ticketModal";
import { currentUser } from "@/redux/actions/user/userAction";

interface BookingData {
  _id: string;
  turf: {
    name: string;
    location?: string;
  };
  date: string | Date;
  startTime: string;
  endTime: string;
  amount: number;
  status?: string;
}

interface MatchData {
  _id: string;
  title: string;
  turfId: {
    name: string;
    location?: string;
  };
  date: string | Date;
  maxPlayers: number;
  joinedPlayers:  {
    _id: string;
    username: string;
    email: string;
  }[];
  hostId?: {
    username: string;
  };
  description?: string;
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

function ProfilePage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("bookings");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicketData, setSelectedTicketData] = useState<BookingData | MatchData | null>(null);
  const [ticketType, setTicketType] = useState<"booking" | "hosted" | "joined">("booking");

  const { user, bookings, hostedMatches, joinedOnlyMatches } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const handleViewTicket = (data: BookingData | MatchData, type: "booking" | "hosted" | "joined") => {
    setSelectedTicketData(data);
    setTicketType(type);
    setIsTicketModalOpen(true);
  };

  const renderBookings = () => (
    <div className="space-y-3">
      {bookings === null || bookings?.length <= 0 ? (
        <>
          <p>no booking found</p>
        </>
      ) : (
        bookings.map((booking: BookingData) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "#00423D" }}
                >
                  {booking.turf.name}
                </h3>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: "#415C41" }}
                >
                  <div className="flex items-center gap-1">
                    <CiCalendarDate className="text-green-700" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoTimeSharp className="text-green-700" />
                    <span>
                      {booking.startTime}-{booking.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-green-700" />
                    <span>₹{booking.amount}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex gap-2">
                <button 
                  onClick={() => handleViewTicket(booking, "booking")}
                  className="px-4 py-2 bg-[#00423D] text-white text-sm font-medium rounded-lg transition-all hover:opacity-90"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderHostedMatches = () => (
    <div className="space-y-3">
      {hostedMatches === null || hostedMatches.length <= 0 ? (
        <>
          <p>no hosted matches</p>
        </>
      ) : (
        hostedMatches.map((match: MatchData) => (
          <div key={match._id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "#00423D" }}
                >
                  {match.title}
                </h3>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: "#415C41" }}
                >
                  <div className="flex items-center gap-1">
                    <IoFootball className="text-green-700" />
                    <span>{match.turfId.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiCalendarDate className="text-green-700" />
                    <span>{formatDate(match.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdSportsScore className="text-green-700" />
                    <span>
                      {match.joinedPlayers.length}/{match.maxPlayers}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex gap-2">
                <button 
                  onClick={() => handleViewTicket(match, "hosted")}
                  className="px-4 py-2 bg-[#00423D] text-white text-sm font-medium rounded-lg transition-all hover:opacity-90"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderJoinedMatches = () => (
    <div className="space-y-3">
      {joinedOnlyMatches === null || joinedOnlyMatches.length <= 0 ? (
        <>
          <p>no joined matches</p>
        </>
      ) : (
        joinedOnlyMatches.map((match: MatchData) => (
          <div key={match._id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "#00423D" }}
                >
                  {match.title}
                </h3>
                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: "#415C41" }}
                >
                  <div className="flex items-center gap-1">
                    <IoFootball className="text-green-700" />
                    <span>{match.turfId.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CiCalendarDate className="text-green-700" />
                    <span>{formatDate(match.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdSportsScore className="text-green-700" />
                    <span>
                      {match.joinedPlayers.length}/{match.maxPlayers}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex gap-2">
                <button 
                  onClick={() => handleViewTicket(match, "joined")}
                  className="px-4 py-2 bg-[#00423D] text-white text-sm font-medium rounded-lg transition-all hover:opacity-90"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-20 mb-20">
      <div className="max-w-8xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <Image
                src={
                  user?.picture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile"
                height={20}
                width={20}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4"
                style={{ borderColor: "#00423D" }}
              />
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#00423D" }}
              >
                <Edit className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "#00423D" }}
              >
                {user?.username}
              </h1>
              <div
                className="flex flex-wrap items-center gap-4 text-sm mb-4"
                style={{ color: "#415C41" }}
              >
                <div className="flex items-center gap-2">
                  <MdEmail className="text-green-700" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdPhone className="text-green-700" />
                  <span>+91 {user?.phone || "00000 00000"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-green-700" />
                  <span>{user?.preferredLocation || "Not specified"}</span>
                </div>
              </div>
              <p className="text-sm" style={{ color: "#415C41" }}>
                Member since {"jun 2025"}
              </p>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#00423D" }}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <FaCalendarCheck className="text-3xl text-green-700" />
            </div>
            <h3 className="text-2xl font-bold" style={{ color: "#00423D" }}>
              {bookings?.length || 0}
            </h3>
            <p className="text-sm" style={{ color: "#415C41" }}>
              Total Bookings
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <MdSportsScore className="text-3xl text-green-700" />
            </div>
            <h3 className="text-2xl font-bold" style={{ color: "#00423D" }}>
              {joinedOnlyMatches?.length || 0}
            </h3>
            <p className="text-sm" style={{ color: "#415C41" }}>
              Matches Played
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <BiTrophy className="text-3xl text-green-700" />
            </div>
            <h3 className="text-2xl font-bold" style={{ color: "#00423D" }}>
              {hostedMatches?.length || 0}
            </h3>
            <p className="text-sm" style={{ color: "#415C41" }}>
              Matches Hosted
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "bookings"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCalendarCheck />
                  My Bookings
                </div>
              </button>
              <button
                onClick={() => setActiveTab("hosted")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "hosted"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BsCalendar2Event />
                  Hosted Matches
                </div>
              </button>
              <button
                onClick={() => setActiveTab("joined")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "joined"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MdSportsScore />
                  Joined Matches
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold" style={{ color: "#00423D" }}>
                {activeTab === "bookings" && "My Bookings"}
                {activeTab === "hosted" && "Hosted Matches"}
                {activeTab === "joined" && "Joined Matches"}
              </h2>
              <p className="text-sm mt-1" style={{ color: "#415C41" }}>
                {activeTab === "bookings" &&
                  "View and manage your venue bookings"}
                {activeTab === "hosted" &&
                  "Matches you've organized and hosted"}
                {activeTab === "joined" &&
                  "Matches you've joined or plan to join"}
              </p>
            </div>

            {activeTab === "bookings" && renderBookings()}
            {activeTab === "hosted" && renderHostedMatches()}
            {activeTab === "joined" && renderJoinedMatches()}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        data={selectedTicketData}
        type={ticketType}
      />
    </div>
  );
}

export default ProfilePage;