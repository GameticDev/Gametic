import Navbar from "@/components/user/navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#F0EFEB]">
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>
      <main className="">{children}</main>{" "}
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
    </div>
  );
};

export default Layout;
