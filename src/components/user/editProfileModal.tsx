"use client";

import { X, User, Phone, Upload, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hook";
import { currentUser } from "@/redux/actions/user/userAction";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    _id: string;
    username: string;
    email: string;
    picture?: string;
    phone?: string;
  } | null;
}

interface FormData {
  username: string;
  phone: string;
  picture: File | null;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    username: user?.username || "",
    phone: user?.phone || "",
    picture: null,
  });

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        picture: null,
      });
      setPreviewImage("");
    }
  }, [isOpen, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        picture: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (formData.username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must be a valid 10-digit number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username.trim());

      if (formData.phone) {
        formDataToSend.append("phone", formData.phone);
      }

      if (formData.picture) {
        formDataToSend.append("picture", formData.picture);
      }

      const response = await axiosInstance.put(
        "/updateprofile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");

      // Call the callback to update the parent component
      dispatch(currentUser());

      // Reset form and close modal
      setFormData({
        username: "",
        phone: "",
        picture: null,
      });
      setPreviewImage("");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentImage = () => {
    if (previewImage) return previewImage;
    if (user?.picture) return user.picture;
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal z-50" open={isOpen}>
      <div className="modal-box bg-white max-w-4xl mx-auto shadow-xl rounded-lg h-auto p-0">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-gray-100 z-10"
          onClick={onClose}
          disabled={isProcessing}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 h-full">
          {/* Left Side - Visual/Preview */}
          <div className="bg-gradient-to-br from-[#00423D] to-[#415C41] p-8 rounded-l-lg flex flex-col justify-center items-center text-white relative overflow-hidden">
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

            <div className="text-center z-10">
              <div className="relative mb-6">
                <Image
                  src={getCurrentImage()}
                  alt="Profile Preview"
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-full object-cover border-4 border-white/30 mx-auto"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                  disabled={isProcessing}
                >
                  <Upload className="w-4 h-4 text-white" />
                </button>
              </div>

              <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Update your profile information and make it uniquely yours
              </p>

              <div className="space-y-3 text-left max-w-xs mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Update your username</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Add your phone number</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span>Upload profile picture</span>
                </div>
              </div>

              {formData.username && (
                <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium">{formData.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{user?.email || "N/A"}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">
                          +91 {formData.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6">
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#415C41] mb-1">
                  Profile Information
                </h2>
                <p className="text-sm text-[#998869]">
                  Update your profile details below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isProcessing}
                />

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                    required
                    disabled={isProcessing}
                    minLength={3}
                  />
                  <p className="text-xs text-[#998869] mt-1">
                    Minimum 3 characters required
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500"
                    disabled
                  />
                  <p className="text-xs text-[#998869] mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm"
                    disabled={isProcessing}
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                  <p className="text-xs text-[#998869] mt-1">
                    Optional: 10-digit mobile number
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#415C41] mb-1">
                    Profile Picture
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-3 py-2 border border-[#98916D] rounded-lg focus:ring-2 focus:ring-[#00423D] focus:border-[#00423D] outline-none transition-colors text-sm bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
                    disabled={isProcessing}
                  >
                    <Upload className="w-4 h-4" />
                    {formData.picture
                      ? formData.picture.name
                      : "Choose profile picture"}
                  </button>
                  <p className="text-xs text-[#998869] mt-1">
                    Optional: JPG, PNG, or GIF (max 5MB)
                  </p>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-[#98916D] text-[#415C41] rounded-lg font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-[#00423D]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing || !formData.username.trim()}
                      className="flex-1 bg-[#00423D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#415C41] focus:ring-4 focus:ring-[#00423D]/20 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4 mr-2" />
                          Update Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default EditProfileModal;