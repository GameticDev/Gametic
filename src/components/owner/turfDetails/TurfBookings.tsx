// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { Booking } from '@/types/turf';

// interface TurfBookingsProps {
//   bookings: Booking[];
//   turfId: string;
// }

// const TurfBookings: React.FC<TurfBookingsProps> = ({ bookings, turfId }) => {
//   const router = useRouter();
//   const upcomingBookings = bookings?.filter(booking => new Date(booking.date) >= new Date()) || [];

//   return (
//     <div className="mb-6">
//       <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Bookings</h3>
//       {upcomingBookings.length > 0 ? (
//         <div className="space-y-3">
//           {upcomingBookings.slice(0, 3).map((booking, index) => (
//             <div 
//               key={booking._id || `${booking.date}-${index}`}
//               className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//               <div className="flex justify-between items-center">
//                 <span className="font-medium">
//                   {new Date(booking.date).toLocaleDateString('en-US', {
//                     weekday: 'short',
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric'
//                   })}
//                 </span>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                   booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                   booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                   'bg-blue-100 text-blue-800'
//                 }`}>
//                   {booking.status}
//                 </span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-blue-600 font-medium">
//                   {booking.startTime} - {booking.endTime}
//                 </span>
//                 <span className="text-gray-700">
//                   ₹{booking.amount}
//                 </span>
//               </div>
//               <div className="mt-2 text-sm text-gray-600">
//                 {/* <div>Booked by: {booking.userId?.username || 'Guest'}</div> */}
//                 {/* <div>
//   Booked by: {
//     booking.userId && typeof booking.userId === 'object' && booking.userId.username
//       ? booking.userId.username
//       : 'Guest'
//   }
// </div> */}
//   <div key={booking._id}>
//           Booked by: {
//             typeof booking.userId === 'object' && booking.userId !== null
//               ? booking.userId.username || 'Guest'
//               : 'Guest'
//           }
//         </div>


//                 <div>Payment: 
//                   <span className={`ml-1 ${
//                     booking.paymentStatus === 'paid' ? 'text-green-600' :
//                     booking.paymentStatus === 'pending' ? 'text-yellow-600' :
//                     'text-red-600'
//                   }`}>
//                     {booking.paymentStatus}
//                   </span>
//                 </div>
//                 <div className="text-xs text-gray-500 mt-1">
//                   Created: {new Date(booking.createdAt).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//           {upcomingBookings.length > 3 && (
//             <button 
//               onClick={() => router.push(`/owner/bookings/${turfId}`)}
//               className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
//             >
//               View all {upcomingBookings.length} bookings →
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="bg-gray-50 p-4 rounded-lg text-center">
//           <p className="text-gray-500">No upcoming bookings</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TurfBookings;





import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Booking } from '@/types/turf';

interface TurfBookingsProps {
  bookings: Booking[];
  turfId: string;
}

interface UserData {
  _id: string;
  username?: string;
  email?: string;
}

const TurfBookings: React.FC<TurfBookingsProps> = ({ bookings, turfId }) => {
  const router = useRouter();
  const [userMap, setUserMap] = useState<Record<string, UserData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data for bookings
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Extract unique user IDs from bookings
        const userIds = Array.from(
          new Set(
            bookings
              .map(booking => 
                typeof booking.userId === 'string' 
                  ? booking.userId 
                  : booking.userId?._id
              )
              .filter(Boolean) as string[]
        ));

        if (userIds.length > 0) {
          const response = await fetch(`/api/users?ids=${userIds.join(',')}`);
          const users: UserData[] = await response.json();
          
          const newUserMap = users.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
          }, {} as Record<string, UserData>);
          
          setUserMap(newUserMap);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookings?.length > 0) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [bookings]);

  const upcomingBookings = React.useMemo(() => {
    if (!bookings || !Array.isArray(bookings)) return [];

    return bookings.filter(booking => {
      try {
        const bookingDate = new Date(booking.date);
        const today = new Date();
        return bookingDate.setHours(0,0,0,0) >= today.setHours(0,0,0,0);
      } catch (error) {
        console.error('Error parsing booking date:', error);
        return false;
      }
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [bookings]);

  const getUserDisplay = (userId: Booking['userId']) => {
    if (!userId) return 'Guest';
    
    // If populated user object exists
    if (typeof userId === 'object' && userId !== null) {
      return userId.username || `User-${userId._id.slice(-4)}`;
    }
    
    // If only ID exists (check our userMap)
    if (userMap[userId]) {
      return userMap[userId].username || `User-${userId.slice(-4)}`;
    }
    
    // Final fallback
    return `User-${userId.slice(-4)}`;
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Bookings</h3>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Bookings</h3>
      
      {upcomingBookings.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">No upcoming bookings found</p>
          {bookings.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              (Showing only future bookings. {bookings.length} total bookings exist.)
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingBookings.slice(0, 3).map((booking) => (
            <div 
              key={booking._id || `${booking.date}-${booking.startTime}`}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {formatDate(booking.date)}
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
                  ₹{booking.amount.toLocaleString()}
                </span>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Booked by:</span> {getUserDisplay(booking.userId)}
                </div>
                <div>
                  <span className="font-medium">Payment:</span> 
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
              onClick={() => router.push(`/owner/bookings/${turfId}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 flex items-center"
            >
              View all {upcomingBookings.length} bookings
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TurfBookings;