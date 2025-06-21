import React, { ReactNode } from 'react';
import OwnerNavbar from '@/components/owner/OwnerNavbar';
import SideBar from '@/components/owner/sideBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col ml-[300px]">
        <OwnerNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;