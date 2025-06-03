"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";

type Turf = {
  _id: string;
  name: string;
  city: string;
  area: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: string[];
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
    timeSlots: string[] | false;
  };
};

const categories = ["football", "cricket", "tennis", "basketball"];
const PAGE_SIZE = 6;

const TurfList = () => {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  // Fetch turfs from API
  const fetchTurfs = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: PAGE_SIZE };
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await axios.get("http://localhost:5000/api/getAllturf", { params });
      setTurfs(res.data.turf || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching turf data:", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, searchTerm]);

  // Debounced searchTerm setter
  const debouncedSearch = useRef(
    debounce((val: string) => {
      setSearchTerm(val);
      setPage(1);
    }, 500)
  ).current;

  // Update searchTerm when input changes (debounced)
  useEffect(() => {
    debouncedSearch(searchInput);
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch]);


  useEffect(() => {
    fetchTurfs();
  }, [fetchTurfs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-5">
        <select
          className="border border-[#00423d] text-[#00423d] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423d]/50"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Sports</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search turfs by name..."
          value={searchInput}
          onChange={handleSearchChange}
          className="border border-[#00423d] text-[#00423d] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423d]/50 flex-grow max-w-xs"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-xl text-[#00524a] font-semibold">Loading turfs...</div>
      ) : turfs.length === 0 ? (
        <p className="text-center text-[#7a7455] col-span-full italic">No turfs found matching your criteria.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {turfs.map((turf) => (
              <div
                key={turf._id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#98916d]/30"
              >
                <img src={turf.images[0]} alt={turf.name} className="w-full h-60 object-cover" />
                <div className="p-5 space-y-2">
                  <h2 className="text-2xl font-bold text-[#00423d]">{turf.name}</h2>
                  <p className="text-sm text-[#7a7455]">
                    {turf.city}, {turf.area}
                  </p>
                  <p className="text-[#00524a] font-semibold text-sm">
                    ₹{turf.hourlyRate}/hr • {turf.turfType}
                  </p>
                  <p className="text-xs text-[#7a7455]">
                    Open: {turf.availability.startTime} - {turf.availability.endTime}
                  </p>
                  <p className="text-xs text-[#7a7455]">
                    Days: {turf.availability.days.join(", ")}
                  </p>
                  <button
                    className="mt-3 w-full bg-gradient-to-r from-[#00423d] to-[#00524a] text-white py-2 rounded-full hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    onClick={() => router.push(`facilities/${turf._id}/viewdetails/`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white py-5 flex justify-center space-x-6 border-t border-[#98916d]/40 shadow-md z-10 mt-8">
            <button
              className="px-5 py-2 bg-gradient-to-r from-[#00423d] to-[#00524a] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg transition-transform duration-300"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-[#7a7455] font-semibold self-center">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-5 py-2 bg-gradient-to-r from-[#00423d] to-[#00524a] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg transition-transform duration-300"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TurfList;