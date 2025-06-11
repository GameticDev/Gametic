'use client';
import AddTournament from '@/components/user/addTournament';
import TournamentCard from '@/components/user/tournamentCard';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';

export interface Tournament {
  _id: string;
  title: string;
  subtitle: string;
  location: string;
  distance: string;
  joinedTeams: string[]; // Already fixed from previous error
  maxPlayers: number;
  dateFrom: string;
  dateTo: string;
  entryFee: string; // Changed from number to string
  prizePool: string; // Changed from number to string
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  image: string;
  icon: string;
}

function Page() {
  const [data, setData] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axiosInstance.get('/getAllTournament');
        setData(res.data.post);
        console.log(res.data.post);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, []);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;

  return (
    <>
      <div className="flex justify-end mt-16">
        <button
          onClick={openModal}
          style={{ backgroundColor: '#415C41' }}
          className="py-2 px-3 rounded-xl font-semibold text-white"
        >
          Add Tournament
        </button>
      </div>
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-screen">
        {data?.map((tournament) => (
          <TournamentCard key={tournament._id} data={tournament} />
        ))}
        {showModal && <AddTournament onClose={closeModal} />}
      </main>
    </>
  );
}

export default Page;