import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaTicketAlt, FaTrophy } from 'react-icons/fa';

export default function TournamentCard() {
  return (
    <div className="w-[277px] rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
      <img
        src="/stadium.jpg"
        alt="Stadium"
        className="w-full h-32 object-cover"
      />
      <div className="flex justify-center -mt-6">
        <div className="bg-white rounded-full p-2 border-2 border-gray-200">
          <img src="/football-icon.png" alt="Football" className="w-8 h-8" />
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 text-center">
        <span className="text-sm text-white bg-green-200 text-green-800 rounded-full px-2 py-0.5 font-medium">
          Upcoming
        </span>
        <h2 className="text-xl font-semibold mt-1">BPL</h2>
        <p className="text-sm text-gray-500">Bengaluru premier league</p>

        <div className="mt-3 flex items-center justify-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-1 text-black" />
          <span>South United Football Club, RBAN... ~0.10 km</span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaUsers />
          <span>5/8</span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt />
          <span>May 8 - May 20</span>
        </div>

        <div className="mt-3 flex justify-between text-sm font-medium">
          <div className="flex items-center gap-1">
            <FaTicketAlt />
            <span>1000</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTrophy />
            <span>10000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
