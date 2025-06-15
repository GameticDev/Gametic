"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginFrom from "@/components/auth/loginForm"

interface LoginModalProps {
  onClose?: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [open, setOpen] = useState(true);

  const router = useRouter()
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-xl flex relative">
        {/* Left Side - Background Image */}
        <div
          className="w-2/4 hidden md:block bg-cover bg-center bg-no-repeat h-auto"
          style={{ backgroundImage: `url('register.png')` }}
          aria-hidden="true"
        />

        {/* Right Side - Login Form */}

        <div className="w-full md:w-3/5 p-8 bg-white relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            &times;
          </button>

          <div className="text-center mb-6">
            <h2 className="text-[#004235] text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Log in to continue</p>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">LOGIN WITH</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
<LoginFrom></LoginFrom>
          {/* Register Link */}
          <div className="text-center mt-4 text-sm">
            Don`t have an account?{" "}
            <a href="#" className="text-[#698B66] font-medium hover:text-[#989160]" onClick={() => router.push('registration')}>
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
