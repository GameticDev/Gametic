// 'use client';

// import React, { useState } from 'react';
// import { useAppDispatch } from '@/redux/hooks';
// import { loginUser } from '@/redux/actions/authantication/authanticationAction';

// const LoginForm = () => {
//   const dispatch = useAppDispatch();

//   interface LoginData {
//     email: string;
//     password: string;
//   }

//   const [data, setData] = useState<LoginData>({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       await dispatch(loginUser(data));
//       alert("ok")
//     } catch (error) {
//       console.log(error)
//     } 
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       {/* Email Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#004235]"
//           placeholder="you@example.com"
//         />
//       </div>

//       {/* Password Input */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#004235]"
//           placeholder="••••••"
//         />
//       </div>

//       {/* Login Button */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-[#004235] text-white py-2 rounded-md font-medium hover:bg-[#003226]"
//       >
//         LOGIN
//       </button>
//     </div>
//   );
// };

// export default LoginForm;


'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from '@/redux/hooks';
import { loginUser } from '@/redux/actions/authantication/authanticationAction';



const LoginForm = () => {
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

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(data));
      alert("Login successful");
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className="w-full">
      {/* Email Input */}
      <div className="mb-5">
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
      <div className="mb-6">
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
        <div className="mt-2 flex justify-end">
          <a href="#" className="text-sm text-[#98916D] hover:text-[#998869] transition duration-200">Forgot password?</a>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#00423D] text-white py-3 rounded-lg font-medium hover:bg-[#415C41] transition duration-300 shadow-md hover:shadow-lg"
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginForm