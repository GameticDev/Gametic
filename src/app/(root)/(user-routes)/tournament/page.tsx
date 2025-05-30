'use client'
import TournamentCard from '@/components/user/tournamentCard';
import React from 'react'
export interface Tournament {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  distance: string;
  playersJoined: number;
  maxPlayers: number;
  startDate: string;
  endDate: string;
  entryFee: number;
  prizePool: number;
  status: "Upcoming" | "Ongoing" | "Completed";
  image: string;
  icon: string;
}

// export const demoTournaments: Tournament[] = [
//   {
//     id: "1",
//     title: "BPL",
//     subtitle: "Bengaluru premier league",
//     location: "South United Football Club, RBANM's Ground",
//     distance: "~0.10 km",
//     playersJoined: 5,
//     maxPlayers: 8,
//     startDate: "May 8",
//     endDate: "May 20",
//     entryFee: 1000,
//     prizePool: 10000,
//     status: "Upcoming",
//     image: "/stadium.jpg",
//     icon: "/football-icon.png"
//   },
//   {
//     id: "2",
//     title: "CPL",
//     subtitle: "Chennai pro league",
//     location: "Chennai Football Arena",
//     distance: "~2.3 km",
//     playersJoined: 6,
//     maxPlayers: 10,
//     startDate: "June 1",
//     endDate: "June 10",
//     entryFee: 800,
//     prizePool: 7500,
//     status: "Ongoing",
//     image: "/stadium.jpg",
//     icon: "/football-icon.png"
//   }
// ];

const data={id: "2",
    title: "CPL",
    subtitle: "Chennai pro league",
    location: "Chennai Football Arena",
    distance: "~2.3 km",
    playersJoined: 6,
    maxPlayers: 10,
    startDate: "June 1",
    endDate: "June 10",
    entryFee: 800,
    prizePool: 7500,
    status: "Ongoing",
    image: "/stadium.jpg",
    icon: "/football-icon.png"
}

function page() {
  return (
    <main className="flex flex-wrap bg-amber-500 justify-center items-start gap-6 p-6 min-h-screen">
      {[...Array(10)].map(tournament => (
        <TournamentCard key={tournament.id} data={tournament} />
      ))}
    </main>
  );
}

export default page
