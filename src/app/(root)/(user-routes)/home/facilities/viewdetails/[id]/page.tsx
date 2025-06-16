// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoFootball } from "react-icons/io5";
// import { FaRupeeSign } from "react-icons/fa";
// import { IoIosResize } from "react-icons/io";
// import { IoTimeSharp } from "react-icons/io5";
// import { CiCalendarDate } from "react-icons/ci";
// import Image from "next/image";
// import { TurfData, Booking } from "@/types/turf";


// type Turf = {
//   _id: string;
//   name: string;
//   city: string;
//   area: string;
//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: string[];
//   availability: {
//     days: string[];
//     startTime: string;
//     endTime: string;
//     timeSlots: string[] | false;
//   };
// };

// function Page() {
//   const params = useParams();
//   // const id = params?.turffId as string;
//   const id = params?.id as string;
//   const [turf, setTurf] = useState<Turf | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchTurf = async () => {
//       try {

//         const res = await axios.get(`http://localhost:5000/api/getTurf/${id}`);

//         setTurf(res.data.Turf);
//         setMainImage(res.data.Turf.images[0]);
//       } catch (error) {
//         console.error("Failed to fetch turf data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTurf();
//   }, [id]);

//   if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;
//   if (!turf) return <div className="p-10 text-center text-red-600">Turf not found</div>;

//   return (
//     <div className="bg-[#F5FBFF] min-h-screen py-10 px-4 mt">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-10"
//       >
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#00423d] drop-shadow-sm">
//             {turf.name}
//           </h1>
//           <p className="text-lg text-gray-600 font-medium">
//             Play like a pro. Book your turf today.
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col md:flex-row gap-10 items-start">
//           {/* Left: Main Image + Gallery */}
//           <div className="w-full md:w-1/2">
//             <motion.div
//               whileHover={{ scale: 1.01 }}
//               className="rounded-2xl overflow-hidden shadow-lg"
//             >
//               <Image
//                 src={mainImage || turf.images[0]}
//                 alt="Turf Main"
//                 width={800}
//                 height={400}
//                 className="w-full h-[300px] sm:h-[400px] object-cover"
//               />
//             </motion.div>

//             <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
//               {turf.images.map((img, idx) => (
//                 <Image
//                   key={idx}
//                   src={img}
//                   alt={`thumb-${idx}`}
//                   width={112}
//                   height={80}
//                   onClick={() => setMainImage(img)}
//                   className={`h-20 w-28 object-cover rounded-xl cursor-pointer border-4 transition-all duration-300 ${mainImage === img ? "border-[#00423d]" : "border-transparent"
//                     }`}
//                 />

//               ))}
//             </div>
//           </div>

//           {/* Right: Turf Info */}
//           <div className="w-full md:w-1/2 space-y-6 text-[#2B2B2B] text-lg">
//             <p className="flex items-center gap-2">
//               <span role="img" aria-label="location-pin" className="text-green-700 text-xl"><FaLocationDot /></span>
//               <span>{turf.city}, {turf.area}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               <span role="img" aria-label="soccer-ball" className="text-green-700 text-xl"><IoFootball />
//               </span>
//               <span>{turf.turfType}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               <span role="img" aria-label="ruler" className="text-green-700 text-xl"><IoIosResize /></span>
//               <span>{turf.size}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               <span role="img" aria-label="rupee" className="text-green-700 text-xl"><FaRupeeSign /></span>
//               <span className="font-bold text-xl">₹{turf.hourlyRate}</span> per hour
//             </p>

//             <div className="pt-4 space-y-3">
//               <h2 className="text-2xl font-bold text-[#00423d] underline">Availability</h2>
//               <p className="flex items-center gap-2">
//                 <span role="img" aria-label="clock" className="text-green-700 text-xl"><IoTimeSharp /></span>
//                 {turf.availability.startTime} - {turf.availability.endTime}
//               </p>
//               <p className="flex items-center gap-2">
//                 <span role="img" aria-label="calendar" className="text-green-700 text-xl"><CiCalendarDate /></span>
//                 {turf.availability.days.join(", ")}
//               </p>

//               {turf.availability.timeSlots && (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
//                   {turf.availability.timeSlots.map((slot, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-2 rounded-lg bg-[#E5F3FD] text-[#00423d] text-sm font-medium text-center shadow-sm"
//                     >
//                       {slot}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="mt-6 w-full py-3 bg-[#00423d] text-white text-lg rounded-xl font-semibold shadow-xl hover:bg-[#00665c] transition-all"
//             >
//               Book Now
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Page;


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
import Image from "next/image";
import { TurfData, Booking } from "@/types/turf";  // Adjust path as needed

function TurfDetailsPage() {
  const params = useParams();
  const turfId = params?.id as string;
  const [turf, setTurf] = useState<TurfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!turfId) return;

    async function fetchTurf() {
      try {
        const res = await axios.get(`http://localhost:5000/api/getTurf/${turfId}`);
        const turfData: TurfData = res.data.Turf;

        setTurf(turfData);
        setMainImage(turfData.images[0]);

        if (turfData.bookings && turfData.bookings.length > 0) {
          const slots = turfData.bookings.map(
            (b: Booking) => `${b.startTime} - ${b.endTime}`
          );
          setBookedSlots(slots);
        } else {
          setBookedSlots([]);
        }
      } catch (error) {
        console.error("Error fetching turf:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTurf();
  }, [turfId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!turf) return <div className="p-10 text-center text-red-600">Turf not found</div>;

  return (
    <div className="bg-[#F5FBFF] min-h-screen py-10 px-4">
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
            Play like a pro. Book your turf today.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left - Images */}
          <div className="w-full md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={mainImage || turf.images[0]}
                alt="Turf Main"
                width={800}
                height={400}
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
            </motion.div>
            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {turf.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  width={112}
                  height={80}
                  onClick={() => setMainImage(img)}
                  className={`h-20 w-28 object-cover rounded-xl cursor-pointer border-4 transition-all duration-300 ${
                    mainImage === img ? "border-[#00423d]" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div className="w-full md:w-1/2 space-y-6 text-[#2B2B2B] text-lg">
            <p className="flex items-center gap-2">
              <FaLocationDot className="text-green-700 text-xl" />
              <span>{turf.city}, {turf.area}</span>
            </p>
            <p className="flex items-center gap-2">
              <IoFootball className="text-green-700 text-xl" />
              <span>{turf.turfType}</span>
            </p>
            <p className="flex items-center gap-2">
              <IoIosResize className="text-green-700 text-xl" />
              <span>{turf.size}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaRupeeSign className="text-green-700 text-xl" />
              <span className="font-bold text-xl">₹{turf.hourlyRate}</span> per hour
            </p>

            {/* Availability Section */}
            <div className="pt-4 space-y-3">
              <h2 className="text-2xl font-bold text-[#00423d] underline">Availability</h2>
              <p className="flex items-center gap-2">
                <IoTimeSharp className="text-green-700 text-xl" />
                {turf.availability.startTime} - {turf.availability.endTime}
              </p>
              <p className="flex items-center gap-2">
                <CiCalendarDate className="text-green-700 text-xl" />
                {turf.availability.days.join(", ")}
              </p>
              {turf.availability.timeSlots && turf.availability.timeSlots.length > 0 && (
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

            {/* Booked Slots Section */}
            {bookedSlots.length > 0 && (
              <div className="pt-6 space-y-3">
                <h2 className="text-2xl font-bold text-red-600 underline">Booked Slots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {bookedSlots.map((slot, idx) => (
                    <span
                      key={`booked-${idx}`}
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium text-center shadow-sm"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unavailable Slots Section */}
            {turf.availability.unavailableSlots && turf.availability.unavailableSlots.length > 0 && (
              <div className="pt-6 space-y-3">
                <h2 className="text-2xl font-bold text-red-700 underline">Unavailable Slots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {turf.availability.unavailableSlots.map((slot, idx) => (
                    <span
                      key={`unavail-${idx}`}
                      className="px-3 py-2 rounded-lg bg-red-200 text-red-800 text-sm font-medium text-center shadow-sm"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}

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

export default TurfDetailsPage;

