"use client";

import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import VenueCard from "@/components/user/venue/venueCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllVenues } from "@/redux/actions/user/venueAction";
import { FaChevronDown, FaFilter, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const { venues, loading, totalVenues } = useAppSelector((state) => state.userVeune);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const router = useRouter();

  // Calculate total pages
  const totalPages = Math.ceil((totalVenues || 0) / itemsPerPage);

  useEffect(() => {
    dispatch(
      fetchAllVenues({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        type: selectedSport,
      })
    );
  }, [dispatch, searchTerm, selectedSport, currentPage, itemsPerPage]);

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
      setCurrentPage(1); // Reset to first page when searching
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

  // Handle sport filter change
  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    setCurrentPage(1); // Reset to first page when filtering
    setIsDropdownOpen(false);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
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
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="max-w-8xl mx-auto pt-16">
      {/* Filter Section */}
      <div className="bg-white shadow-sm mb-8">
        <div className="flex flex-col justify-between gap-5 p-6">
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
                value={searchInput}
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
                    <button
                      onClick={() => handleSportChange("")}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-t-lg ${
                        selectedSport === ""
                          ? "text-white bg-opacity-90"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: selectedSport === "" ? "#415C41" : "transparent",
                      }}
                    >
                      All Sports
                    </button>
                    {sportTypes.map((sport, index) => (
                      <button
                        key={index}
                        onClick={() => handleSportChange(sport)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
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
          
          {/* Active Filters */}
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

        {/* Results Summary */}
        {!loading && totalVenues > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalVenues)} of {totalVenues} venues
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
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChevronLeft className="text-xs" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
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
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#415C41]"></div>
            <p className="mt-4 text-gray-600">Loading venues...</p>
          </div>
        </div>
      ) : venues.length === 0 ? (
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No venues found
            </h3>
            <p className="text-gray-500 mb-4">
              No venues found matching your criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {venues.map((turf) => (
            <div
              key={turf._id}
              onClick={() => router.push(`facilities/${turf._id}/viewdetails/`)}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
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