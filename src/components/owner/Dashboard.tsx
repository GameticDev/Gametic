// 'use client';

// import React, { useState, useEffect } from 'react';
// import AddTurfForm from './AddTurfForm';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/redux/store';
// import { resetTurfState} from '@/redux/slices/turfSlice';
// import { fetchTurfs } from '@/redux/actions/turfActions';


// const Dashboard: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();

//     const { success, turfs, loading, error } = useSelector((state: RootState) => state.turf);

//   useEffect(() => {
//     // Fetch turfs initially
//     dispatch(fetchTurfs());
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       setShowForm(false); // Close the form after successful submission
//       dispatch(resetTurfState()); // Reset success state
//       dispatch(fetchTurfs());     // Refresh turf list after add
//     }
//   }, [success, dispatch]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//         onClick={() => setShowForm(!showForm)}
//       >
//         {showForm ? 'Close Add Turf Form' : 'Add New Turf'}
//       </button>

//       {showForm && (
//         <div className="mt-4">
//           <AddTurfForm />
//         </div>
//       )}

//       {/* Show loading or error */}
//       {loading && <p>Loading turfs...</p>}
//       {error && <p className="text-red-600">Error: {error}</p>}

//       {/* Display turfs as cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//        {Array.isArray(turfs) && turfs.length === 0 && (
//   <p className="text-gray-500">No turfs added yet.</p>
// )}

// {Array.isArray(turfs) &&
//   turfs.map((turf) => (
//     <div
//       key={turf._id}
//       className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
//     >
//       {/* Turf Image */}
//       {Array.isArray(turf.image) && turf.image.length > 0 ? (
//         <img
//           src={turf.image[0]} // Show first image
//           alt={turf.name}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
//           No Image
//         </div>
//       )}

//       {/* Turf Details */}
//       <div className="p-4">
//         <h3 className="text-xl font-semibold text-gray-800 mb-1">{turf.name}</h3>
//         <p className="text-sm text-gray-600 mb-2">
//           {turf.area}, {turf.city}
//         </p>
//         <p className="text-sm text-gray-700 mb-1"><strong>Type:</strong> {turf.turfType}</p>
//         <p className="text-sm text-gray-700 mb-1"><strong>Size:</strong> {turf.size || 'N/A'}</p>
//         <p className="text-sm text-gray-700 mb-1"><strong>Rate:</strong> ₹{turf.hourlyRate}/hour</p>
//         <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {turf.status}</p>

//         {/* Preview other images */}
//         {turf.image?.length > 1 && (
//           <div className="flex space-x-2 mt-3">
//             {turf.image.slice(1).map((imgUrl, idx) => (
//               <img
//                 key={idx}
//                 src={imgUrl}
//                 alt={`Turf image ${idx + 2}`}
//                 className="w-12 h-12 object-cover rounded border"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   ))}


//       </div>
//     </div>
//   );
// };

// export default Dashboard;






      
'use client';

import React, { useState, useEffect } from 'react';
import { FiPlus, FiX, FiHome, FiList, FiSettings, FiUser, FiEdit2, FiTrash2,FiStar,FiCalendar } from 'react-icons/fi';
import AddTurfForm from './AddTurfForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { resetTurfState } from '@/redux/slices/turfSlice';
import { deleteTurf, fetchTurfs } from '@/redux/actions/turfActions';
import Skeleton from './ui/Skeleton';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TurfCard from './ui/TurfCard';
import BookingModal from './BookingModal';
import RatingModal from './RatingModal';
import { Booking, TurfData } from '@/types/turf';


const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTurf, setEditingTurf] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { success, turfs, loading, error } = useSelector((state: RootState) => state.turf);

  useEffect(() => {
    console.log("Current turfs:", turfs);
  }, [turfs]);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchTurfs(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setEditingTurf(null);
      dispatch(resetTurfState());
      if (userInfo?._id) {
        dispatch(fetchTurfs(userInfo._id));
      }
    }
  }, [success, dispatch, userInfo?._id]);

  const handleDelete = (turfId: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this turf?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteTurf(turfId))
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Turfs</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTurf(null);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add New Turf
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <AddTurfForm 
              onClose={() => {
                setShowForm(false);
                setEditingTurf(null);
              }} 
              turfToEdit={editingTurf ? turfs.find(t => t._id === editingTurf) : null}
            />
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-5 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j}>
                        <Skeleton className="h-4 w-1/3 mb-1" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : turfs && turfs.length === 0 && !showForm ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="mx-auto h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiHome className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No turfs added yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first turf</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Turf
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {turfs?.map((turf) => (
              <TurfCard
                key={turf._id}
                turf={turf}
                onEdit={(id) => {
                  setEditingTurf(id);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;


// const Dashboard: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingTurf, setEditingTurf] = useState<string | null>(null);
//   const [selectedTurfForBooking, setSelectedTurfForBooking] = useState<string | null>(null);
//   const [selectedTurfForRating, setSelectedTurfForRating] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<'turfs' | 'bookings'>('turfs');
  
//   const dispatch = useDispatch<AppDispatch>();
//   const { userInfo } = useSelector((state: RootState) => state.user);
//   const { success, turfs, loading, error } = useSelector((state: RootState) => state.turf);

//   useEffect(() => {
//     if (userInfo?._id) {
//       dispatch(fetchTurfs(userInfo._id));
//     }
//   }, [dispatch, userInfo?._id]);

//   useEffect(() => {
//     if (success) {
//       setShowForm(false);
//       setEditingTurf(null);
//       dispatch(resetTurfState());
//       if (userInfo?._id) {
//         dispatch(fetchTurfs(userInfo._id));
//       }
//     }
//   }, [success, dispatch, userInfo?._id]);

//   const handleDelete = (turfId: string) => {
//     confirmAlert({
//       title: 'Confirm to delete',
//       message: 'Are you sure you want to delete this turf?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => dispatch(deleteTurf(turfId))
//         },
//         {
//           label: 'No',
//           onClick: () => {}
//         }
//       ]
//     });
//   };

//   // const handleBook = (turfId: string) => {
//   //   setSelectedTurfForBooking(turfId);
//   // };

//   const handleRate = (turfId: string) => {
//     setSelectedTurfForRating(turfId);
//   };

//  const allBookings = turfs?.flatMap((turf: TurfData) => 
//   turf.bookings?.map((booking: Booking) => ({
//     ...booking,
//     turfName: turf.name,
//     turfId: turf._id
//   })) || []
// ) || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//   <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-end items-center">
//    <button
//   onClick={() => {
//     setShowForm(true);
//     setEditingTurf(null);
//   }}
//   className="flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg hover:bg-[#365135] focus:outline-none focus:ring-2 focus:ring-[#415c41] focus:ring-offset-2 transition-colors"
//   style={{ backgroundColor: '#415c41' }}
// >
//   <FiPlus className="mr-2" />
//   Add New Turf
// </button>

//   </div>
// </header>


//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {showForm && (
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//             <AddTurfForm 
//               onClose={() => {
//                 setShowForm(false);
//                 setEditingTurf(null);
//               }} 
//               turfToEdit={editingTurf ? turfs.find(t => t._id === editingTurf) : null}
//             />
//           </div>
//         )}

//         {error && (
//           <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
//             Error: {error}
//           </div>
//         )}

//         {viewMode === 'turfs' ? (
//           <>
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, i) => (
//                   <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
//                     <Skeleton className="w-full h-48" />
//                     <div className="p-5 space-y-4">
//                       <Skeleton className="h-6 w-3/4" />
//                       <Skeleton className="h-4 w-1/2" />
//                       <div className="grid grid-cols-2 gap-4">
//                         {[...Array(4)].map((_, j) => (
//                           <div key={j}>
//                             <Skeleton className="h-4 w-1/3 mb-1" />
//                             <Skeleton className="h-4 w-2/3" />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : turfs && turfs.length === 0 && !showForm ? (
//               <div className="bg-white p-8 rounded-xl shadow-sm text-center">
//                 <div className="mx-auto h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//                   <FiStar className="text-5xl text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No turfs added yet</h3>
//                 <p className="text-gray-500 mb-6">Get started by adding your first turf</p>
//                <button
//   onClick={() => setShowForm(true)}
//   className="px-6 py-3 text-white font-medium rounded-lg hover:bg-[#365135] transition-colors"
//   style={{ backgroundColor: '#415c41' }}
// >
//   Add Your First Turf
// </button>

//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {turfs?.map((turf) => (
//                   <TurfCard
//                     key={turf._id}
//                     turf={turf}
//                     onEdit={(id) => {
//                       setEditingTurf(id);
//                       setShowForm(true);
//                     }}
//                     onDelete={handleDelete}
//                     // onBook={handleBook}
//                     onRate={handleRate}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-6">All Bookings</h2>
//               {allBookings.length === 0 ? (
//                 <div className="text-center py-12">
//                   <FiCalendar className="mx-auto text-4xl text-gray-400 mb-4" />
//                   <p className="text-gray-500">No bookings yet</p>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turf</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {allBookings.map((booking: any) => (
//                         <tr key={booking._id}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {booking.turfName}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(booking.date).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {booking.startTime} - {booking.endTime}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {booking.userId?.name || 'Unknown'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             ₹{booking.amount}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                               booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                               booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                               'bg-yellow-100 text-yellow-800'
//                             }`}>
//                               {booking.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Booking Modal */}
//       {selectedTurfForBooking && (
//         <BookingModal
//           turfId={selectedTurfForBooking}
//           onClose={() => setSelectedTurfForBooking(null)}
//           onSuccess={() => {
//             if (userInfo?._id) {
//               dispatch(fetchTurfs(userInfo._id));
//             }
//           }}
//         />
//       )}

//       {/* Rating Modal */}
//       {selectedTurfForRating && (
//         <RatingModal
//           turfId={selectedTurfForRating}
//           onClose={() => setSelectedTurfForRating(null)}
//           onSuccess={() => {
//             if (userInfo?._id) {
//               dispatch(fetchTurfs(userInfo._id));
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;





