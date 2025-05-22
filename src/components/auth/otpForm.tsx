"use client";

import { useState, useRef, useEffect } from "react";

const OTPForm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const pasteArray = pasteData
      .split("")
      .filter((char) => !isNaN(Number(char)));

    if (pasteArray.length > 0) {
      const newOtp = [...otp];
      pasteArray.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pasteArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    console.log("OTP entered:", otpString);
    // Handle OTP verification here
  };

  const handleResendOTP = () => {
    setTimeLeft(120);
    setCanResend(false);
    setOtp(new Array(6).fill(""));
    console.log("Resending OTP...");
    // Handle resend OTP here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#00423D] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit verification code to your email address. Please
          enter it below.
        </p>
      </div>

      {/* OTP Input Fields */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          Enter Verification Code
        </label>
        <div className="flex justify-center gap-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              value={data}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00423D] focus:border-transparent transition duration-200"
              required
            />
          ))}
        </div>
      </div>

      {/* Timer and Resend */}
      <div className="text-center mb-6">
        {!canResend ? (
          <p className="text-sm text-gray-600">
            Resend code in{" "}
            <span className="font-medium text-[#00423D]">
              {formatTime(timeLeft)}
            </span>
          </p>
        ) : (
          <button
            onClick={handleResendOTP}
            className="text-sm text-[#00423D] hover:text-[#415C41] font-medium transition duration-200"
          >
            Didn't receive the code? Resend
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleSubmit}
        disabled={otp.join("").length !== 6}
        className="w-full bg-[#00423D] text-white py-3 rounded-lg font-medium hover:bg-[#415C41] transition duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        VERIFY CODE
      </button>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Check your spam folder if you don't see the email in your inbox
        </p>
      </div>
    </div>
  );
};

export default OTPForm;
