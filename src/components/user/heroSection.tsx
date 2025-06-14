"use client";
import { useAppSelector } from "@/redux/hook";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const { preferredLocation } = useAppSelector((state) => state.auth);
  console.log(preferredLocation);
  return (
    <div className="w-full flex items-center justify-center min-h-[600px] lg:min-h-[700px] xl:min-h-[750px] px-4 md:px-20 md:pt-20">
      <div className="absolute w-full h-full  pointer-events-none">
        <Image
          src={
            "https://images.unsplash.com/photo-1466065665758-d473db752253?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          alt="hero"
          className="object-cover"
        />
      </div>
      {/* <div className="absolute w-full h-full bg-black/30"></div> */}
      <div className="relative flex-1 max-w-4xl mx-auto">
        {/* Location Selection Input */}

        <div className="flex flex-col justify-center items-center text-center mb-16 relative">
          <div>
            <div className="mb-7 max-w-[300px] mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="text-gray-500 mb-[2px]" size={20} />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full pl-5 pr-4 py-2 bg-white border-2 border-[#998869]/20 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300 text-center text-sm "
                />
              </div>
            </div>
            {/* Enhanced headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-wide mb-5">
              <span className="bg-gradient-to-r from-gray-900 to-[#415C41] bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#415C41] to-[#98916D] bg-clip-text text-transparent">
                Game Partner
              </span>
            </h1>

            <p className="text-base md:text-[17px] max-w-full md:max-w-[850px] mb-8 text-gray-700 leading-relaxed mx-auto">
              Connect with athletes in your area for{" "}
              <span className="font-semibold text-[#415C41]">
                football, basketball, tennis
              </span>{" "}
              and more. Join local tournaments, discover amazing venues, and
              build your sports community - all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
