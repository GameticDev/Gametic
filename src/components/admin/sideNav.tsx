// "use client";

// import React from "react";
// import { ChevronRight } from "lucide-react";
// import localFont from "next/font/local";
// import {
//   AnalyticsIcon,
//   AppIcon,
//   BookingIcon,
//   InvoiceIcon,
//   OrderIcon,
//   ProductIcon,
//   UserIcon,
// } from "./ui/icons";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const racesport = localFont({
//   src: "../../fonts/RaceSport.ttf",
//   variable: "--font-RaceSport",
// });

// interface NavItemType {
//   label: string;
//   icon: React.ReactNode;
//   path: string;
//   hasSubmenu?: boolean;
// }

// interface NavSectionType {
//   title: string;
//   items: NavItemType[];
// }

// const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
//   <div className="px-4 py-2 mt-4 mb-1">
//     <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//       {title}
//     </span>
//   </div>
// );

// const NavItem: React.FC<{
//   icon: React.ReactNode;
//   label: string;
//   hasSubmenu?: boolean;
//   isActive?: boolean;
// }> = ({ icon, label, hasSubmenu = false, isActive = false }) => (
//   <div
//     className={`flex items-center px-4 py-3 rounded-lg cursor-pointer ${
//       isActive ? "bg-blue-50" : "hover:bg-gray-100"
//     }`}
//   >
//     <div className="mr-3">{icon}</div>
//     <span
//       className={`flex-grow font-semibold ${
//         isActive ? "text-blue-600 font-medium" : "text-gray-600"
//       }`}
//     >
//       {label}
//     </span>
//     {hasSubmenu && <ChevronRight size={16} className="text-gray-400" />}
//   </div>
// );

// const navSections: NavSectionType[] = [
//   {
//     title: "OVERVIEW",
//     items: [
//       { label: "App", icon: <AppIcon />, path: "/admin/app" },
//       { label: "Analytics", icon: <AnalyticsIcon />, path: "/admin/analytics" },
//       { label: "Booking", icon: <BookingIcon />, path: "/admin/booking" },
//     ],
//   },
//   {
//     title: "MANAGEMENT",
//     items: [
//       {
//         label: "Users",
//         icon: <UserIcon />,
//         path: "/admin/users",
//         hasSubmenu: true,
//       },
//       {
//         label: "Venues",
//         icon: <ProductIcon />,
//         path: "/admin/venues",
//         hasSubmenu: true,
//       },
//       {
//         label: "Bookings",
//         icon: <OrderIcon />,
//         path: "/admin/bookings",
//         hasSubmenu: true,
//       },
//       {
//         label: "Invoice",
//         icon: <InvoiceIcon />,
//         path: "/admin/invoice",
//         hasSubmenu: true,
//       },
//     ],
//   },
// ];

// const SideNav: React.FC = () => {
//   const pathname = usePathname();

//   return (
//     <div className="w-[250px] h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
//       <div
//         className={`${racesport.className} px-4 py-10 flex items-center text-gray-600 text-xl`}
//       >
//         GAMETIC!
//       </div>

//       {navSections.map((section) => (
//         <div key={section.title}>
//           <SectionHeader title={section.title} />
//           <div className="px-2 space-y-1">
//             {section.items.map(({ label, icon, path, hasSubmenu }) => (
//               <Link key={label} href={path}>
//                 <NavItem
//                   icon={icon}
//                   label={label}
//                   hasSubmenu={hasSubmenu}
//                   isActive={pathname.startsWith(path)}
//                 />
//               </Link>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SideNav;

"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Menu } from "lucide-react";
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
  subItems?: Array<{ label: string; path: string }>;
}

interface NavSectionType {
  title: string;
  items: NavItemType[];
}

// Enhanced SectionHeader with gradient accent
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="px-4 py-3 mt-4 mb-1 relative">
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r"></div>
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-2">
      {title}
    </span>
  </div>
);

// Enhanced NavItem with animations and better visual design
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}> = ({
  icon,
  label,
  hasSubmenu = false,
  isActive = false,
  isExpanded = false,
  onClick,
}) => (
  <div
    className={`flex items-center px-4 py-3 my-1 rounded-lg cursor-pointer transition-all duration-200 
      ${
        isActive
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500"
          : "hover:bg-gray-50 hover:translate-x-1"
      }`}
    onClick={onClick}
  >
    <div
      className={`mr-3 transition-colors duration-200 ${
        isActive ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {icon}
    </div>
    <span
      className={`flex-grow font-medium transition-colors duration-200 ${
        isActive ? "text-blue-600" : "text-gray-700"
      }`}
    >
      {label}
    </span>
    {hasSubmenu &&
      (isExpanded ? (
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${
            isActive ? "text-blue-500" : "text-gray-400"
          }`}
        />
      ) : (
        <ChevronRight
          size={16}
          className={`transform transition-transform duration-200 ${
            isActive ? "text-blue-500" : "text-gray-400"
          }`}
        />
      ))}
  </div>
);

// Sub-menu item component
const SubMenuItem: React.FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => (
  <div
    className={`flex items-center px-4 py-2 pl-12 rounded-lg cursor-pointer transition-all duration-200 text-sm
    ${
      isActive
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
    }`}
  >
    {label}
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
        subItems: [
          { label: "All Users", path: "/admin/users" },
          { label: "Add New", path: "/admin/users/new" },
          { label: "Groups", path: "/admin/users/groups" },
        ],
      },
      {
        label: "Venues",
        icon: <ProductIcon />,
        path: "/admin/venues",
        hasSubmenu: true,
        subItems: [
          { label: "All Venues", path: "/admin/venues" },
          { label: "Add Venue", path: "/admin/venues/new" },
          { label: "Categories", path: "/admin/venues/categories" },
        ],
      },
      {
        label: "Bookings",
        icon: <OrderIcon />,
        path: "/admin/bookings",
        hasSubmenu: true,
        subItems: [
          { label: "All Bookings", path: "/admin/bookings" },
          { label: "Pending", path: "/admin/bookings/pending" },
          { label: "Completed", path: "/admin/bookings/completed" },
        ],
      },
      {
        label: "Invoice",
        icon: <InvoiceIcon />,
        path: "/admin/invoice",
        hasSubmenu: true,
        subItems: [
          { label: "All Invoices", path: "/admin/invoice" },
          { label: "Create New", path: "/admin/invoice/new" },
          { label: "Settings", path: "/admin/invoice/settings" },
        ],
      },
    ],
  },
];

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [collapsed, setCollapsed] = useState(false);

  const toggleSubmenu = (path: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto shadow-sm transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header with toggle button */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div
          className={`px-4 py-5 flex items-center justify-between ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <div
              className={`${racesport.className} text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text font-bold`}
            >
              GAMETIC!
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation sections */}
      <div className="flex-grow">
        {navSections.map((section) => (
          <div key={section.title} className={collapsed ? "px-2" : ""}>
            {!collapsed && <SectionHeader title={section.title} />}
            {collapsed && <div className="h-px bg-gray-200 mx-2 my-4"></div>}
            <div className={`${collapsed ? "px-0" : "px-2"} space-y-1`}>
              {section.items.map(
                ({ label, icon, path, hasSubmenu, subItems }) => {
                  const isActive = pathname.startsWith(path);
                  const isExpanded = expandedItems[path];

                  return (
                    <div key={label}>
                      {hasSubmenu ? (
                        <>
                          <div
                            onClick={() => !collapsed && toggleSubmenu(path)}
                          >
                            {collapsed ? (
                              <div className="flex justify-center py-3 hover:bg-gray-50 rounded-lg cursor-pointer relative group">
                                <div className="text-gray-500 group-hover:text-blue-500 transition-colors">
                                  {icon}
                                </div>
                                <div className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap z-50">
                                  {label}
                                </div>
                              </div>
                            ) : (
                              <NavItem
                                icon={icon}
                                label={label}
                                hasSubmenu={hasSubmenu}
                                isActive={isActive}
                                isExpanded={isExpanded}
                              />
                            )}
                          </div>
                          {!collapsed && isExpanded && subItems && (
                            <div className="ml-2 pl-2 border-l border-gray-200 mt-1 mb-2 space-y-1 animate-fadeIn">
                              {subItems.map((subItem) => (
                                <Link key={subItem.path} href={subItem.path}>
                                  <SubMenuItem
                                    label={subItem.label}
                                    isActive={pathname === subItem.path}
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link key={path} href={path}>
                          {collapsed ? (
                            <div className="flex justify-center py-3 hover:bg-gray-50 rounded-lg cursor-pointer relative group">
                              <div
                                className={`${
                                  isActive ? "text-blue-500" : "text-gray-500"
                                } group-hover:text-blue-500 transition-colors`}
                              >
                                {icon}
                              </div>
                              <div className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap z-50">
                                {label}
                              </div>
                            </div>
                          ) : (
                            <NavItem
                              icon={icon}
                              label={label}
                              isActive={isActive}
                            />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User profile section at bottom */}
      <div
        className={`mt-auto border-t border-gray-200 p-4 ${
          collapsed ? "py-4 px-2" : ""
        }`}
      >
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              AG
            </div>
            <div className="flex-grow">
              <div className="text-sm font-medium text-gray-700">
                Admin User
              </div>
              <div className="text-xs text-gray-500">admin@gametic.com</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer">
              AG
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
