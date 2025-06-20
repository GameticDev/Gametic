"use client";

import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import OwnerStaggeredDropDown from "./ui/OwnerStaggeredDropDown";
import { useRouter } from "next/navigation";

export default function OwnerNavbar() {
  const notificationCount = 3;
  const user = useAppSelector((state) => state.auth.user);
  const turfs = useAppSelector((state) => state.turf.turfs);
  const router = useRouter();

  const ownerName = user?.username || "Owner";
  const ownerInitials = ownerName.split(" ").map((n) => n[0]).join("").toUpperCase();

  const [query, setQuery] = useState("");
  const [filteredTurfs, setFilteredTurfs] = useState<{ id: string; name: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredTurfs([]);
      setShowDropdown(false);
    } else {
      const matchedTurfs = turfs
        .filter(
          (turf) =>
            typeof turf.name === "string" &&
            turf.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((turf) => ({ id: turf._id, name: turf.name }));

      setFilteredTurfs(matchedTurfs);
      setShowDropdown(matchedTurfs.length > 0);
    }
  }, [query, turfs]);

  const handleTurfSelect = (turfId: string) => {
    setQuery("");
    setShowDropdown(false);
    router.push(`/owner/turf-details/${turfId}`);
  };

  return (
    <div className="w-full bg-white border-b border-[#EAECF0] py-4 px-6 shadow-sm relative">
      <div className="flex items-center justify-end gap-6 relative">

        <div className="relative w-64">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Turf..."
              className="border border-gray-300 rounded-lg px-3 py-1 pl-9 w-full text-sm focus:outline-none focus:ring-1 focus:ring-[#00423D]"
              onFocus={() => query.trim() && filteredTurfs.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#667085] w-4 h-4" />
          </div>


          {showDropdown && filteredTurfs.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-200 w-full mt-1 rounded-md shadow-md max-h-60 overflow-auto">
              {filteredTurfs.map((turf) => (
                <li
                  key={turf.id}
                  className="px-3 py-2 hover:bg-[#F5F5F5] cursor-pointer text-sm"
                  onClick={() => handleTurfSelect(turf.id)}
                >
                  {turf.name}
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="relative">
          <button
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-[#667085]" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF3B30] text-white text-xs flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
        </div>


        <div className="flex items-center gap-2 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">{ownerName}</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
          <OwnerStaggeredDropDown userInitials={ownerInitials} userName={ownerName} />
        </div>
      </div>
    </div>
  );
}
