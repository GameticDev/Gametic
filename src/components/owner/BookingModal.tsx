
// 'use client';

// import React, { useState } from 'react';
// import { FiX, FiCalendar, FiClock, FiUser, FiDollarSign } from 'react-icons/fi';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';

// interface BookingModalProps {
//   turfId: string;
//   onClose: () => void;
//   onSuccess: () => void;
// }
// const BookingModal: React.FC<BookingModalProps> = ({ turfId, onClose, onSuccess }) => {
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const turf = useSelector((state: RootState) => 
//     state.turf.turfs?.find(t => t._id === turfId)
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!date || !startTime || !endTime) {
//       setError('Please fill all fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       // Here you would call your API to create a booking
//       // await createBooking(turfId, { date, startTime, endTime });
//       onSuccess();
//       onClose();
//     } catch (err) {
//       setError('Failed to create booking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold">Book Turf</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX size={24} />
//           </button>
//         </div>

//         {turf && (
//           <div className="mb-6">
//             <h4 className="font-semibold text-lg">{turf.name}</h4>
//             <p className="text-gray-600">{turf.address}, {turf.city}</p>
//             <div className="flex items-center mt-2">
//               <FiDollarSign className="mr-1" />
//               <span>₹{turf.hourlyRate} per hour</span>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiCalendar className="text-gray-400" />
//               </div>
//               <input
//                 type="date"
//                 className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiClock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="time"
//                   className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiClock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="time"
//                   className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Booking...' : 'Confirm Booking'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;