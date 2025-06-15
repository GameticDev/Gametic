"use client";

import React, { useState } from "react";
import { User, Lock, Camera, Save, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import axios from "axios";

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const form = new FormData();
    form.append("username", formData.username);
    form.append("currentPassword", formData.currentPassword);
    form.append("newPassword", formData.newPassword);
    if (imageFile) {
      form.append("picture", imageFile);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/updateprofile", form, {
        withCredentials: true, 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      // alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FBFF] flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#2B2B2B]">Edit Profile</h1>
          <p className="text-[#757442] mt-1 text-sm">Update your basic info</p>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <Image
              src={previewImage || "/default-profile.png"}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="text-white w-7 h-7" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Click to change profile picture</p>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-[#DBCBBD] rounded-xl focus:ring-2 focus:ring-[#87431D] outline-none transition-all"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4 border-t border-[#DBCBBD] pt-6">
          <h3 className="text-lg font-semibold text-[#2B2B2B]">Change Password</h3>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 border border-[#DBCBBD] rounded-xl focus:ring-2 focus:ring-[#87431D] outline-none"
              placeholder="New password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#C87941] to-[#87431D] text-white py-3 rounded-xl font-semibold hover:from-[#b06d39] hover:to-[#733716] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
