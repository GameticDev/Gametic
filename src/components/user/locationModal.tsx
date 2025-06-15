"use client";
import React, { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchLocations } from "@/redux/actions/user/locationActions";

interface LocationModalProps {
  onLocationSelect: (location: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector((state) => state.location);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchLocations({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    setSearchTerm("");
  };

  const handleModalClose = () => {
    setSearchTerm("");
    onClose();
  };
  if (!isOpen) return null;

  return (
    <dialog id="my_modal_3" className="modal z-50" open={isOpen}>
      <div className="modal-box max-w-md bg-white">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10"
          onClick={handleModalClose}
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-bold text-lg mb-4 text-[#00423d]">
          Select Location
        </h3>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search locations..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Location List */}
        <div className="max-h-80 overflow-y-auto">
          {locations.length > 0 ? (
            <ul className="space-y-2">
              {locations.map((location, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLocationSelect(location.name)}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#f5f5f5] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <MapPin className="h-4 w-4 text-[#00423d]" />
                    <span className="text-[#00423d]">{location.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : searchTerm === "" ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Search your location</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No locations found</p>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default LocationModal;
