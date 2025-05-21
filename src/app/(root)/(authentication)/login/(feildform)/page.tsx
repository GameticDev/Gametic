'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { loginUser } from '../../../../../redux/actions/authantication/authanticationAction';

const Page = () => {
  const dispatch = useAppDispatch();

  interface LoginData {
    email: string;
    password: string;
  }

  const [data, setData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginUser(data)); 
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#004235]"
          placeholder="you@example.com"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#004235]"
          placeholder="••••••"
        />
      </div>

      {/* Login Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#004235] text-white py-2 rounded-md font-medium hover:bg-[#003226]"
      >
        LOGIN
      </button>
    </div>
  );
};

export default Page;
