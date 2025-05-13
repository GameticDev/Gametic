import Navbar from "@/components/admin/navbar";
import SideNav from "@/components/admin/sideNav";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <SideNav />

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="overflow-auto flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
