"use client"

import React, { useState } from 'react';
import { Heart, Star, MapPin, Clock, Users, Zap } from 'lucide-react';

interface SportsFacility {
  id: number;
  name: string;
  location: string;
  image: string;
  pricePerHour: number;
  rating: number;
  reviews: number;
  openHours: string;
  capacity: string;
  sportType: string;
  amenities: string[];
  availability: string;
}

const SportsFacilitiesBooking: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSport, setSelectedSport] = useState('all');

  const facilities: SportsFacility[] = [
    {
      id: 1,
      name: "Premium Football Turf Arena",
      location: "Downtown Sports Complex",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      pricePerHour: 45.00,
      rating: 4.8,
      reviews: 156,
      openHours: "6:00 AM - 11:00 PM",
      capacity: "22 players",
      sportType: "Football",
      amenities: ["Floodlights", "Changing Rooms", "Parking", "Refreshments"],
      availability: "Available Today"
    },
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const sportTypes = ['all', 'Football', 'Cricket', 'Basketball', 'Tennis', 'Swimming', 'Badminton', 'Hockey', 'Volleyball', 'Multi-Sport'];

  const filteredFacilities = selectedSport === 'all'
    ? facilities
    : facilities.filter(facility => facility.sportType === selectedSport);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFacilities = filteredFacilities.slice(startIndex, startIndex + itemsPerPage);

  const getSportIcon = (sportType: string) => {
    switch (sportType) {
      case 'Football': return '⚽';
      case 'Cricket': return '🏏';
      case 'Basketball': return '🏀';
      case 'Tennis': return '🎾';
      case 'Swimming': return '🏊';
      case 'Badminton': return '🏸';
      case 'Hockey': return '🏑';
      case 'Volleyball': return '🏐';
      default: return '🏟️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Sports Facilities & Turfs
          </h1>
          <p className="text-gray-600">
            Find and book premium sports facilities for your games and training sessions
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sportTypes.map(sport => (
              <option key={sport} value={sport}>
                {sport === 'all' ? 'All Sports' : `${getSportIcon(sport)} ${sport}`}
              </option>
            ))}
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Price Range</option>
            <option>Under $25/hour</option>
            <option>$25 - $40/hour</option>
            <option>Over $40/hour</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Availability</option>
            <option>Available Now</option>
            <option>Available Today</option>
            <option>This Week</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Location</option>
            <option>Downtown</option>
            <option>City Center</option>
            <option>Suburbs</option>
          </select>
        </div>

        {/* Sports Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentFacilities.map((facility) => (
            <div key={facility.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
<img
  src={facility.image}
  alt={facility.name}
  width={400}
  height={300}
  className="object-cover hover:scale-105 transition-transform duration-300"
/>

                <button
                  onClick={() => toggleFavorite(facility.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.has(facility.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 hover:text-red-500'
                      } transition-colors duration-200`}
                  />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <span>{getSportIcon(facility.sportType)}</span>
                    {facility.sportType}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {facility.availability}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{facility.location}</span>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {facility.name}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {facility.openHours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {facility.capacity}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {facility.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {facility.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{facility.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{facility.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({facility.reviews} reviews)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">
                      ${facility.pricePerHour.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 block">/hour</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                    Book Now
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full font-medium transition-colors duration-200 ${currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsFacilitiesBooking;