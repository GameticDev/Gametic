"use client"
import { FiLogOut, FiUser, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/actions/authantication/authanticationAction";
import Image from "next/image";

interface OwnerStaggeredDropDownProps {
  userInitials: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
}

const OwnerStaggeredDropDown = ({ 
  userInitials, 
  userName,
  userEmail,
  userImage 
}: OwnerStaggeredDropDownProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      icon: FiUser,
      text: "My Profile",
      action: () => router.push("/owner/profile"),
    },
    {
      icon: FiMessageSquare,
      text: "Messages",
      action: () => router.push("/owner/messages"),
    },
    {
      icon: FiLogOut,
      text: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <div className="relative">
      <motion.div animate={open ? "open" : "closed"}>
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#415C41] to-[#00423D] hover:opacity-90 transition-opacity"
          aria-label="User menu"
        >
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="font-medium text-white">{userInitials}</span>
          )}
        </button>

        <motion.div
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100"
        >
          {/* User info section */}
          <div className="p-4 border-b border-gray-100">
            <p className="font-medium text-gray-900 truncate">{userName}</p>
            {userEmail && (
              <p className="text-sm text-gray-500 truncate">{userEmail}</p>
            )}
            <p className="text-xs text-[#00423D] bg-[#00423D]/10 px-2 py-1 rounded-full inline-block mt-1">
              Owner
            </p>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                whileHover={{ backgroundColor: "#F5F5F5" }}
                className="px-4 py-2.5 flex items-center cursor-pointer"
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
              >
                <item.icon className="w-5 h-5 text-gray-700 mr-3" />
                <span className="text-sm text-gray-700">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Animation variants
const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      when: "afterChildren",
    },
  },
};

export default OwnerStaggeredDropDown;