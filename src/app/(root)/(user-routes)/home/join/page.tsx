"use client"
import JoinFilter from "@/components/user/joinFilter";
import ActivityCard from "@/components/user/userCard";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";

export default function Home() {
  const { matches, loading } = useAppSelector((state) => state.host);

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      <JoinFilter />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#415C41]"></div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        </div>
      )}

      {/* Matches Grid */}
      {!loading && matches && matches.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {matches.map((card, index) => (
            <Link key={card._id || index} href={`/home/join/match/${card._id}`}>
              <ActivityCard {...card} />
            </Link>
          ))}
        </div>
      )}

      {/* No Matches Found */}
      {!loading && (!matches || matches.length === 0) && (
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No matches found
            </h3>
            <p className="text-gray-500 mb-4">
              There are currently no matches available. Try adjusting your filters or check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}