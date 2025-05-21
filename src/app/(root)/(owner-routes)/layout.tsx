import React, { ReactNode } from 'react';
import Navbar from '@/components/admin/navbar';
import SideBar from '@/components/owner/sideBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div style={{ display: 'flex', height: '100vh' }}>
    //   {/* Sidebar */}
    //   <SideBar />
      
    //   {/* Main content area */}
    //   <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    //     {/* Navbar */}
    //     <Navbar />
        
    //     {/* Content area */}
    //     <main style={{ flex: 1, padding: '20px' }}>
    //       {children}
    //     </main>
    //   </div>
    // </div>

    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  {/* Fixed Sidebar */}
  <div style={{ width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 50, backgroundColor: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
    <SideBar />
  </div>

  {/* Main content area with left margin */}
  <div style={{ marginLeft: '250px', flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      {children}
    </main>
  </div>
</div>

  );
};

export default Layout;

