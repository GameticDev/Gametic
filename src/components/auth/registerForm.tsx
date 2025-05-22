'use client';

// import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from '@/redux/hooks';
import { registerUser } from "@/redux/actions/authantication/authanticationAction";
import {  toast } from 'sonner';
import {LoginModalProps} from './authModal'
// Assuming you have a registration action
// import { registerUser } from '@/redux/actions/authantication/authanticationAction';


interface RegisterData {
  username: string;
  email: string;
  password: string;
  accountType: 'user' | 'owner';
}

const RegisterForm = ({onClose} : LoginModalProps ) => {
  const dispatch = useAppDispatch();
  
  const [data, setData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    accountType: 'user'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleChange = (accountType: 'user' | 'owner') => {
    setData({
      ...data,
      accountType: accountType,
    });
  };

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      toast.success("Registration successful")
      await dispatch(registerUser(data));
      onClose()
    } catch (error) {
      toast.error("User already exist")
      console.log(error);
    } 
  };

  return (
    <div className="w-full">
      {/* Account Type Toggle */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
        <div className="flex rounded-lg border border-gray-300 p-1">
          <button
            type="button"
            onClick={() => handleToggleChange('user')}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.accountType === 'user' 
                ? 'bg-[#00423D] text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            User Account
          </button>
          <button
            type="button" 
            onClick={() => handleToggleChange('owner')}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.accountType === 'owner' 
                ? 'bg-[#00423D] text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Owner Account
          </button>
        </div>
      </div>

      {/* Username Input */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

      {/* Email Input */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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

      {/* Password Input */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
          Password must be at least 8 characters long and include uppercase, lowercase, and a number
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


export default RegisterForm