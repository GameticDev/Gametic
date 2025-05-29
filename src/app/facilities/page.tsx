"use client";

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
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  const facilities: SportsFacility[] = [
    {
      id: 1,
      name: "Premium Football Turf Arena",
      location: "Downtown Sports Complex",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      pricePerHour: 45.0,
      rating: 4.8,
      reviews: 156,
      openHours: "6:00 AM - 11:00 PM",
      capacity: "22 players",
      sportType: "Football",
      amenities: ["Floodlights", "Changing Rooms", "Parking", "Refreshments"],
      availability: "Available Today"
    }
    // Add more facilities as needed
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const sportTypes = ['all', 'Football', 'Cricket', 'Basketball', 'Tennis', 'Swimming', 'Badminton', 'Hockey', 'Volleyball', 'Multi-Sport'];

  const filteredFacilities = facilities.filter(facility => {
    const sportMatch = selectedSport === 'all' || facility.sportType === selectedSport;
    const priceMatch = priceFilter === null || facility.pricePerHour <= priceFilter;
    const dateMatch = !dateFilter || facility.availability.toLowerCase().includes(dateFilter.toLowerCase());
    return sportMatch && priceMatch && dateMatch;
  });

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
    <div className="min-h-screen bg-white p-6 text-[#204E4A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#204E4A] mb-2">Book Sports Facilities & Turfs</h1>
          <p className="text-[#4A6E6B]">Find and book premium sports facilities for your games and training sessions.</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 sticky">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-[#EDF3EF] text-[#204E4A]"
          >
            {sportTypes.map(sport => (
              <option key={sport} value={sport}>
                {sport === 'all' ? 'All Sports' : `${getSportIcon(sport)} ${sport}`}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter || ''}
            onChange={(e) => setPriceFilter(e.target.value ? Number(e.target.value) : null)}
            className="px-4 py-2 border rounded-lg bg-[#EDF3EF] text-[#204E4A]"
          />

          <input
            type="text"
            placeholder="Date (e.g., Today)"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-[#EDF3EF] text-[#204E4A]"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentFacilities.map(facility => (
            <div key={facility.id} className="bg-[#F7FAF7] border border-[#D0E3D2] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img src={facility.image} alt={facility.name} className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" />
                <button
                  onClick={() => toggleFavorite(facility.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-[#E2F0E2]"
                >
                  <Heart className={`w-5 h-5 ${favorites.has(facility.id) ? 'fill-green-600 text-green-600' : 'text-gray-600'}`} />
                </button>
                <div className="absolute bottom-3 left-3 bg-[#A8D5BA] text-[#204E4A] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <span>{getSportIcon(facility.sportType)}</span>
                  {facility.sportType}
                </div>
                <div className="absolute top-3 left-3 bg-[#69A297] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {facility.availability}
                </div>
              </div>

              <div className="p-5 text-[#204E4A]">
                <div className="flex items-center gap-1 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{facility.location}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {facility.openHours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {facility.capacity}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 text-xs">
                    {facility.amenities.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="bg-[#D0E3D2] text-[#204E4A] px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                    {facility.amenities.length > 3 && (
                      <span className="bg-[#D0E3D2] text-[#204E4A] px-2 py-1 rounded-full">+{facility.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{facility.rating}</span>
                    <span className="text-sm">({facility.reviews})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-[#2F855A]">${facility.pricePerHour.toFixed(2)}</span>
                    <span className="text-sm block text-gray-500">/hour</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#69A297] hover:bg-[#557C6F] text-white py-2 rounded-lg font-medium transition">
                    Book Now
                  </button>
                  <button className="px-4 py-2 border border-[#69A297] text-[#69A297] hover:bg-[#EDF3EF] rounded-lg transition">
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
              className={`w-10 h-10 rounded-full font-medium transition-colors duration-200 ${
                currentPage === i + 1
                  ? 'bg-[#69A297] text-white'
                  : 'bg-[#EDF3EF] text-[#204E4A] hover:bg-[#D0E3D2]'
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
