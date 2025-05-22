"use client";
// import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { useState } from "react";
import RegisterForm from "./registerForm";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

// export default function AuthModal({ open, onClose }: LoginModalProps) {
//   const router = useRouter();

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white w-full max-w-4xl rounded-lg overflow-hidden shadow-xl flex relative">
//         <div
//           className="w-2/4 hidden md:block bg-cover bg-center bg-no-repeat h-auto"
//           style={{ backgroundImage: `url('register.png')` }}
//           aria-hidden="true"
//         />
//         <div className="w-full md:w-3/5 p-8 bg-white relative">
//           <button
//             onClick={onClose}
//             aria-label="Close modal"
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none"
//           >
//             &times;
//           </button>
//           <div className="text-center mb-6">
//             <h2 className="text-[#004235] text-2xl font-bold">Welcome Back</h2>
//             <p className="text-sm text-gray-500 mt-1">Log in to continue</p>
//           </div>
//           <div className="flex items-center my-6">
//             <div className="flex-1 border-t border-gray-300"></div>
//             <div className="px-4 text-sm text-gray-500">LOGIN WITH</div>
//             <div className="flex-1 border-t border-gray-300"></div>
//           </div>
//           <LoginForm />
//           <div className="text-center mt-4 text-sm">
//             Don’t have an account?{" "}
//             <a
//               href="#"
//               className="text-[#698B66] font-medium hover:text-[#989160]"
//               onClick={() => router.push("registration")}
//             >
//               Register
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function AuthModal({ open, onClose }: LoginModalProps) {
  // const router = useRouter();
  const [toggleAuth, setToggleAuth] = useState<string>("login");
  if (!open) return null;

  return (
    <>
      {toggleAuth === "login" ? (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div
            className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side image - hidden on small screens */}
            <div
              className="w-1/2 hidden md:block bg-cover bg-center bg-no-repeat relative"
              style={{ backgroundImage: `url('register.png')` }}
              aria-hidden="true"
            >
              {/* Overlay with brand color */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00423D]/70 to-[#415C41]/80"></div>

              {/* Brand text */}
              <div className="absolute bottom-10 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Welcome to our platform
                </h3>
                <p className="text-white/80">
                  Secure login to access your personalized dashboard and
                  settings.
                </p>
              </div>
            </div>

            {/* Right side - form area */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white relative">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#98916D]/10 flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#00423D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h2 className="text-[#00423D] text-2xl font-bold">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Log in to continue to your account
                </p>
              </div>

              {/* Google authentication button */}

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  await axiosInstance.post('/api/google', credentialResponse)
                  toast.success("Google Login Successfull")
                  onClose()
                }}
                onError={() => {
                  toast.error("Google Login Failed");
                  onClose()
                }}
              />

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-sm text-gray-500">
                  or continue with email
                </div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Register link */}
              <div className="text-center mt-6 text-sm">
                Don`t have an account?{" "}
                <a
                  href="#"
                  className="text-[#415C41] font-medium hover:text-[#998869] transition duration-200"
                  onClick={() => setToggleAuth("register")}
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex relative" onClick={e => e.stopPropagation()}>
            {/* Left side image - hidden on small screens */}
            <div
              className="w-1/2 hidden md:block bg-cover bg-center bg-no-repeat relative"
              style={{ backgroundImage: `url('register.png')` }}
              aria-hidden="true"
            >
              {/* Overlay with brand color */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#415C41]/70 to-[#998869]/80"></div>

              {/* Brand text */}
              <div className="absolute bottom-10 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Join our community</h3>
                <p className="text-white/80">Create an account to access exclusive features and personalized content.</p>
              </div>
            </div>

            {/* Right side - form area */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white relative">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#98916D]/10 flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00423D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-[#00423D] text-2xl font-bold">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
              </div>


              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-sm text-gray-500">or register with email</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Registration Form */}
              <RegisterForm onClose={onClose} open={open}/>

              {/* Login link */}
              <div className="text-center mt-6 text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-[#415C41] font-medium hover:text-[#998869] transition duration-200"
                  onClick={() => setToggleAuth('login')}
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
}
