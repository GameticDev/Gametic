"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Trophy,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import localFont from "next/font/local";

const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});
interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav
      className={`shadow-sm w-full h-16 ${className}`}
    >
      <div className="w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span
                className={`text-lg font-bold text-[#998869] tracking-wider uppercase ${racesport.className}`}
              >
                GAMETIC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/join"
                className="flex items-center space-x-1 text-[#98916D] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                <span>Join</span>
              </Link>

              <Link
                href="/venues"
                className="flex items-center space-x-1 text-[#98916D] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <MapPin className="h-5 w-5" />
                <span>Venues</span>
              </Link>

              <Link
                href="/tournaments"
                className="flex items-center space-x-1 text-[#98916D] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <Calendar className="h-4 w-4" />
                <span>Tournaments</span>
              </Link>
            </div>
          </div>

          {/* Profile Section - Desktop */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
                >
                  <div className="h-9 w-9 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-[#998869]" />
                  </div>
                  <span>Profile</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                    <hr className="my-1 border-[#415C41]" />
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#98916D] hover:text-[#998869] inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[#415C41]">
              <Link
                href="/join"
                className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <User className="h-5 w-5" />
                <span>Join</span>
              </Link>

              <Link
                href="/venues"
                className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <MapPin className="h-5 w-5" />
                <span>Venues</span>
              </Link>

              <Link
                href="/tournaments"
                className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
              >
                <Calendar className="h-5 w-5" />
                <span>Tournaments</span>
              </Link>

              {/* Mobile Profile Section */}
              <div className="border-t border-[#415C41] pt-3 mt-3">
                <div className="flex items-center px-3 py-2">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-[#415C41]">
                    <User className="h-5 w-5 text-[#998869]" />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg font-medium text-[#998869]">
                      Profile
                    </div>
                  </div>
                </div>

                <div className="mt-1 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/logout"
                    className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
