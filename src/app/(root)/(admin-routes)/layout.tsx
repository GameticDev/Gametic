import Navbar from "@/components/admin/navbar";
import SideNav from "@/components/admin/sideNav";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white flex">
        <SideNav/>
        <Navbar/>
      <main className="overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
