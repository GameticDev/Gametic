"use client";
import { useState } from "react";

interface CredentialsData {
  username: string;
  password: string;
}

interface CredentialsFormProps {
  email: string;
  accountType: "user" | "owner";
}

const CredentialsForm = ({ email, accountType }: CredentialsFormProps) => {
  const [data, setData] = useState<CredentialsData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({
        email,
        accountType,
        username:data.username,
        pass:data.password
    })
  };

  return (
    <div className="w-full">
      {/* Display Email Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {email}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Account Type:</span> {accountType === "user" ? "User Account" : "Owner Account"}
        </div>
      </div>

      {/* Username Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423D] focus:border-transparent transition duration-200"
            placeholder="johndoe"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423D] focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Password must be at least 8 characters long and include uppercase,
          lowercase, and a number
        </div>
      </div>

      {/* Register Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#00423D] text-white py-3 rounded-lg font-medium hover:bg-[#415C41] transition duration-300 shadow-md hover:shadow-lg"
      >
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default CredentialsForm;