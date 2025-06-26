"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaTicketAlt,
  FaUsers,
  FaFootballBall,
  FaCheck,
} from "react-icons/fa";
import Image from "next/image";
import TeamCreationModal from "@/components/user/tournament/teamModal";
import FormationModal from "@/components/user/tournament/formationModal"; 
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchTournamentById } from "@/redux/actions/user/tournamentActions";

interface Team {
  name: string;
  sport: string;
  teamManager: {
    username: string;
    email: string;
  };
  players: { name: string; position: string }[];
  members: string[];
}

export interface TournamentDetail {
  _id: string;
  title: string;
  sport: string;
  description: string;
  turf: {
    name: string;
    area: string;
    city: string;
    location: string;
  };
  dateFrom: string;
  dateTo: string;
  entryFee: number;
  prizePool: number;
  joinedTeams: Team[];
  status: string;
  maxTeams: number;
  maxPlayers: number;
  image: string;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
};

const getTeamColor = (teamName: string): string => {
  const colors = ["#415C41", "#98916D", "#6B7280", "#059669", "#7C3AED"];
  const index = teamName.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function TournamentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useAppDispatch();
  const { tournament, loading, error } = useAppSelector(
    (state) => state.tournament
  );
  const {user} = useAppSelector(state=>state.user)
  console.log(user)

  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [isFormationModalOpen, setIsFormationModalOpen] =
    useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('Tournament state:', tournament);
    console.log('User state:', user);
    console.log('Tournament joinedTeams:', tournament?.joinedTeams);
  }, [tournament, user]);

  // Check if data is ready
  const isDataReady = tournament && 
    tournament.joinedTeams && 
    Array.isArray(tournament.joinedTeams);

  // Check if user is already registered - FIXED VERSION
  const isUserRegistered = () => {
    if (!user || !tournament || !tournament.joinedTeams) return false;
    
    // Additional safety check to ensure joinedTeams is an array
    if (!Array.isArray(tournament.joinedTeams)) return false;
    
    try {
      return tournament.joinedTeams.some(team => {
        // Add safety checks for team properties
        if (!team) return false;
        
        const managerMatch = team.teamManager?.email === user.email;
        const memberMatch = Array.isArray(team.members) && team.members.includes(user.email);
        const playerMatch = Array.isArray(team.players) && team.players.some(player => 
          player && player.name === user.username
        );
        
        return managerMatch || memberMatch || playerMatch;
      });
    } catch (error) {
      console.error('Error in isUserRegistered:', error);
      return false;
    }
  };

  // Get user's team if registered - FIXED VERSION
  const getUserTeam = () => {
    if (!user || !tournament || !tournament.joinedTeams) return null;
    
    // Additional safety check to ensure joinedTeams is an array
    if (!Array.isArray(tournament.joinedTeams)) return null;
    
    try {
      return tournament.joinedTeams.find(team => {
        // Add safety checks for team properties
        if (!team) return false;
        
        const managerMatch = team.teamManager?.email === user.email;
        const memberMatch = Array.isArray(team.members) && team.members.includes(user.email);
        const playerMatch = Array.isArray(team.players) && team.players.some(player => 
          player && player.name === user.username
        );
        
        return managerMatch || memberMatch || playerMatch;
      });
    } catch (error) {
      console.error('Error in getUserTeam:', error);
      return null;
    }
  };

  const handleOpenTeamModal = () => {
    setIsTeamModalOpen(true); // Fixed: was setting to false
  };

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  const handleOpenFormationModal = (team: Team) => {
    setSelectedTeam(team);
    setIsFormationModalOpen(true);
  };

  const handleCloseFormationModal = () => {
    setIsFormationModalOpen(false);
    setSelectedTeam(null);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTournamentById({ id }));
    }
  }, [id, dispatch]);

  // Enhanced loading check
  if (loading || !isDataReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#00423D" }}
          ></div>
          <p className="text-xl" style={{ color: "#415C41" }}>
            Loading tournament details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl" style={{ color: "#415C41" }}>
            {error || "Tournament not found"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userRegistered = isUserRegistered();
  const userTeam = getUserTeam();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-20 mb-20">
      <div className="max-w-8xl mx-auto">
        {/* Tournament Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tournament Image */}
            <div className="lg:w-1/3">
              <Image
                src={tournament.image || '/default-tournament.jpg'}
                alt={tournament.title || 'Tournament'}
                height={300}
                width={400}
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = '/default-tournament.jpg';
                }}
              />
            </div>

            {/* Tournament Info */}
            <div className="lg:w-2/3 space-y-4">
              <div>
                <h1
                  className="text-3xl lg:text-4xl font-bold mb-2"
                  style={{ color: "#00423D" }}
                >
                  {tournament.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    {tournament.status}
                  </span>
                  <span className="text-sm" style={{ color: "#998869" }}>
                    {tournament.sport} Tournament
                  </span>
                  {userRegistered && (
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1"
                      style={{ backgroundColor: "#415C41" }}
                    >
                      <FaCheck className="text-xs" />
                      Registered
                    </span>
                  )}
                </div>
              </div>

              {/* Tournament Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Location
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      <span className="text-md font-bold">
                        {tournament.turf?.name || 'TBD'},
                      </span>
                      {tournament.turf?.area && `${tournament.turf.area}, `}
                      {tournament.turf?.city && `${tournament.turf.city}, `}
                      {tournament.turf?.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaCalendarAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Duration
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      {moment(tournament.dateFrom).format("MMM D")} -{" "}
                      {moment(tournament.dateTo).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaTicketAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Entry Fee
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      ₹{tournament.entryFee || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaTrophy className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Prize Pool
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      ₹{tournament.prizePool || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaFootballBall className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Sport
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      {tournament.sport} {tournament.maxPlayers}x
                      {tournament.maxPlayers}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00423D" }}
                  >
                    <FaUsers className="text-white text-sm" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#00423D" }}
                    >
                      Teams Joined
                    </p>
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      {tournament.joinedTeams?.length || 0}/{tournament.maxTeams || 0}{" "}
                      Teams
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Team Section - Show if registered */}
        {userRegistered && userTeam && (
          <div 
            className="border rounded-lg p-4 mb-6 border-[#415C41]/10"
            style={{ 
              backgroundColor: '#f8faf7', 
            }}
          >
            <div className="flex items-center gap-3">
              <FaCheck style={{ color: "#415C41" }} />
              <div>
                <h3 className="font-medium" style={{ color: "#00423D" }}>
                  You&apos;re registered for this tournament!
                </h3>
                <p className="text-sm" style={{ color: "#415C41" }}>
                  Team: <span className="font-medium">{userTeam.name}</span>
                  {userTeam.teamManager?.email === user?.email && (
                    <span 
                      className="ml-2 text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: '#e8ede8', 
                        color: '#00423D' 
                      }}
                    >
                      Team Manager
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Tournament Description */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tournament Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#00423D" }}
              >
                Tournament Overview
              </h2>
              <p className="leading-relaxed" style={{ color: "#415C41" }}>
                {tournament.description || 'Tournament description will be updated soon.'}
              </p>
            </div>

            {/* Tournament Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#00423D" }}
              >
                Tournament Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Professional referees and match officials",
                  "Complete tournament bracket system",
                  "Live score tracking and updates",
                  "Professional photography and videography",
                  "Winner's trophy and medals ceremony",
                  "Team registration and verification",
                  "Medical support and first aid",
                  "Refreshments and energy drinks",
                  "Networking opportunities with teams",
                  "Post-tournament celebration event",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "#00423D" }}
                    ></div>
                    <span className="text-sm" style={{ color: "#415C41" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Joined Teams */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "#00423D" }}
              >
                Participating Teams
              </h3>
              <div className="space-y-3">
                {tournament.joinedTeams && tournament.joinedTeams.length > 0 ? (
                  tournament.joinedTeams.map((team, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenFormationModal(team)}
                      className={`flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors ${
                        userTeam?.name === team.name ? 'border border-[#415C41]/10' : ''
                      }`}
                      style={{
                        backgroundColor: userTeam?.name === team.name ? '#f8faf7' : '',
                      }}
                      type="button"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium relative"
                        style={{ backgroundColor: getTeamColor(team.name || 'Team') }}
                      >
                        {getInitials(team.name || 'T')}
                        {userTeam?.name === team.name && (
                          <div 
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#415C41" }}
                          >
                            <FaCheck className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#00423D" }}
                        >
                          {team.name || 'Unnamed Team'}
                          {userTeam?.name === team.name && (
                            <span style={{ color: "#415C41" }} className="ml-1">(Your Team)</span>
                          )}
                        </p>
                        <p className="text-xs" style={{ color: "#998869" }}>
                          Manager: {team.teamManager?.username || 'TBD'}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm" style={{ color: "#415C41" }}>
                      No teams joined yet
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#415C41" }}>Teams Registered:</span>
                  <span style={{ color: "#00423D" }}>
                    {tournament.joinedTeams?.length || 0}/{tournament.maxTeams || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Tournament Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "#00423D" }}
              >
                Tournament Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#415C41" }}>
                    Total Prize Pool
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#00423D" }}
                  >
                    ₹{tournament.prizePool || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#415C41" }}>
                    Entry Fee
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#00423D" }}
                  >
                    ₹{tournament.entryFee || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#415C41" }}>
                    Tournament Days
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#00423D" }}
                  >
                    {tournament.dateFrom && tournament.dateTo ? 
                      moment(tournament.dateTo).diff(
                        moment(tournament.dateFrom),
                        "days"
                      ) + 1 : 'TBD'
                    }{" "}
                    {tournament.dateFrom && tournament.dateTo ? 'Days' : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#415C41" }}>
                    Max Teams
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#00423D" }}
                  >
                    {tournament.maxTeams || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#415C41" }}>
                    Status
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#00423D" }}
                  >
                    {tournament.status || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Tournament Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-lg font-bold" style={{ color: "#00423D" }}>
                {tournament.title}
              </p>
              <p className="text-sm" style={{ color: "#415C41" }}>
                {tournament.dateFrom && tournament.dateTo ? (
                  <>
                    {moment(tournament.dateFrom).format("MMM D")} -{" "}
                    {moment(tournament.dateTo).format("MMM D, YYYY")} •
                  </>
                ) : 'Date TBD • '}
                {tournament.joinedTeams?.length || 0}/{tournament.maxTeams || 0} Teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: "#00423D" }}>
                ₹{tournament.entryFee || 0}
              </p>
              <p className="text-xs" style={{ color: "#998869" }}>
                Entry Fee
              </p>
            </div>

            {userRegistered ? (
              <div 
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#415C41" }}
              >
                <FaCheck />
                Joined
              </div>
            ) : (
              <button
                onClick={handleOpenTeamModal}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                  (tournament.joinedTeams?.length || 0) >= (tournament.maxTeams || 0) ||
                  tournament.status === "Completed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor:
                    (tournament.joinedTeams?.length || 0) >= (tournament.maxTeams || 0) ||
                    tournament.status === "Completed"
                      ? "#9CA3AF"
                      : "#00423D",
                }}
                disabled={
                  (tournament.joinedTeams?.length || 0) >= (tournament.maxTeams || 0) ||
                  tournament.status === "Completed"
                }
              >
                {(tournament.joinedTeams?.length || 0) >= (tournament.maxTeams || 0)
                  ? "Tournament Full"
                  : tournament.status === "Completed"
                  ? "Tournament Ended"
                  : "Join Tournament"}
              </button>
            )}
          </div>
        </div>
      </div>

      <TeamCreationModal
        isOpen={isTeamModalOpen}
        onClose={handleCloseTeamModal}
        tournament={tournament}
      />
      <FormationModal
        isOpen={isFormationModalOpen}
        onClose={handleCloseFormationModal}
        team={selectedTeam}
        sport={tournament.sport}
        maxPlayers={tournament.maxPlayers}
      />
    </div>
  );
}