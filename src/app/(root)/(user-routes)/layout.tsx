import SportsNavbar from "@/components/landing/navbar";
import Navbar from "@/components/landing/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black w-full">
      <SportsNavbar />
      <main className="overflow-auto flex-1 p-4">{children}</main>
    </div>
  );
}; 

export default Layout;
