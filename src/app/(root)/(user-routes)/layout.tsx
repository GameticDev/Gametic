import Navbar from "@/components/landing/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Navbar/>
    </div>
  );
};

export default Layout;
