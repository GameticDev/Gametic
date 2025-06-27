"use client";
import TournamentCard from "@/components/user/tournamentCard";
import TournamentFilter from "@/components/user/tournamentFilter";
import { useAppSelector } from "@/redux/hook";
import React, { useState } from "react";

function Page() {
  const { tournaments, loading } = useAppSelector((state) => state.tournament);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <TournamentFilter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#415C41]"></div>
            <p className="mt-4 text-gray-600">Loading tournaments...</p>
          </div>
        </div>
      )}

      {/* Tournaments Grid */}
      {!loading && tournaments && tournaments.length > 0 && (
        <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {tournaments?.map((tournament) => (
            <TournamentCard key={tournament._id} data={tournament} />
          ))}
        </main>
      )}

      {/* No Tournaments Found */}
      {!loading && (!tournaments || tournaments.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tournaments found
            </h3>
            <p className="text-gray-500 mb-4">
              There are currently no tournaments available. Try adjusting your
              filters or check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
