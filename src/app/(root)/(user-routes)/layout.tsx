import Navbar from "@/components/user/navbar";
import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#00423D",
          },
          className: "text-md",
          duration: 2000,
        }}
        position="top-right"
      />
    </div>
  );
};

export default Layout;
