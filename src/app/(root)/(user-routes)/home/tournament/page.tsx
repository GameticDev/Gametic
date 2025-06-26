"use client";
import TournamentCard from "@/components/user/tournamentCard";
import TournamentFilter from "@/components/user/tournamentFilter";
import { fetchAllTournaments } from "@/redux/actions/user/tournamentActions";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";

function Page() {
  const dispatch = useAppDispatch();
  const { tournaments } = useAppSelector((state) => state.tournament);

  useEffect(() => {
    dispatch(
      fetchAllTournaments({
        page: 1,
        limit: 12,
        search: "",
        location: "",
        sport: "",
      })
    );
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div
  //           className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
  //           style={{ borderColor: "#00423D" }}
  //         ></div>
  //         <p className="text-xl" style={{ color: "#415C41" }}>
  //           Loading...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (tournaments?.length <= 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-xl" style={{ color: "#415C41" }}>
  //           {"Tournament not found"}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
      {" "}
      <TournamentFilter />
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {tournaments?.map((tournament) => (
          <TournamentCard key={tournament._id} data={tournament} />
        ))}
      </main>
    </div>
  );
}

export default Page;
