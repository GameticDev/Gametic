"use client";
import { genrateOTP } from "@/redux/actions/authantication/authanticationAction";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

interface EmailData {
  email: string;
  accountType: "user" | "owner";
}

interface EmailFormProps {
  onEmailSubmit: (data: EmailData) => void;

  openOtp: () => void;
}

const EmailForm = ({ openOtp, onEmailSubmit }: EmailFormProps) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<EmailData>({
    email: "",
    accountType: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleChange = (accountType: "user" | "owner") => {
    setData({
      ...data,
      accountType: accountType,
    });
  };


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEmailSubmit(data);
    try {
      const res = await dispatch(genrateOTP(data.email));
      openOtp();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="w-full">
      {/* Account Type Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <div className="flex rounded-lg border border-gray-300 p-1">
          <button
            type="button"
            onClick={() => handleToggleChange("user")}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.accountType === "user"
                ? "bg-[#00423D] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            User Account
          </button>
          <button
            type="button"
            onClick={() => handleToggleChange("owner")}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.accountType === "owner"
                ? "bg-[#00423D] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Owner Account
          </button>
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423D] focus:border-transparent transition duration-200"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#00423D] text-white py-3 rounded-lg font-medium hover:bg-[#415C41] transition duration-300 shadow-md hover:shadow-lg"
      >
        CONTINUE
      </button>
    </div>
  );
};


export default EmailForm;

