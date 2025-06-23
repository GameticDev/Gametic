import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiChevronDown, FiX } from 'react-icons/fi';
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormWatch,
} from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form';
import { TurfFormInputs } from '@/types/turf';

interface TurfBasicInfoProps {
  register: UseFormRegister<TurfFormInputs>;
  errors: FieldErrors<TurfFormInputs>;
  control: Control<TurfFormInputs>;
  watch?: UseFormWatch<TurfFormInputs>;
  locations?: { _id: string; name: string; state: string }[];
  setValue: UseFormSetValue<TurfFormInputs>;
}

const TurfBasicInfo: React.FC<TurfBasicInfoProps> = ({
  register,
  errors,
  locations,
  setValue
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (locations) {
      setFilteredLocations(locations);
    }
  }, [locations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSelectedLocation(term);

    if (locations) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(term.toLowerCase()) ||
        location.state.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredLocations(filtered);
    }

    if (term === '') {
      setValue('location', '');
    }
  };

  const handleLocationSelect = (location: { name: string; state: string }) => {
    const fullLocation = `${location.name} (${location.state})`;
    setSelectedLocation(fullLocation);
    setValue('location', location.name);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedLocation('');
    setSearchTerm('');
    setValue('location', '');
    setIsDropdownOpen(false);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Turf Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Turf Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name', {
            required: 'Turf name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter turf name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.name.message}
          </p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('city', {
            required: 'City is required',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'City should contain only letters',
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.city.message}
          </p>
        )}
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area/Locality <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('area', {
            required: 'Area is required',
            minLength: {
              value: 3,
              message: 'Area must be at least 3 characters',
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter area/locality"
        />
        {errors.area && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.area.message}
          </p>
        )}
      </div>

      {/* Location with autocomplete */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={selectedLocation || searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search location..."
          />
          {selectedLocation && (
            <button
              type="button"
              onClick={clearSelection}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FiX size={18} />
            </button>
          )}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            <FiChevronDown size={18} />
          </div>
        </div>

        {/* Hidden input for form registration */}
        <input
          type="hidden"
          {...register('location', {
            required: 'Location is required',
          })}
        />

        {isDropdownOpen && filteredLocations.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredLocations.map((location) => (
              <div
                key={location._id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onMouseDown={() => handleLocationSelect(location)}
              >
                {location.name} ({location.state})
              </div>
            ))}
          </div>
        )}

        {errors.location && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.location.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Address <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('address', {
            required: 'Address is required',
            minLength: {
              value: 10,
              message: 'Address must be at least 10 characters',
            },
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter complete address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.address.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TurfBasicInfo;
