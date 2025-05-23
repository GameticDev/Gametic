import React from 'react';
import { FaMapMarkerAlt, FaFutbol } from 'react-icons/fa';

interface ActivityCardProps {
  userName: string;
  price: string;
  activity: string;
  location: string;
  distance: string;
  sportType: string;
  joined: string;
  avatarUrl: string;
  participants: string[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  userName,
  price,
  activity,
  location,
  distance,
  sportType,
  joined,
  avatarUrl,
  participants,
}) => {
  return (
    // <div className="bg-white rounded-2xl shadow-sm p-4 w-full max-w-xs">
    //   <div className="flex items-center gap-2 mb-3">
    //     <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
    //     <p className="text-sm font-semibold">{userName}</p>
    //   </div>
    //   <p className="text-sm font-semibold text-gray-800">{price}/Person</p>
    //   <p className="text-md font-semibold text-gray-900 mt-1">{activity}</p>
    //   <div className="my-3 h-px bg-gray-200" />
    //   <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
    //     <FaMapMarkerAlt />
    //     <span>{location} ~ {distance}</span>
    //   </div>
    //   <div className="flex items-center text-sm text-gray-600 gap-2 mb-3">
    //     <FaFutbol />
    //     <span>{sportType}</span>
    //   </div>
    //   <div className="flex items-center justify-between">
    //     <div className="flex -space-x-2">
    //       {participants.map((url, index) => (
    //         <img
    //           key={index}
    //           src={url}
    //           alt="participant"
    //           className="w-6 h-6 rounded-full border-2 border-white"
    //         />
    //       ))}
    //     </div>
    //     <p className="text-sm text-gray-600">{joined} Joined</p>
    //   </div>
    // </div>
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
  <div className="flex items-center gap-3 mb-4">
    <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full border border-gray-300" />
    <p className="text-base font-semibold text-gray-800">{userName}</p>
  </div>

  <p className="text-sm font-medium text-green-600">{price} <span className="text-gray-500">/Person</span></p>
  <p className="text-lg font-semibold text-gray-900 mt-1">{activity}</p>

  <div className="my-4 h-px bg-gray-200" />

  <div className="flex items-center text-sm text-gray-600 gap-2 mb-2">
    <FaMapMarkerAlt className="text-blue-500" />
    <span className="truncate">{location} ~ {distance}</span>
  </div>

  <div className="flex items-center text-sm text-gray-600 gap-2 mb-4">
    <FaFutbol className="text-yellow-500" />
    <span>{sportType}</span>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex -space-x-2">
      {participants.map((url, index) => (
        <img
          key={index}
          src={url}
          alt="participant"
          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
        />
      ))}
    </div>
    <p className="text-sm font-medium text-gray-600">{joined} Joined</p>
  </div>
</div>

  );
};

export default ActivityCard;
// "use client"
// import React, { useState } from 'react';
// import { Search, Filter, MapPin, Users } from 'lucide-react';

// interface ActivityCard {
//   id: number;
//   title: string;
//   price: number;
//   location: string;
//   distance: string;
//   category: string;
//   joined: number;
//   total: number;
//   avatars: number[];
// }

// const ActivityPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Sample data for activity cards
//   const activities: ActivityCard[] = Array.from({ length: 8 }, (_, index) => ({
//     id: index + 1,
//     title: '5s Football Activity',
//     price: 199,
//     location: 'South United Fo...',
//     distance: '0.10 kms',
//     category: 'Football 5s',
//     joined: 3,
//     total: 10,
//     avatars: [1, 2, 3]
//   }));

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header with Search and Filters */}
//       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Search */}
//             <div className="flex-1 max-w-md">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search activities"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
//                 />
//               </div>
//             </div>
            
//             {/* Filters */}
//             <button className="ml-4 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <span className="text-gray-700 font-medium">Filters</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Activities Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {activities.map((activity, index) => {
//             // Cycle through the color theme
//             const colors = ['#98916D', '#698866', '#00423D', '#415C41'];
//             const bgColor = colors[index % colors.length];
            
//             return (
//               <div
//                 key={activity.id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
//               >
//                 {/* Card Header with Colored Background */}
//                 <div 
//                   className="p-6 pb-4"
//                   style={{ backgroundColor: bgColor }}
//                 >
//                   <div className="flex items-center space-x-3 mb-4">
//                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
//                       <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
//                            style={{ backgroundColor: bgColor }}>
//                         A
//                       </div>
//                     </div>
//                     <span className="text-white font-medium text-sm">Aginas pk</span>
//                   </div>
//                 </div>

//                 {/* Card Content */}
//                 <div className="px-6 pb-6">
//                   {/* Price */}
//                   <div className="mb-3 -mt-2">
//                     <span className="text-2xl font-bold text-gray-900">₹{activity.price}</span>
//                     <span className="text-gray-500 text-sm ml-1">/Person</span>
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     {activity.title}
//                   </h3>

//                   {/* Location */}
//                   <div className="flex items-center text-blue-500 mb-3">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     <span className="text-sm">{activity.location} ~ {activity.distance}</span>
//                   </div>

//                   {/* Category */}
//                   <div className="flex items-center text-orange-500 mb-6">
//                     <div className="w-4 h-4 mr-2 rounded-full bg-orange-500"></div>
//                     <span className="text-sm">{activity.category}</span>
//                   </div>

//                   {/* Participants */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center -space-x-2">
//                       {activity.avatars.map((avatar, avatarIndex) => (
//                         <div
//                           key={avatarIndex}
//                           className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium shadow-sm"
//                           style={{ 
//                             backgroundColor: colors[avatarIndex % colors.length],
//                             color: 'white'
//                           }}
//                         >
//                           {String.fromCharCode(65 + avatarIndex)}
//                         </div>
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600 font-medium">
//                       {activity.joined}/{activity.total} Joined
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ActivityPage;