"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { registerUser } from "../../../../../redux/actions/authantication/authanticationAction";

export default function RegistrationForm() {

  interface RegisterData {
  username: string;
  email: string;
  password: string;
}


  const [data, setData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });
  console.log(data)

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="example@gmail.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your password"
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full bg-[#004235] text-white py-2 mt-6 rounded-md font-medium hover:bg-[#003226] transition"
      >
        REGISTER
      </button>
    </form>
  );
}
