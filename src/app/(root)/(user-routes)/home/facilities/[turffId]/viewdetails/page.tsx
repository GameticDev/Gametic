"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { IoFootball } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa"; 
import { IoIosResize } from "react-icons/io";
import { IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
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

function Page() {
  const params = useParams();
  const id = params?.turffId as string;

  const [turf, setTurf] = useState<Turf | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTurf = async () => {
      try {

        const res = await axios.get(`http://localhost:5000/api/getTurf/${id}`);

        setTurf(res.data.Turf);
        setMainImage(res.data.Turf.images[0]);
      } catch (error) {
        console.error("Failed to fetch turf data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;
  if (!turf) return <div className="p-10 text-center text-red-600">Turf not found</div>;

  return (
    <div className="bg-[#F5FBFF] min-h-screen py-10 px-4 mt">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-10"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00423d] drop-shadow-sm">
            {turf.name}
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Discover the best turf for your game
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Main Image + Gallery */}
          <div className="w-full md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={mainImage || turf.images[0]}
                alt="Turf Main"
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
            </motion.div>

            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {turf.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setMainImage(img)}
                  className={`h-20 w-28 object-cover rounded-xl cursor-pointer border-4 transition-all duration-300 ${
                    mainImage === img ? "border-[#00423d]" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Turf Info */}
          <div className="w-full md:w-1/2 space-y-6 text-[#2B2B2B] text-lg">
            <p className="flex items-center gap-2">
              <span role="img" aria-label="location-pin" className="text-green-700 text-xl"><FaLocationDot /></span>
              <span>{turf.city}, {turf.area}</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="soccer-ball" className="text-green-700 text-xl"><IoFootball />
</span>
              <span>{turf.turfType}</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="ruler" className="text-green-700 text-xl"><IoIosResize /></span>
              <span>{turf.size}</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="rupee" className="text-green-700 text-xl"><FaRupeeSign /></span>
              <span className="font-bold text-xl">₹{turf.hourlyRate}</span> per hour
            </p>

            <div className="pt-4 space-y-3">
              <h2 className="text-2xl font-bold text-[#00423d] underline">Availability</h2>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="clock" className="text-green-700 text-xl"><IoTimeSharp /></span>
                {turf.availability.startTime} - {turf.availability.endTime}
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="calendar" className="text-green-700 text-xl"><CiCalendarDate /></span>
                {turf.availability.days.join(", ")}
              </p>

              {turf.availability.timeSlots && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {turf.availability.timeSlots.map((slot, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-[#E5F3FD] text-[#00423d] text-sm font-medium text-center shadow-sm"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 w-full py-3 bg-[#00423d] text-white text-lg rounded-xl font-semibold shadow-xl hover:bg-[#00665c] transition-all"
            >
               Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Page;
