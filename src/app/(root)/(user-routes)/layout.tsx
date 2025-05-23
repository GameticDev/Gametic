// app/user/join/layout.tsx
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* You can add a sidebar or nav here if needed */}
      {children}
    </div>
  );
}