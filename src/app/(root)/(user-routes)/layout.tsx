import Navbar from "@/components/user/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
