// import React from 'react';
// import { FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
// import { TurfData } from '@/types/turf';

// interface TurfAvailabilityProps {
//   availability: TurfData['availability'];
// }

// const predefinedTimeSlots = [
//   '06:00 AM - 07:00 AM',
//   '07:00 AM - 08:00 AM',
//   '08:00 AM - 09:00 AM',
//   '09:00 AM - 10:00 AM',
//   '10:00 AM - 11:00 AM',
//   '11:00 AM - 12:00 PM',
//   '12:00 PM - 01:00 PM',
//   '01:00 PM - 02:00 PM',
//   '02:00 PM - 03:00 PM',
//   '03:00 PM - 04:00 PM',
//   '04:00 PM - 05:00 PM',
//   '05:00 PM - 06:00 PM',
//   '06:00 PM - 07:00 PM',
//   '07:00 PM - 08:00 PM',
// ];

// const TurfBookingAvailability: React.FC<TurfAvailabilityProps> = ({ availability }) => {
//   if (!availability) {
//     return (
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-500">No availability information available</p>
//         </div>
//       </div>
//     );
//   }

//   if (typeof availability === 'string') {
//     return (
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-700">{availability}</p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate available slots by filtering out unavailable ones
//   const availableSlots = predefinedTimeSlots.filter(slot => 
//     !availability.unavailableSlots?.includes(slot)
//   );

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
      
//       {/* Days of Week */}
//       <div className="mb-5">
//         <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
//           <FaCalendarAlt className="mr-2 text-blue-500" />
//           Available Days
//         </h3>
//         <div className="flex flex-wrap gap-2">
//           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//             <div
//               key={day}
//               className={`px-4 py-2 rounded-lg text-sm font-medium ${
//                 availability.days.includes(day)
//                   ? 'bg-green-100 text-green-800 border border-green-300'
//                   : 'bg-gray-100 text-gray-500 border border-gray-200'
//               }`}
//             >
//               {day}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Operating Hours */}
//       <div className="mb-5">
//         <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
//           <FaClock className="mr-2 text-blue-500" />
//           Operating Hours
//         </h3>
//         <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//           <div className="flex items-center justify-between">
//             <span className="font-medium">Daily:</span>
//             <span className="text-blue-700 font-semibold">
//               {availability.startTime} - {availability.endTime}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Available Time Slots */}
//       <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//         <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
//           <FaInfoCircle className="mr-2 text-green-500" />
//           Available Booking Slots
//         </h3>
//         {availableSlots.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
//             {availableSlots.map((slot, index) => (
//               <div key={index} className="bg-white p-2 rounded border border-green-200 text-sm">
//                 {slot}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-600">No available slots (all marked as unavailable)</p>
//         )}
//       </div>

//       {/* Unavailable Time Slots (if any) */}
//       {availability.unavailableSlots && availability.unavailableSlots.length > 0 && (
//         <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
//           <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
//             <FaInfoCircle className="mr-2 text-red-500" />
//             Unavailable Slots
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
//             {availability.unavailableSlots.map((slot, index) => (
//               <div key={index} className="bg-white p-2 rounded border border-red-200 text-sm line-through text-red-500">
//                 {slot}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TurfBookingAvailability;


import React from 'react';
import { FaCalendarAlt, FaClock, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Availability } from '@/types/turf';

interface TurfAvailabilityProps {
  availability: Availability;
}

const predefinedTimeSlots = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

const TurfBookingAvailability: React.FC<TurfAvailabilityProps> = ({ availability }) => {
  if (!availability) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">No availability information available</p>
        </div>
      </div>
    );
  }

  if (typeof availability === 'string') {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{availability}</p>
        </div>
      </div>
    );
  }

  // Check if under maintenance
  if (availability.isUnderMaintenance) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center text-yellow-800">
            <FaExclamationTriangle className="mr-2" />
            <h3 className="font-medium">Currently Under Maintenance</h3>
          </div>
          {availability.maintenanceMessage && (
            <p className="mt-2 text-yellow-700">{availability.maintenanceMessage}</p>
          )}
        </div>
      </div>
    );
  }

  // Access the regular availability data
  const regularAvailability = availability.regular || {};
  const days = regularAvailability.days || [];
  const startTime = regularAvailability.startTime || 'Not specified';
  const endTime = regularAvailability.endTime || 'Not specified';
  const unavailableSlots = regularAvailability.unavailableSlots || [];
  const exceptions = availability.exceptions || [];

  // Calculate available slots
  const availableSlots = predefinedTimeSlots.filter(slot => 
    !unavailableSlots.includes(slot)
  );

  // Format time for display (convert 24h to 12h format if needed)
  const formatTime = (time: string) => {
    if (!time) return 'Not specified';
    if (time.includes('AM') || time.includes('PM')) return time; // Already formatted
    
    // Convert 24h format to 12h format
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
      
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
                days.includes(day)
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
              {formatTime(startTime)} - {formatTime(endTime)}
            </span>
          </div>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
          <FaInfoCircle className="mr-2 text-green-500" />
          Available Booking Slots
        </h3>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {availableSlots.map((slot, index) => (
              <div key={index} className="bg-white p-2 rounded border border-green-200 text-sm">
                {slot}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No available slots (all marked as unavailable)</p>
        )}
      </div>

      {/* Unavailable Time Slots (if any) */}
      {unavailableSlots.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
          <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2 text-red-500" />
            Recurring Unavailable Slots
          </h3>
          <p className="text-sm text-gray-600 mb-2">These slots are unavailable every week</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {unavailableSlots.map((slot, index) => (
              <div key={index} className="bg-white p-2 rounded border border-red-200 text-sm line-through text-red-500">
                {slot}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Date-Specific Exceptions (if any) */}
      {exceptions.length > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mt-4">
          <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2 text-orange-500" />
            Date-Specific Unavailability
          </h3>
          <p className="text-sm text-gray-600 mb-2">These are one-time unavailable dates</p>
          <div className="space-y-2">
            {exceptions.map((exception, index) => (
              <div key={index} className="bg-white p-3 rounded border border-orange-200 text-sm">
                <div className="font-medium">{exception.date}</div>
                <div className="text-orange-600">
                  {formatTime(exception.startTime)} - {formatTime(exception.endTime)}
                </div>
                {exception.reason && (
                  <div className="text-gray-500 mt-1">Reason: {exception.reason}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfBookingAvailability;