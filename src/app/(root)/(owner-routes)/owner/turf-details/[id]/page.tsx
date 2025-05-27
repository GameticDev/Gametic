
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { fetchTurfById } from '@/redux/actions/turfActions';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { Rating } from '@smastrom/react-rating';
// import '@smastrom/react-rating/style.css';
// import { TurfData } from '@/types/turf';
// import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRupeeSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { IoIosFootball } from 'react-icons/io';
// import { MdOutlineSportsSoccer } from 'react-icons/md';

// // Custom star SVG for the rating component
// const Star = (
//   <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7227 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.1635C12.2034 16.9599 11.7966 16.9599 11.4745 17.1635L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.27731 13.7483 7.1518 13.3614 6.86309 13.1166L3.39788 10.1778C2.71595 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" />
// );

// const customStyles = {
//   itemShapes: Star,
//   activeFillColor: '#f59e0b',
//   inactiveFillColor: '#d1d5db',
// };

// const TurfDetailsPage: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const turfId = pathname.split('/').pop();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const dispatch = useAppDispatch();
//   const { selectedTurf, loading, error } = useAppSelector((state) => state.turfDetails);
//   const user = useAppSelector(state => state.auth.userInfo);

//   const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
//     initial: 0,
//     slideChanged(s) {
//       setCurrentSlide(s.track.details.rel);
//     },
//     loop: true,
//     mode: 'free-snap',
//     slides: { perView: 1 },
//   });

//   useEffect(() => {
//     if (turfId && typeof turfId === 'string') {
//       dispatch(fetchTurfById(turfId));
//     }
//   }, [turfId, dispatch]);

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="text-center mt-10">
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline"> {error}</span>
//       </div>
//       <button 
//         onClick={() => router.back()} 
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Go Back
//       </button>
//     </div>
//   );
  
//   if (!selectedTurf) return (
//     <div className="text-center mt-10">
//       <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto">
//         <strong className="font-bold">Not Found!</strong>
//         <span className="block sm:inline"> Turf not found.</span>
//       </div>
//       <button 
//         onClick={() => router.back()} 
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Go Back
//       </button>
//     </div>
//   );

//   const {
//     name,
//     city,
//     area,
//     location,
//     turfType,
//     size,
//     images,
//     hourlyRate,
//     status,
//     availability,
//     averageRating,
//     bookings,
//     description,
//   } = selectedTurf as TurfData;

//   const isBooked = bookings && bookings.length > 0;
//   const availableDays = typeof availability === 'string' ? [] : availability.days;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Breadcrumb */}
//       <nav className="flex mb-6" aria-label="Breadcrumb">
//         <ol className="inline-flex items-center space-x-1 md:space-x-3">
//           <li className="inline-flex items-center">
//             <button 
//               onClick={() => router.push('/')}
//               className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
//             >
//               Home
//             </button>
//           </li>
//           <li>
//             <div className="flex items-center">
//               <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//               </svg>
//               <button 
//                 onClick={() => router.push('/turfs')}
//                 className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
//               >
//                 Turfs
//               </button>
//             </div>
//           </li>
//           <li aria-current="page">
//             <div className="flex items-center">
//               <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//               </svg>
//               <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{name}</span>
//             </div>
//           </li>
//         </ol>
//       </nav>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Column - Images */}
//         <div className="lg:w-1/2">
//           <div className="relative group">
//             <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-lg">
//               {images.length > 0 ? (
//                 images.map((img, idx) => (
//                   <div key={idx} className="keen-slider__slide">
//                     <img
//                       src={img}
//                       alt={`Turf Image ${idx + 1}`}
//                       className="w-full h-96 sm:h-[500px] object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <div className="keen-slider__slide bg-gray-200 flex items-center justify-center h-96 sm:h-[500px]">
//                   <span className="text-gray-500 text-lg">No images available</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Navigation Arrows */}
//             {images.length > 1 && (
//               <>
//                 <button 
//                   onClick={() => slider.current?.prev()} 
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
//                 >
//                   <FaChevronLeft />
//                 </button>
//                 <button 
//                   onClick={() => slider.current?.next()} 
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
//                 >
//                   <FaChevronRight />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Thumbnail Navigation */}
//           {images.length > 1 && (
//             <div className="mt-4 flex gap-2 overflow-x-auto py-2">
//               {images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => slider.current?.moveToIdx(idx)}
//                   className={`w-16 h-16 rounded-md overflow-hidden border-2 ${currentSlide === idx ? 'border-blue-500' : 'border-transparent'}`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${idx + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right Column - Details */}
//         <div className="lg:w-1/2">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          
//           <div className="flex items-center gap-4 mb-4">
//             <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
//               <Rating
//                 style={{ maxWidth: 100 }}
//                 value={averageRating ?? 0}
//                 readOnly
//                 itemStyles={customStyles}
//               />
//               <span className="ml-2 font-medium text-gray-700">
//                 {averageRating?.toFixed(1) ?? '0.0'}
//               </span>
//             </div>
//             <span className="text-gray-500">|</span>
//             <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//               status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}>
//               {status ?? 'Unknown'}
//             </span>
//           </div>

//           {/* Price Section */}
//           <div className="bg-gray-50 p-4 rounded-lg mb-6">
//             <div className="flex items-baseline gap-2">
//               <span className="text-3xl font-bold text-gray-900 flex items-center">
//                 <FaRupeeSign className="mr-1" size={20} />
//                 {hourlyRate}
//               </span>
//               <span className="text-gray-500">/ hour</span>
//             </div>
//             <p className="text-green-600 text-sm mt-1">Inclusive of all taxes</p>
//           </div>

//           {/* Highlights */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2 text-gray-900">Highlights</h3>
//             <ul className="space-y-2">
//               <li className="flex items-start">
//                 <IoIosFootball className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
//                 <span><strong>Turf Type:</strong> {turfType}</span>
//               </li>
//               <li className="flex items-start">
//                 <MdOutlineSportsSoccer className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
//                 <span><strong>Size:</strong> {size}</span>
//               </li>
//               <li className="flex items-start">
//                 <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
//                 <span><strong>Location:</strong> {area}, {city}</span>
//               </li>
//             </ul>
//           </div>

//           {/* Description */}
//           {description && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2 text-gray-900">Description</h3>
//               <p className="text-gray-700">{description}</p>
//             </div>
//           )}

//           {/* Availability */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2 text-gray-900">Availability</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {availableDays.length > 0 ? (
//                 availableDays.map((day) => (
//                   <div
//                     key={day}
//                     className="bg-green-100 text-green-800 px-3 py-2 rounded text-center font-medium"
//                   >
//                     {day}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No availability information</p>
//               )}
//             </div>
//             {typeof availability !== 'string' && (
//               <div className="mt-3 flex items-center text-gray-700">
//                 <FaClock className="mr-2 text-blue-500" />
//                 <span>Timing: {availability.startTime} to {availability.endTime}</span>
//               </div>
//             )}
//           </div>

//           {/* Booking status */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-semibold text-gray-900">Booking Status</h4>
//                 <p className={isBooked ? 'text-red-600' : 'text-green-600'}>
//                   {isBooked ? 'Currently Booked' : 'Available for Booking'}
//                 </p>
//               </div>
//               <button
//                 onClick={() => router.push(`/booking/${selectedTurf._id}`)}
//                 disabled={isBooked}
//                 className={`px-6 py-3 rounded-lg font-medium ${isBooked 
//                   ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
//                   : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transition'}`}
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Owner Actions */}
//           {user?.role === 'owner' && (
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <button
//                 onClick={() => router.push(`/owner/edit-turf/${selectedTurf._id}`)}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                 </svg>
//                 Edit Turf
//               </button>
//               <button
//                 onClick={() => router.push(`/owner/bookings/${selectedTurf._id}`)}
//                 className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                 </svg>
//                 View Bookings
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TurfDetailsPage;


'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTurfById } from '@/redux/actions/turfActions';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { TurfData } from '@/types/turf';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { MdOutlineSportsSoccer } from 'react-icons/md';

const Star = (
  <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7227 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.1635C12.2034 16.9599 11.7966 16.9599 11.4745 17.1635L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.27731 13.7483 7.1518 13.3614 6.86309 13.1166L3.39788 10.1778C2.71595 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" />
);

const customStyles = {
  itemShapes: Star,
  activeFillColor: '#f59e0b',
  inactiveFillColor: '#d1d5db',
};

const TurfDetailsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const turfId = pathname.split('/').pop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useAppDispatch();
  const { selectedTurf, loading, error } = useAppSelector((state) => state.turfDetails);
  const user = useAppSelector(state => state.auth.userInfo);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    loop: true,
    mode: 'free-snap',
    slides: { perView: 1 },
  });

  useEffect(() => {
    if (turfId && typeof turfId === 'string') {
      dispatch(fetchTurfById(turfId));
    }
  }, [turfId, dispatch]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-10">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
      <button 
        onClick={() => router.push('/owner/turfs')} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to My Turfs
      </button>
    </div>
  );
  
  if (!selectedTurf) return (
    <div className="text-center mt-10">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Not Found!</strong>
        <span className="block sm:inline"> Turf not found.</span>
      </div>
      <button 
        onClick={() => router.push('/owner/turfs')} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to My Turfs
      </button>
    </div>
  );

  const {
    name,
    city,
    area,
    location,
    turfType,
    size,
    images,
    hourlyRate,
    status,
    availability,
    averageRating,
    description,
    bookings,
  } = selectedTurf as TurfData;

  const availableDays = typeof availability === 'string' ? [] : availability.days;
  const upcomingBookings = bookings?.filter(booking => new Date(booking.date) >= new Date()) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button 
              onClick={() => router.push('/owner')}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {user?.username}
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <button 
                onClick={() => router.push('/owner/turfs')}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
              >
                My Turfs
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Images */}
        <div className="lg:w-1/2">
          <div className="relative group">
            <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-lg">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <div key={idx} className="keen-slider__slide">
                    <img
                      src={img}
                      alt={`Turf Image ${idx + 1}`}
                      className="w-full h-96 sm:h-[500px] object-cover"
                      loading="lazy"
                    />
                  </div>
                ))
              ) : (
                <div className="keen-slider__slide bg-gray-200 flex items-center justify-center h-96 sm:h-[500px]">
                  <span className="text-gray-500 text-lg">No images available</span>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => slider.current?.prev()} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={() => slider.current?.next()} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => slider.current?.moveToIdx(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${currentSlide === idx ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="lg:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {status ?? 'Unknown'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <Rating
                style={{ maxWidth: 100 }}
                value={averageRating ?? 0}
                readOnly
                itemStyles={customStyles}
              />
              <span className="ml-2 font-medium text-gray-700">
                {averageRating?.toFixed(1) ?? '0.0'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Pricing</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 flex items-center">
                <FaRupeeSign className="mr-1" size={18} />
                {hourlyRate}
              </span>
              <span className="text-gray-500">per hour</span>
            </div>
          </div>

          {/* Turf Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Turf Details</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <IoIosFootball className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span><strong>Type:</strong> {turfType}</span>
              </li>
              <li className="flex items-start">
                <MdOutlineSportsSoccer className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span><strong>Size:</strong> {size}</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span><strong>Location:</strong> {area}, {city}</span>
              </li>
            </ul>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Description</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          )}

          {/* Availability */}
{/* Availability Section */}
<div className="mb-8">
  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
  
  {/* Type-safe rendering */}
  {(() => {
    // Handle case where availability is missing
    if (!selectedTurf.availability) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">No availability information available</p>
        </div>
      )
    }

    // Handle string case
    if (typeof selectedTurf.availability === 'string') {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{selectedTurf.availability}</p>
        </div>
      )
    }

    // Now we've narrowed it down to the Availability object type
    const availability = selectedTurf.availability
    return (
      <>
        {/* Days of Week */}
        <div className="mb-5">
          <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Available Days
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  availability.days.includes(day)
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mb-5">
          <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
            <FaClock className="mr-2 text-blue-500" />
            Operating Hours
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <span className="font-medium">Daily:</span>
              <span className="text-blue-700 font-semibold">
                {availability.startTime} - {availability.endTime}
              </span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        {availability.timeSlots !== undefined && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
              <FaInfoCircle className="mr-2 text-yellow-500" />
              Booking Options
            </h3>
            <p className="text-sm text-gray-600">
              {Array.isArray(availability.timeSlots)
                ? `Available slots: ${availability.timeSlots.join(', ')}`
                : 'Flexible booking available'}
            </p>
          </div>
        )}
      </>
    )
  })()}
</div>

          {/* Upcoming Bookings */}
<div className="mb-6">
  <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Bookings</h3>
  {upcomingBookings.length > 0 ? (
    <div className="space-y-3">
      {/* {upcomingBookings.slice(0, 3).map((booking) => (
        <div key={booking._id}  */}
        {upcomingBookings.slice(0, 3).map((booking, index) => (
  <div 
    key={booking._id || `${booking.date}-${index}`}
        className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {new Date(booking.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {booking.status}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-blue-600 font-medium">
              {booking.startTime} - {booking.endTime}
            </span>
            <span className="text-gray-700">
              ₹{booking.amount}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <div>Booked by: {booking.userId?.name || 'Guest'}</div>
            <div>Payment: 
              <span className={`ml-1 ${
                booking.paymentStatus === 'paid' ? 'text-green-600' :
                booking.paymentStatus === 'pending' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {booking.paymentStatus}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Created: {new Date(booking.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
      {upcomingBookings.length > 3 && (
        <button 
          onClick={() => router.push(`/owner/bookings/${selectedTurf._id}`)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
        >
          View all {upcomingBookings.length} bookings →
        </button>
      )}
    </div>
  ) : (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <p className="text-gray-500">No upcoming bookings</p>
    </div>
  )}
</div>

          {/* Owner Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => router.push(`/owner/edit-turf/${selectedTurf._id}`)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Turf
            </button>
            <button
              onClick={() => router.push(`/owner/bookings/${selectedTurf._id}`)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              View All Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetailsPage;