"use client";

import React, { useState } from "react";
import { FaLocationDot, FaRupeeSign, FaCalendarCheck } from "react-icons/fa6";
import { IoFootball, IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdEmail, MdPhone, MdSportsScore } from "react-icons/md";
import { BiTrophy } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import Image from "next/image";
import { Edit } from "lucide-react";
import { useAppSelector } from "@/redux/hook";

// Mock data - replace with real data from your backend
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  location: "Kozhikode, Kerala",
  joinedDate: "January 2024",
  profileImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  totalBookings: 25,
  totalMatches: 18,
  totalHosted: 5,
};

const mockBookings = [
  {
    id: 1,
    venueName: "Green Valley Sports Complex",
    date: "2024-06-15",
    time: "18:00 - 20:00",
    amount: 2000,
    status: "Confirmed",
    location: "Kozhikode",
  },
  {
    id: 2,
    venueName: "Champions Turf",
    date: "2024-06-20",
    time: "16:00 - 17:00",
    amount: 1500,
    status: "Pending",
    location: "Malappuram",
  },
  {
    id: 3,
    venueName: "Elite Football Ground",
    date: "2024-06-08",
    time: "19:00 - 21:00",
    amount: 3000,
    status: "Completed",
    location: "Kochi",
  },
];

const mockHostedMatches = [
  {
    id: 1,
    title: "Friday Night Football",
    venue: "Green Valley Sports Complex",
    date: "2024-06-14",
    time: "19:00 - 21:00",
    participants: 12,
    maxParticipants: 16,
    status: "Active",
  },
  {
    id: 2,
    title: "Weekend Warriors Cup",
    venue: "Champions Turf",
    date: "2024-06-22",
    time: "17:00 - 19:00",
    participants: 8,
    maxParticipants: 12,
    status: "Recruiting",
  },
];

const mockJoinedMatches = [
  {
    id: 1,
    title: "Sunday League Match",
    host: "Alex Kumar",
    venue: "Elite Football Ground",
    date: "2024-06-16",
    time: "16:00 - 18:00",
    participants: 10,
    maxParticipants: 14,
    status: "Confirmed",
  },
  {
    id: 2,
    title: "Midweek Training Session",
    host: "Rahul Sharma",
    venue: "City Sports Arena",
    date: "2024-06-19",
    time: "18:30 - 20:00",
    participants: 6,
    maxParticipants: 10,
    status: "Confirmed",
  },
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const { user } = useAppSelector((state) => state.auth);

  const renderBookings = () => (
    <div className="space-y-3">
      {mockBookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "#00423D" }}
              >
                {booking.venueName}
              </h3>
              <div
                className="flex items-center gap-4 text-sm"
                style={{ color: "#415C41" }}
              >
                <div className="flex items-center gap-1">
                  <CiCalendarDate className="text-green-700" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoTimeSharp className="text-green-700" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRupeeSign className="text-green-700" />
                  <span>₹{booking.amount}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="px-4 py-2 bg-[#998869] text-white text-sm font-medium rounded-lg transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHostedMatches = () => (
    <div className="space-y-3">
      {mockHostedMatches.map((match) => (
        <div key={match.id} className="bg-white rounded-lg shadow-sm p-4">
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
                  <span>{match.venue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CiCalendarDate className="text-green-700" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdSportsScore className="text-green-700" />
                  <span>
                    {match.participants}/{match.maxParticipants}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="px-4 py-2 bg-[#998869] text-white text-sm font-medium rounded-lg transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderJoinedMatches = () => (
    <div className="space-y-3">
      {mockJoinedMatches.map((match) => (
        <div key={match.id} className="bg-white rounded-lg shadow-sm p-4">
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
                  <span>{match.venue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CiCalendarDate className="text-green-700" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdSportsScore className="text-green-700" />
                  <span>
                    {match.participants}/{match.maxParticipants}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="px-4 py-2 bg-[#998869] text-white text-sm font-medium rounded-lg transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
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
                className="absolute bottom-0 right-0 p-2 rounded-full text-white"
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
                  <span>{user?.phone || "+91 00000 00000" }</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-green-700" />
                  <span>{user?.location || "Not specified"}</span>
                </div>
              </div>
              <p className="text-sm" style={{ color: "#415C41" }}>
                Member since {"jun 2025"}
              </p>
            </div>

            <button
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
              {mockUser.totalBookings}
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
              {mockUser.totalMatches}
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
              {mockUser.totalHosted}
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
    </div>
  );
}

export default ProfilePage;
