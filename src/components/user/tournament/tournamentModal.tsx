"use client";
import { fetchVenueBySport } from "@/redux/actions/user/hostActions";
import {
  createTournament,
  fetchAllTournaments,
} from "@/redux/actions/user/tournamentActions";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  X,
  Trophy,
  Upload,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Venue {
  _id: string;
  name: string;
  hourlyRate: number;
}

export interface FormData {
  title: string;
  description: string;
  sport: string;
  turf: string;
  dateFrom: string;
  dateTo: string;
  maxTeams: string;
  maxPlayers: string;
  entryFee: string;
  prizePool: string;
  image: File | null;
}

const TournamentModal = ({ isOpen, onClose }: TournamentModalProps) => {
  const dispatch = useAppDispatch();
  const { venues } = useAppSelector((state) => state.host) as {
    venues: Venue[] | null;
  };
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    sport: "football",
    turf: "",
    dateFrom: "",
    dateTo: "",
    maxTeams: "",
    maxPlayers: "",
    entryFee: "",
    prizePool: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sportsOptions: string[] = [
    "football",
    "cricket",
    "multi-sport",
    "swimming",
    "basketball",
    "badminton",
    "tennis",
    "volleyball",
    "hockey",
  ];

  // Sport-specific team formats - just player numbers
  const sportFormats: Record<string, number[]> = {
    football: [5, 7, 11],
    cricket: [6, 8, 11],
    basketball: [3, 5],
    volleyball: [4, 6],
    badminton: [1, 2],
    tennis: [1, 2],
    hockey: [6, 11],
    swimming: [1, 4],
    "multi-sport": [1, 2, 4, 6, 8],
  };

  useEffect(() => {
    dispatch(fetchVenueBySport({ sport: formData.sport }));
  }, [formData.sport, dispatch]);

  // Reset maxPlayers when sport changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      maxPlayers: "",
    }));
  }, [formData.sport]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const validateSection1 = (): boolean => {
    const section1Fields = [
      "title",
      "description",
      "sport",
      "turf",
      "dateFrom",
      "dateTo",
    ];

    for (const field of section1Fields) {
      if (!formData[field as keyof FormData]) {
        toast(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    if (new Date(formData.dateFrom) >= new Date(formData.dateTo)) {
      toast("End date must be after start date");
      return false;
    }

    return true;
  };

  const validateSection2 = (): boolean => {
    const section2Fields = ["maxTeams", "maxPlayers", "entryFee", "prizePool"];

    for (const field of section2Fields) {
      if (!formData[field as keyof FormData]) {
        toast(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    if (parseInt(formData.maxTeams) < 2) {
      toast("Tournament must have at least 2 teams");
      return false;
    }

    if (parseInt(formData.maxPlayers) < 1) {
      toast("Players per team must be at least 1");
      return false;
    }

    if (!formData.image) {
      toast("Please upload a tournament image");
      return false;
    }

    return true;
  };

  const handleNext = (): void => {
    if (validateSection1()) {
      setCurrentSection(2);
    }
  };

  const handlePrevious = (): void => {
    setCurrentSection(1);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateSection2()) {
      return;
    }

    setIsProcessing(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("sport", formData.sport);
      formDataToSend.append("turf", formData.turf);
      formDataToSend.append("dateFrom", formData.dateFrom);
      formDataToSend.append("dateTo", formData.dateTo);
      formDataToSend.append("maxTeams", formData.maxTeams);
      formDataToSend.append("maxPlayers", formData.maxPlayers);
      formDataToSend.append("entryFee", formData.entryFee);
      formDataToSend.append("prizePool", formData.prizePool);
      formDataToSend.append("image", formData.image!); // Safe due to validateSection2

      await dispatch(createTournament({ formData: formDataToSend })).unwrap();
      toast("Tournament created successfully")
      dispatch(
        fetchAllTournaments({
          page: 1,
          limit: 12,
          search: "",
          sport: "",
          location: "",
        })
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        sport: "football",
        turf: "",
        dateFrom: "",
        dateTo: "",
        maxTeams: "",
        maxPlayers: "",
        entryFee: "",
        prizePool: "",
        image: null,
      });
      setImagePreview("");
      setCurrentSection(1);
      onClose();
    } catch (error) {
      console.error("Error creating tournament:", error);
      toast(`Failed to create tournament: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = (): void => {
    setCurrentSection(1);
    onClose();
  };

  if (!isOpen) return null;

  const isSection1Valid =
    formData.title &&
    formData.description &&
    formData.sport &&
    formData.turf &&
    formData.dateFrom &&
    formData.dateTo;
  const isSection2Valid =
    formData.maxTeams &&
    formData.maxPlayers &&
    formData.entryFee &&
    formData.prizePool &&
    formData.image;

  return (
    <dialog className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-lg mx-auto shadow-xl rounded-lg p-0">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-gray-100 z-10"
          onClick={handleClose}
          disabled={isProcessing}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4">
          {/* Header */}
          <div className="mb-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00423D] to-[#415C41] rounded-full flex items-center justify-center mb-3 mx-auto">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#415C41] mb-1">
              Create Tournament
            </h2>
            <p className="text-xs text-[#998869]">
              {currentSection === 1
                ? "Set up tournament details"
                : "Configure teams and prizes"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    currentSection === 1
                      ? "bg-[#00423D] text-white"
                      : "bg-[#00423D] text-white"
                  }`}
                >
                  1
                </div>
                <span
                  className={`ml-1 text-xs ${
                    currentSection === 1
                      ? "text-[#00423D] font-semibold"
                      : "text-[#415C41]"
                  }`}
                >
                  Basic Info
                </span>
              </div>
              <div
                className={`w-6 h-0.5 ${
                  currentSection === 2 ? "bg-[#00423D]" : "bg-gray-300"
                }`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    currentSection === 2
                      ? "bg-[#00423D] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span
                  className={`ml-1 text-xs ${
                    currentSection === 2
                      ? "text-[#00423D] font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  Teams & Prizes
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div>
            {/* Section 1: Basic Information */}
            {currentSection === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Tournament Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Summer Football Championship"
                    className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your tournament..."
                    rows={2}
                    className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Sport
                  </label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white"
                    required
                  >
                    {sportsOptions.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Select Venue
                  </label>
                  <select
                    name="turf"
                    value={formData.turf}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white"
                    required
                  >
                    <option value="">Choose a venue</option>
                    {venues ? (
                      venues.map((venue) => (
                        <option key={venue._id} value={venue._id}>
                          {venue.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No venues available</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleInputChange}
                      min={getTodayDate()}
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleInputChange}
                      min={formData.dateFrom || getTodayDate()}
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Teams & Prizes */}
            {currentSection === 2 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Max Teams
                    </label>
                    <input
                      type="number"
                      name="maxTeams"
                      value={formData.maxTeams}
                      onChange={handleInputChange}
                      min="2"
                      max="32"
                      placeholder="e.g., 8"
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Players per Team
                    </label>
                    <select
                      name="maxPlayers"
                      value={formData.maxPlayers}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors bg-white"
                      required
                    >
                      <option value="">Select format</option>
                      {sportFormats[formData.sport]?.map((playerCount) => (
                        <option
                          key={playerCount}
                          value={playerCount.toString()}
                        >
                          {playerCount}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Entry Fee (₹)
                    </label>
                    <input
                      type="number"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="e.g., 500"
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#415C41] mb-1">
                      Prize Pool (₹)
                    </label>
                    <input
                      type="number"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="e.g., 5000"
                      className="w-full px-2 py-1.5 text-sm border border-[#98916D] rounded-md focus:ring-1 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Tournament Image
                  </label>
                  <div className="relative border-2 border-dashed border-[#98916D] rounded-md p-3 text-center hover:border-[#00423D] transition-colors">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <Image
                          src={imagePreview}
                          alt="Tournament preview"
                          className="w-full h-20 object-cover rounded-md"
                          height={1}
                          width={1}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-[#998869] mx-auto" />
                        <div>
                          <p className="text-xs text-[#415C41] font-medium">
                            Click to upload image
                          </p>
                          <p className="text-xs text-[#998869]">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {formData.entryFee && formData.maxTeams && (
                  <div className="p-3 bg-[#00423D]/5 border border-[#00423D]/20 rounded-md">
                    <h3 className="text-xs font-semibold text-[#00423D] mb-2">
                      Tournament Summary
                    </h3>
                    <div className="text-xs space-y-1 text-[#415C41]">
                      <div className="flex justify-between">
                        <span>Total Teams:</span>
                        <span className="font-semibold">
                          {formData.maxTeams}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entry Fee:</span>
                        <span className="font-semibold">
                          ₹{formData.entryFee} per team
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prize Pool:</span>
                        <span className="font-semibold">
                          ₹{formData.prizePool}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-[#00423D]/20 pt-1 text-[#00423D]">
                        <span>Total Revenue:</span>
                        <span>
                          ₹
                          {parseInt(formData.entryFee) *
                            parseInt(formData.maxTeams) || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            {currentSection === 1 ? (
              <button
                onClick={handleNext}
                disabled={!isSection1Valid}
                className="w-full bg-[#00423D] text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-[#415C41] focus:ring-2 focus:ring-[#00423D]/20 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Next: Teams & Prizes
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={isProcessing}
                  className="flex-1 bg-gray-100 text-[#415C41] py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-300/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isSection2Valid || isProcessing}
                  className="flex-1 bg-[#00423D] text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-[#415C41] focus:ring-2 focus:ring-[#00423D]/20 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4 mr-1" />
                      Create Tournament
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default TournamentModal;
