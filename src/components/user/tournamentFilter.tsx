"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaPlus, FaSearch, FaChevronDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllMatches } from "@/redux/actions/user/hostActions";
import debounce from "lodash.debounce";
import TournamentModal from "./tournament/tournamentModal";

const TournamentFilter = () => {
  const [selectedSport, setSelectedSport] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(
      fetchAllMatches({
        page: 1,
        limit: 12,
        search: searchTerm,
        sport: selectedSport,
        location: user?.preferredLocation || "",
      })
    );
  }, [dispatch, searchTerm, selectedSport, user]);

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(search);
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, search]);

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
  return (
    <div className="bg-white shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between flex-1">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search activities or locations"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Sport Filter Dropdown */}
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
          </div>{" "}
        </div>

        <button
          className="ml-4 flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white shadow-sm bg-[#415C41]/90"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="text-sm" />
          <span>Create a Tournament</span>
        </button>
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
      <TournamentModal isOpen={isOpen} onClose={handleOpen} />
    </div>
  );
};

export default TournamentFilter;
