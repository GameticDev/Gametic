import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaFutbol, FaClock } from "react-icons/fa";

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
  duration?: string;
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
  duration = "2h",
}) => {

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 p-5 w-full max-w-sm relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <FaFutbol className="w-full h-full" style={{ color: '#415C41' }} />
      </div>
      
      {/* Header Section */}
      <div className="flex items-center mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={avatarUrl}
              alt="Host avatar"
              width={48}
              height={48}
              className="rounded-full border-3 shadow-md"
              style={{ borderColor: '#998869' }}
            />
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500 font-medium">Host</p>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold" style={{ color: '#415C41' }}>
            {price}
          </span>
          <span className="text-sm font-medium text-gray-500">/person</span>
        </div>
      </div>

      {/* Activity Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
        {activity}
      </h3>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span 
          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: '#98916D' }}
        >
          {sportType}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Location & Duration */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center text-sm text-gray-700 gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#998869' }}
          >
            <FaMapMarkerAlt className="text-white text-xs" />
          </div>
          <div>
            <span className="font-semibold truncate block">{location}</span>
            <span className="text-xs text-gray-500">{distance} away</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-700 gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#00423D' }}
          >
            <FaClock className="text-white text-xs" />
          </div>
          <span className="font-medium">{duration} duration</span>
        </div>
      </div>

      {/* Participants Section */}
      <div 
        className="rounded-2xl p-4 border-2"
        style={{ 
          backgroundColor: '#f8f9fa',
          borderColor: '#998869'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {participants.slice(0, 4).map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Participant ${index + 1}`}
                    width={36}
                    height={36}
                    className="rounded-full border-3 border-white shadow-sm hover:scale-110 transition-transform duration-200"
                  />
                </div>
              ))}
              {participants.length > 4 && (
                <div 
                  className="w-9 h-9 rounded-full border-3 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: '#415C41' }}
                >
                  +{participants.length - 4}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: '#00423D' }}>
              {joined}
            </p>
            <p className="text-xs font-medium text-gray-600">joined</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ActivityCard;