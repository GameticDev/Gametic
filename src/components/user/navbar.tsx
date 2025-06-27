"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  MapPin,
  Calendar,
  User,
  Bell,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/actions/authantication/authanticationAction";
import { currentUser } from "@/redux/actions/user/userAction";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import LocationModal from "./locationModal";
import NotificationSidebar from "./NotificationSidebar";
import socket from "@/app/socket/soket"; // Adjusted path assuming correct file name
import axiosInstance from "@/utils/axiosInstance";

const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

interface NavbarProps {
  className?: string;
}

interface Notification {
  _id: string;
  type: "booking" | "tournament" | "system" | "match";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  matchId?: string;
  tournamentId?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ismodalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleProfile = useCallback(() => setIsProfileOpen((prev) => !prev), []);
  const toggleNotifications = useCallback(
    () => setIsNotificationOpen((prev) => !prev),
    []
  );
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const closeNotifications = useCallback(() => setIsNotificationOpen(false), []);

  const { user } = useAppSelector((state) => state.user);

  // Fetch initial unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user?._id) return;

    try {
      setIsLoadingCount(true);
      const response = await axiosInstance.get("/allNotification");

      if (response.data?.notifications) {
        const unreadNotifications: Notification[] =
          response.data.notifications.filter(
            (notification: Notification) => !notification.isRead
          );
        setUnreadCount(unreadNotifications.length);
      }
    } catch (error: unknown) {
      console.error("Error fetching notification count:", error);
    } finally {
      setIsLoadingCount(false);
    }
  }, [user?._id]);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  // Fetch unread count when user is available
  useEffect(() => {
    if (user?._id) {
      fetchUnreadCount();
    }
  }, [user?._id, fetchUnreadCount]);

  // Socket setup for real-time notifications
  useEffect(() => {
    if (user?._id) {
      // Connect socket with userId
      socket.io.opts.query = { userId: user._id };
      if (!socket.connected) {
        socket.connect();
      }

      // Listen for new notifications
      const handleNewNotification = (data: {
        _id?: string;
        type?: string;
        title: string;
        message: string;
        matchId?: string;
        tournamentId?: string;
      }) => {
        console.log("New notification received in navbar:", data);
        // Increment unread count
        setUnreadCount((prev) => prev + 1);

        // Show browser notification if permission granted
        if (Notification.permission === "granted") {

          new Notification(data.title, {
            body: data.message,
            icon: "/favicon.ico",
          });
        }
      };

      // Listen for notification read events
      const handleNotificationRead = () => {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      };

      // Listen for all notifications marked as read
      const handleAllNotificationsRead = () => {
        setUnreadCount(0);
      };

      socket.on("newNotification", handleNewNotification);
      socket.on("notificationRead", handleNotificationRead);
      socket.on("allNotificationsRead", handleAllNotificationsRead);

      // Request notification permission
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }

      // Cleanup
      return () => {
        socket.off("newNotification", handleNewNotification);
        socket.off("notificationRead", handleNotificationRead);
        socket.off("allNotificationsRead", handleAllNotificationsRead);
      };
    }
  }, [user?._id]);

  // Function to handle notification count updates from NotificationSidebar
  const updateUnreadCount = useCallback((newCount: number) => {
    setUnreadCount(newCount);
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/");
    } catch (error: unknown) {
      alert(String(error));
    }
  }, [dispatch, router]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".profile-dropdown") &&
        !target.closest(".profile-button")
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`w-full h-16 ${className} bg-[#FEFFFA] relative z-30`}
        aria-label="Main navigation"
      >
        <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="flex flex-wrap items-center justify-between h-full gap-y-2">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center" aria-label="Home">
                <span
                  className={`text-xl font-bold text-[#00423d] tracking-wider uppercase ${racesport.className}`}
                >
                  GAMETIC!
                </span>
              </Link>
              <div className="w-28" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-8">
                <Link
                  href="/home/join"
                  className="flex items-center space-x-1 text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
                  aria-label="Join"
                >
                  <User className="w-5 h-5" />
                  <span>Join</span>
                </Link>

                <Link
                  href="/home/facilities"
                  className="flex items-center space-x-1 text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
                  aria-label="Venues"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Venues</span>
                </Link>

                <Link
                  href="/home/tournament"
                  className="flex items-center space-x-1 text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
                  aria-label="Tournaments"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Tournaments</span>
                </Link>
              </div>
            </div>

            {/* Profile Section - Desktop */}
            <div className="hidden md:block">
              <div className="flex items-center ml-4 md:ml-6">
                {/* Location Selector */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-1 text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md text-md font-medium transition-colors duration-200"
                  aria-label={`Select location: ${user?.preferredLocation || "Not set"}`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="max-w-32 truncate mt-[2px]">
                    {user?.preferredLocation || "Select Location"}
                  </span>
                </button>

                {/* Notification Bell */}
                <button
                  type="button"
                  onClick={toggleNotifications}
                  className="flex items-center justify-center text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md transition-colors duration-200 relative"
                  disabled={isLoadingCount}
                  aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1 animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                  {isLoadingCount && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-400 rounded-full -top-1 -right-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleProfile}
                    className="profile-button flex items-center text-[#00423d] hover:text-[#998869] px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200"
                    aria-label="Profile menu"
                    aria-expanded={isProfileOpen}
                  >
                    <div className="flex items-center justify-center h-9 w-9">
                      <User className="h-5 w-5 text-[#00423d]" />
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-[#00423D] rounded-md shadow-lg py-1 z-50 border border-[#415C41]">
                      <Link
                        href="/home/profile"
                        className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                        aria-label="View Profile"
                      >
                        View Profile
                      </Link>
                      <Link
                        href="/message"
                        className="block px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                        aria-label="Chat"
                      >
                        Chat
                      </Link>
                      <hr className="my-1 border-[#415C41]" />
                      <button
                        type="button"
                        onClick={logoutUser}
                        className="block w-full text-left px-4 py-2 text-sm text-[#98916D] hover:text-[#998869] transition-colors duration-200"
                        aria-label="Sign Out"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="text-[#98916D] hover:text-[#998869] inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="fixed inset-0 bg-[#FEFFFA] z-40 md:hidden overflow-y-auto">
              <div className="px-4 pt-20 pb-10 space-y-1 sm:px-6 border-t border-[#415C41]">
                {/* Mobile Location Selector */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-full text-left"
                  aria-label={`Select location: ${user?.preferredLocation || "Not set"}`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="flex-1 truncate">
                    {user?.preferredLocation || "Select Location"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mobile Notification Bell */}
                <button
                  type="button"
                  onClick={toggleNotifications}
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-full text-left"
                  disabled={isLoadingCount}
                  aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                  {isLoadingCount && (
                    <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs font-bold text-white bg-gray-400 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </span>
                  )}
                </button>

                <Link
                  href="/home/join"
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label="Join"
                >
                  <User className="w-5 h-5" />
                  <span>Join</span>
                </Link>

                <Link
                  href="/home/facilities"
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label="Venues"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Venues</span>
                </Link>

                <Link
                  href="/home/tournament"
                  className="flex items-center space-x-2 text-[#98916D] hover:text-[#998869] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tournaments"
                >
                  <Calendar className="w-5 h-5" />
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
                      href="/home/profile"
                      className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                      aria-label="View Profile"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/message"
                      className="block px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                      aria-label="Settings"
                    >
                      Chat
                    </Link>
                    <button
                      type="button"
                      onClick={logoutUser}
                      className="block w-full text-left px-3 py-2 text-base text-[#98916D] hover:text-[#998869] rounded-md transition-colors duration-200"
                      aria-label="Sign Out"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <LocationModal isOpen={ismodalOpen} onClose={closeModal} />
      </nav>

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={closeNotifications}
        userId={user?._id}
        onUnreadCountChange={updateUnreadCount}
      />
    </>
  );
};

export default Navbar;