"use client";

import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import VenueCard from "@/components/user/venue/venueCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllVenues } from "@/redux/actions/user/venueAction";
import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";

export type Turf = {
  _id: string;
  name: string;
  city: string;
  area: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: string[];
  bookedSlot: {
    date: string;
    slots: { start: string; end: string }[];
  }[];
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
    timeSlots: string[] | false;
  };
};

const sportTypes = [
  "football",
  "cricket",
  "multi-sport",
  "swimming",
  "basketball",
  "badminton",
  "tennis",
  "volleyball",
  "hockey",
];
const TurfList = () => {
  const dispatch = useAppDispatch();
  const [selectedSport, setSelectedSport] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { venues, loading } = useAppSelector((state) => state.userVeune);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(
      fetchAllVenues({
        page: 1,
        limit: 12,
        search: searchTerm,
        type: selectedSport,
      })
    );
  }, [dispatch, searchTerm, selectedSport]);

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="max-w-8xl mx-auto pt-16">
      <div className="flex flex-col justify-between mb-8 gap-5 p-6 bg-white">
        <div className="flex justify-between w-full">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search activities or locations"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex space-x-5">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 min-w-[140px] justify-between text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <FaFilter className="text-xs" />
                  <span className="text-sm">
                    {selectedSport === "" ? "All Sports" : selectedSport}
                  </span>
                </div>
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                  {sportTypes.map((sport, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSport(sport);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        index === 0 ? "rounded-t-lg" : ""
                      } ${
                        index === sportTypes.length - 1 ? "rounded-b-lg" : ""
                      } ${
                        selectedSport === sport
                          ? "text-white bg-opacity-90"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor:
                          selectedSport === sport ? "#415C41" : "transparent",
                      }}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedSport !== "" && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: "#98916D" }}
            >
              {selectedSport}
              <button
                onClick={() => setSelectedSport("")}
                className="hover:bg-white hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-200 text-xs"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10 text-xl text-[#00524a] font-semibold">
          Loading turfs...
        </div>
      ) : venues.length === 0 ? (
        <p className="text-center text-[#7a7455] col-span-full italic">
          No turfs found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {venues.map((turf) => (
            <div
              key={turf._id}
              onClick={() => router.push(`facilities/${turf._id}/viewdetails/`)}
            >
              <VenueCard turf={turf} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfList;
