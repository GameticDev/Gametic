import { Tournament } from "@/app/(root)/(user-routes)/tournament/page";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";
import AddTeamModal from "./AddTeamForm";

interface Props {
  data: Tournament;
}

export default function TournamentCard({ data }: Props) {
    const[showModal,setShowModal]=useState(false)
     const openModal=()=>{
    setShowModal(true)
  }
  const closeModal=()=>{
    setShowModal(false)
  }

 
  return (
    <div className="w-[277px] rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
      <img
        src={data.image}
        alt="Stadium"
        className="w-full h-32 object-cover"
      />
      <div className="flex justify-center -mt-6">
        <div className="bg-green-800 rounded-full p-4 border-2 border-gray-200">
          <button type="button" onClick={openModal} className="text-white font-semibold">Join</button>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 text-center">
        <span className="text-sm text-white  bg-green-400 rounded-full px-2 py-0.5 font-medium">
          {data.status}
        </span>
        <h2 className="text-xl font-semibold mt-1">{data.title}</h2>
        <p className="text-sm text-gray-500">{data.subtitle}</p>

        <div className="mt-3 flex items-center justify-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-1 text-black" />
          <span>
            {data.location} {data.distance}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaUsers />
          <span>{data?.joinedTeams.length}</span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt />
          <span>
            {moment(data.dateFrom).format("MMM D, YYYY")} -{" "}
            {moment(data.dateTo).format("MMM D, YYYY")}
          </span>
        </div>

        <div className="mt-3 flex justify-between text-sm font-medium">
          <div className="flex items-center gap-1">
            <FaTicketAlt />
            <span>{data.entryFee}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTrophy />
            <span>{data.prizePool}</span>
          </div>
        </div>
      </div>
      {showModal && <AddTeamModal onClose={closeModal}/>}
    </div>
  );
}
