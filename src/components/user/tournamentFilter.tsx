"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaPlus, FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import debounce from "lodash.debounce";
import TournamentModal from "./tournament/tournamentModal";
import { fetchAllTournaments } from "@/redux/actions/user/tournamentActions";

interface TournamentFilterProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TournamentFilter: React.FC<TournamentFilterProps> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {  totalTournaments, loading } = useAppSelector((state) => state.tournament);

  const handleOpen = () => {
    setIsOpen(false);
  };

  const totalPages = Math.ceil((totalTournaments || 0) / itemsPerPage);

  useEffect(() => {
    dispatch(
      fetchAllTournaments({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        sport: selectedSport,
        location: "",
      })
    );
  }, [dispatch, searchTerm, selectedSport, user, currentPage, itemsPerPage]);

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
      onPageChange(1); 
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(search);
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, search]);

  // Handle sport filter change
  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    onPageChange(1); // Reset to first page when filtering
    setIsDropdownOpen(false);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
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

  return (
    <div className="bg-white shadow-sm mb-8">
      {/* Filter Section */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between flex-1">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Search tournaments or locations"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            {/* Sport Filter Dropdown */}
            <div className="flex space-x-5 z-20">
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
                    <button
                      onClick={() => handleSportChange("")}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-t-lg ${
                        selectedSport === "" ? "text-white bg-opacity-90" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: selectedSport === "" ? "#415C41" : "transparent",
                      }}
                    >
                      All Sports
                    </button>
                    {sportTypes.map((sport, index) => (
                      <button
                        key={sport}
                        onClick={() => handleSportChange(sport)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          index === sportTypes.length - 1 ? "rounded-b-lg" : ""
                        } ${
                          selectedSport === sport
                            ? "text-white bg-opacity-90"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                          backgroundColor: selectedSport === sport ? "#415C41" : "transparent",
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

          <button
            className="ml-4 flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white shadow-sm bg-[#415C41]/90 hover:bg-[#415C41] transition-colors duration-200"
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
                onClick={() => handleSportChange("")}
                className="hover:bg-white hover:bg-opacity-20 rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-200 text-xs"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Results Summary and Pagination Info */}
      {!loading && totalTournaments > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalTournaments)} of {totalTournaments} tournaments
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChevronLeft className="text-xs" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={`page-${index}`}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentPage === page
                          ? "text-white bg-[#415C41]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      <TournamentModal isOpen={isOpen} onClose={handleOpen} />
    </div>
  );
};

export default TournamentFilter;