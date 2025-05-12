"use client";
import React, { useState } from "react";
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

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
  onClick?: () => void; 
}

interface SectionHeaderProps {
  title: string;
}

const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  hasSubmenu = false,
  isActive = false,
  onClick, 
}) => {
  return (
    <div
      onClick={onClick} 
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
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="px-4 py-2 mt-4 mb-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
};

const SideNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>("App");

  const handleNavItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div className="w-[350px] h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div
        className={`${racesport.className} px-4 py-10 flex items-center text-gray-600`}
      >
        GAMETIC
      </div>

      <SectionHeader title="OVERVIEW" />

      <div className="px-2 space-y-1">
        <NavItem
          icon={<AppIcon />}
          label="App"
          isActive={activeItem === "App"}
          onClick={() => handleNavItemClick("App")}
        />
        <NavItem
          icon={<AnalyticsIcon />}
          label="Analytics"
          isActive={activeItem === "Analytics"}
          onClick={() => handleNavItemClick("Analytics")}
        />
        <NavItem
          icon={<BookingIcon />}
          label="Booking"
          isActive={activeItem === "Booking"}
          onClick={() => handleNavItemClick("Booking")}
        />
      </div>

      <SectionHeader title="MANAGEMENT" />

      <div className="flex-1 px-2 pb-4 space-y-1">
        <NavItem
          icon={<UserIcon />}
          label="User"
          hasSubmenu={true}
          isActive={activeItem === "User"}
          onClick={() => handleNavItemClick("User")}
        />
        <NavItem
          icon={<ProductIcon />}
          label="Product"
          hasSubmenu={true}
          isActive={activeItem === "Product"}
          onClick={() => handleNavItemClick("Product")}
        />
        <NavItem
          icon={<OrderIcon />}
          label="Order"
          hasSubmenu={true}
          isActive={activeItem === "Order"}
          onClick={() => handleNavItemClick("Order")}
        />
        <NavItem
          icon={<InvoiceIcon />}
          label="Invoice"
          hasSubmenu={true}
          isActive={activeItem === "Invoice"}
          onClick={() => handleNavItemClick("Invoice")}
        />
      </div>
    </div>
  );
};

export default SideNav;