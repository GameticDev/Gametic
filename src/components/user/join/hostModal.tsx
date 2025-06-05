import { X, MapPin, Users, Trophy } from "lucide-react";
import { useState } from "react";

interface HostModalProp {
  isOpen: boolean;
  onClose: () => void;
}

interface VenueData {
  [venueName: string]: number;
}

interface LocationData {
  [locationName: string]: VenueData;
}

const HostModal = ({ isOpen, onClose }: HostModalProp) => {
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    date: "",
    location: "",
    turf: "",
    timeSlot: "",
    players: ""
  });

  // Sports categories
  const sportsOptions = [
    "Football",
    "Cricket", 
    "Basketball",
    "Tennis",
    "Badminton",
    "Hockey"
  ];

  // Location and venue data
  const locationData: LocationData = {
    "Mumbai": {
      "Premium Indoor Court": 150,
      "Outdoor Football Field": 100,
      "Basketball Court": 80,
      "Tennis Court": 120
    },
    "Delhi": {
      "Cricket Ground": 200,
      "Football Turf": 120,
      "Badminton Court": 60,
      "Hockey Field": 180
    },
    "Bangalore": {
      "Tech Park Sports Complex": 140,
      "Indoor Badminton": 70,
      "Outdoor Cricket": 160,
      "Football Arena": 110
    },
    "Chennai": {
      "Marina Sports Club": 130,
      "Cricket Academy": 170,
      "Tennis Academy": 100,
      "Multi-Sport Complex": 90
    }
  };

  // Time slots
  const timeSlots = [
    "06:00 - 07:00",
    "07:00 - 08:00", 
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'location' && { turf: '' })
    }));
  };

  const getPricePerPerson = (): number => {
    if (!formData.location || !formData.turf || !formData.players) return 0;
    const locationVenues = locationData[formData.location];
    if (!locationVenues) return 0;
    const totalPrice = locationVenues[formData.turf] || 0;
    const numPlayers = parseInt(formData.players) || 1;
    return Math.round(totalPrice / numPlayers);
  };

  const getAvailableVenues = (): string[] => {
    if (!formData.location) return [];
    const locationVenues = locationData[formData.location];
    return locationVenues ? Object.keys(locationVenues) : [];
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog id="my_modal_3" className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-5xl mx-auto shadow-xl rounded-lg h-auto p-0">
        <button 
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10" 
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 h-full">
          {/* Left Side - Image and Heading */}
          <div className="bg-gradient-to-br from-[#00423D] to-[#415C41] p-8 rounded-l-lg flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle cx="40" cy="20" r="2" fill="currentColor" />
                <circle cx="60" cy="20" r="2" fill="currentColor" />
                <circle cx="80" cy="20" r="2" fill="currentColor" />
                <circle cx="20" cy="40" r="2" fill="currentColor" />
                <circle cx="40" cy="40" r="2" fill="currentColor" />
                <circle cx="60" cy="40" r="2" fill="currentColor" />
                <circle cx="80" cy="40" r="2" fill="currentColor" />
                <circle cx="20" cy="60" r="2" fill="currentColor" />
                <circle cx="40" cy="60" r="2" fill="currentColor" />
                <circle cx="60" cy="60" r="2" fill="currentColor" />
                <circle cx="80" cy="60" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
                <circle cx="40" cy="80" r="2" fill="currentColor" />
                <circle cx="60" cy="80" r="2" fill="currentColor" />
                <circle cx="80" cy="80" r="2" fill="currentColor" />
              </svg>
            </div>

            {/* Content */}
            <div className="text-center z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Host Your Game</h1>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Bring your community together for an unforgettable sports experience
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Connect with players</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Book premium venues</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span>Create lasting memories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#415C41] mb-1">Event Details</h2>
                <p className="text-sm text-[#998869]">Fill in the information below</p>
              </div>

              <div className="space-y-3 flex-1">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Game Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Friday Night Football"
                    className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Sport and Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Sport
                    </label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white text-sm"
                      required
                    >
                      <option value="">Select sport</option>
                      {sportsOptions.map((sport) => (
                        <option key={sport} value={sport}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Location and Venue */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Location
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white text-sm"
                      required
                    >
                      <option value="">Select city</option>
                      {Object.keys(locationData).map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Venue
                    </label>
                    <select
                      name="turf"
                      value={formData.turf}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white disabled:bg-gray-100 disabled:text-gray-500 text-sm"
                      required
                      disabled={!formData.location}
                    >
                      <option value="">
                        {formData.location ? "Select venue" : "Select location first"}
                      </option>
                      {getAvailableVenues().map((venue) => (
                        <option key={venue} value={venue}>
                          {venue}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time and Players */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white text-sm"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Players
                    </label>
                    <input
                      type="number"
                      name="players"
                      value={formData.players}
                      onChange={handleInputChange}
                      min="2"
                      max="22"
                      placeholder="e.g., 10"
                      className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Price Per Person
                  </label>
                  <div className="w-full px-3 py-2 border border-[#98916D] rounded-lg bg-gray-50 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#00423D]">₹{getPricePerPerson()}</span>
                    {formData.location && formData.turf && formData.players && (
                      <span className="text-xs text-[#998869]">
                        ₹{locationData[formData.location][formData.turf]} ÷ {formData.players} players
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#00423D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#415C41] focus:ring-4 focus:ring-[#00423D]/20 transition-all duration-200"
                >
                  🎯 Host Game
                </button>
                <p className="text-xs text-[#998869] text-center mt-2">
                  By hosting, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default HostModal;