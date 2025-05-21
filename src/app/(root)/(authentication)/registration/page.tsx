"use client";

import { useState } from "react";
import FormFields from "./(feildform)/page";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/utils/axiosInstance";

interface SportsRegistrationModalProps {
  onClose?: () => void;
}

export default function SportsRegistrationModal({ onClose }: SportsRegistrationModalProps) {
  const [open, setOpen] = useState(true);

  const router = useRouter()

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-xl flex">
        {/* Left side - Background image */}
        <div
          className="w-2/5 hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('login.page img.png')" }}
          aria-hidden="true"
        />

        {/* Right side - Registration Form */}
        <div className="w-full md:w-3/5 p-8 bg-white relative flex flex-col">
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            &times;
          </button>

          <div className="text-center mb-6">
            <h2 className="text-[#004235] text-2xl font-bold">SporTYYY</h2>
          </div>


           <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log('credentialResponse',credentialResponse)
          const post = await axiosInstance.post('/api/google', credentialResponse)
          
          console.log(post)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">OR CONTINUE WITH</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Form Fields */}
          <FormFields />



          {/* Login Link */}
          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="#" className="text-[#698B66] font-medium hover:text-[#989160]" onClick={() => router.push('login')}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
