"use client";

import { TournamentDetail } from "@/app/(root)/(user-routes)/home/tournament/[id]/page";
import { X, Users, Trophy, UserCheck, CreditCard, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
// import { useAppDispatch } from "@/redux/hook";
import axiosInstance from "@/utils/axiosInstance";
import type {
  RazorpayResponse,
  RazorpayError,
  RazorpayOptions,
} from "@/types/razorpay";
import { fetchTournamentById } from "@/redux/actions/user/tournamentActions";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

interface TeamCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: TournamentDetail;
}

export interface TeamFormData {
  name: string;
  sport: string;
  maxMembers: number;
  members: string[];
  tournament: string;
}

interface OrderData {
  id: string;
  amount: number;
  currency: string;
}

const TeamCreationModal = ({
  isOpen,
  onClose,
  tournament,
}: TeamCreationModalProps) => {
  const dispatch = useAppDispatch();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    sport: tournament.sport,
    maxMembers: tournament.maxPlayers, // Fixed to tournament's maxPlayers
    members: [],
    tournament: tournament._id,
  });

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens with fixed team size
      const requiredMemberSlots = tournament.maxPlayers - 1; // -1 for manager
      const initialMembers = Array(requiredMemberSlots).fill("");

      setFormData({
        name: "",
        sport: tournament.sport,
        maxMembers: tournament.maxPlayers,
        members: initialMembers,
        tournament: tournament._id,
      });
    }
  }, [isOpen, tournament]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<boolean>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (isOpen && !window.Razorpay) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMemberChange = (index: number, value: string): void => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = value;
    setFormData((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  const validateForm = (): { isValid: boolean; error: string } => {
    if (!formData.name.trim()) {
      return { isValid: false, error: "Please enter a team name" };
    }

    if (formData.name.trim().length < 3) {
      return {
        isValid: false,
        error: "Team name must be at least 3 characters long",
      };
    }

    // Check if all member slots are filled (excluding empty strings)
    const filledMembers = formData.members.filter(
      (member) => member.trim() !== ""
    );
    const expectedMembers = formData.maxMembers - 1; // -1 for manager

    if (filledMembers.length !== expectedMembers) {
      return {
        isValid: false,
        error: `Please fill in all ${expectedMembers} team member names`,
      };
    }

    // Check for duplicate member names
    const memberNames = formData.members.filter(
      (member) => member.trim() !== ""
    );
    const uniqueNames = new Set(
      memberNames.map((name) => name.toLowerCase().trim())
    );
    if (uniqueNames.size !== memberNames.length) {
      return {
        isValid: false,
        error: "Please ensure all member names are unique",
      };
    }

    // Check minimum length for member names
    const shortNames = memberNames.filter((name) => name.trim().length < 2);
    if (shortNames.length > 0) {
      return {
        isValid: false,
        error: "All member names must be at least 2 characters long",
      };
    }

    return { isValid: true, error: "" };
  };

  const createRazorpayOrder = async (): Promise<OrderData> => {
    try {
      const response = await axiosInstance.post<OrderData>(
        "/create-team-order",
        {
          name: formData.name,
          sport: formData.sport,
          maxMembers: formData.maxMembers,
          members: formData.members.filter((member) => member.trim() !== ""),
          tournament: formData.tournament,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating team order:", error);
      throw error;
    }
  };

  const createTeam = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post("/team", {
        name: formData.name,
        sport: formData.sport,
        maxMembers: formData.maxMembers,
        members: formData.members.filter((member) => member.trim() !== ""),
        tournament: formData.tournament,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const validation = validateForm();

    if (!validation.isValid) {
      toast(validation.error);
      return;
    }

    if (!window.Razorpay) {
      toast("Payment gateway is not loaded. Please try again.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const orderData = await createRazorpayOrder();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tournament Registration",
        description: `Team registration for ${tournament.title}`,
        order_id: orderData.id,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#00423D",
        },
        handler: async (response: RazorpayResponse) => {
          try {
            await createTeam();

            const toastSequence = [
              { message: "Payment successful!", type: "success" },
              { message: "Your team has been created", type: "success" },
              { message: "Registered for the tournament", type: "success" },
            ];

            toastSequence.forEach((item, index) => {
              setTimeout(() => {
                toast.success(item.message);
              }, index * 500); // 1.2 seconds between each
            });
            console.log(response);
            dispatch(fetchTournamentById({ id: tournament._id }));

            // Reset form
            setFormData({
              name: "",
              sport: tournament.sport,
              maxMembers: tournament.maxPlayers,
              members: Array(tournament.maxPlayers - 1).fill(""),
              tournament: tournament._id,
            });

            onClose();
            setIsProcessingPayment(false);
          } catch (error) {
            console.error("Error during team creation process:", error);
            toast("Team creation failed. Please try again.");
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: { error: RazorpayError }) => {
        toast(
          `Payment failed: ${response.error.description}. Please try again.`
        );
        setIsProcessingPayment(false);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error during payment process:", error);
      toast("Failed to initiate payment. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  if (!isOpen) return null;

  const validation = validateForm();
  const spotsRemaining = tournament.maxTeams - tournament.joinedTeams.length;

  return (
    <dialog className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-5xl mx-auto shadow-xl rounded-lg h-auto p-0">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10"
          onClick={onClose}
          disabled={isProcessingPayment}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 h-full">
          {/* Left Column - Tournament Info & Team Summary */}
          <div className="bg-gradient-to-br from-[#00423D] to-[#415C41] p-8 rounded-l-lg flex flex-col justify-between text-white relative overflow-hidden">
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

            {/* Tournament Info */}
            <div className="text-center z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{tournament.title}</h1>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Create your team and join the tournament
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>
                    {tournament.sport} • {tournament.maxPlayers} players per
                    team
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span>{spotsRemaining} spots remaining</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span>Entry Fee: ₹{tournament.entryFee}</span>
                </div>
              </div>
            </div>

            {/* Team Summary */}
            <div className="z-10 mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Registration Summary
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Tournament:</span>
                  <span className="font-medium text-white">
                    {tournament.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sport:</span>
                  <span className="font-medium text-white">
                    {tournament.sport}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Team Size:</span>
                  <span className="font-medium text-white">
                    {formData.maxMembers} players (Fixed)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Entry Fee:</span>
                  <span className="font-medium text-white">
                    ₹{tournament.entryFee}
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t border-white/30 pt-2 text-white">
                  <span>Total Amount:</span>
                  <span>₹{tournament.entryFee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Team Creation Form */}
          <div className="p-6">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#415C41] mb-1">
                  Create Team
                </h2>
                <p className="text-sm text-[#998869]">
                  Fill in your team details to join the tournament
                </p>
              </div>

              <div className="space-y-4 flex-1">
                {/* Team Name */}
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your team name"
                    className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                    required
                    disabled={isProcessingPayment}
                  />
                </div>

                {/* Fixed Team Size Display */}
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Team Size (Fixed by Tournament)
                  </label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#00423D] mr-2" />
                      <span className="text-sm font-medium text-[#415C41]">
                        {formData.maxMembers} players per team
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#998869] mt-1">
                    Team size is set by the tournament host and cannot be
                    changed
                  </p>
                </div>

                {/* Team Members */}
                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-2">
                    Team Members ({formData.members.length} required)
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {/* Manager (automatically included) */}
                    <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg p-2">
                      <span className="text-xs text-green-600 w-8 font-medium">
                        1.
                      </span>
                      <div className="flex-1 px-3 py-2 bg-green-100 rounded-lg text-sm text-green-700 font-medium">
                        You (Team Manager)
                      </div>
                    </div>

                    {/* Other team members */}
                    {formData.members.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-xs text-[#998869] w-8">
                          {index + 2}.
                        </span>
                        <input
                          type="text"
                          value={member}
                          onChange={(e) =>
                            handleMemberChange(index, e.target.value)
                          }
                          placeholder={`Member ${index + 2} name`}
                          className="flex-1 px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                          required
                          disabled={isProcessingPayment}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validation Error Display */}
                {!validation.isValid && formData.name && (
                  <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-sm text-red-600">
                      {validation.error}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={handleSubmit}
                  disabled={!validation.isValid || isProcessingPayment}
                  className="w-full bg-[#00423D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#415C41] focus:ring-4 focus:ring-[#00423D]/20 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ₹{tournament.entryFee} & Join Tournament
                    </>
                  )}
                </button>
                <p className="text-xs text-[#998869] text-center mt-2">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default TeamCreationModal;
