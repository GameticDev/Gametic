"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import localFont from "next/font/local";
import {
  AnalyticsIcon,
  AppIcon,
  BookingIcon,
  InvoiceIcon,
  OrderIcon,
  ProductIcon,
  UserIcon,
} from "./ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

interface NavItemType {
  label: string;
  icon: React.ReactNode;
  path: string;
  hasSubmenu?: boolean;
}

interface NavSectionType {
  title: string;
  items: NavItemType[];
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-2 mt-4 mb-1">
    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
      {title}
    </span>
  </div>
);

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
}> = ({ icon, label, hasSubmenu = false, isActive = false }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-lg cursor-pointer ${
      isActive ? "bg-blue-50" : "hover:bg-gray-100"
    }`}
  >
    <div className="mr-3">{icon}</div>
    <span
      className={`flex-grow font-semibold ${
        isActive ? "text-blue-600 font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </span>
    {hasSubmenu && <ChevronRight size={16} className="text-gray-400" />}
  </div>
);

const navSections: NavSectionType[] = [
  {
    title: "OVERVIEW",
    items: [
      { label: "App", icon: <AppIcon />, path: "/admin/app" },
      { label: "Analytics", icon: <AnalyticsIcon />, path: "/admin/analytics" },
      { label: "Booking", icon: <BookingIcon />, path: "/admin/booking" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "Users",
        icon: <UserIcon />,
        path: "/admin/users",
        hasSubmenu: true,
      },
      {
        label: "Venues",
        icon: <ProductIcon />,
        path: "/admin/venues",
        hasSubmenu: true,
      },
      {
        label: "Bookings",
        icon: <OrderIcon />,
        path: "/admin/bookings",
        hasSubmenu: true,
      },
      {
        label: "Invoice",
        icon: <InvoiceIcon />,
        path: "/admin/invoice",
        hasSubmenu: true,
      },
    ],
  },
];

const SideNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-[300px] h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div
        className={`${racesport.className} px-4 py-10 flex items-center text-gray-600`}
      >
        GAMETIC
      </div>

      {navSections.map((section) => (
        <div key={section.title}>
          <SectionHeader title={section.title} />
          <div className="px-2 space-y-1">
            {section.items.map(({ label, icon, path, hasSubmenu }) => (
              <Link key={label} href={path}>
                <NavItem
                  icon={icon}
                  label={label}
                  hasSubmenu={hasSubmenu}
                  isActive={pathname.startsWith(path)}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideNav;
