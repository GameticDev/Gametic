"use client"
import React, { useState } from 'react';
import { User, Heart, Users, Box } from 'lucide-react';
import Image from 'next/image';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');

  const tabs: TabItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'followers',
      label: 'Followers',
      icon: <Heart className="w-4 h-4" />,
      count: 1.2,
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: <Users className="w-4 h-4" />,
      count: 847,
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: <Box className="w-4 h-4" />,
      count: 23,
    },
  ];

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full bg-white shadow-2xl overflow-hidden border border-gray-200/50">
        {/* Header with sports background */}
        <div className="relative h-52 overflow-hidden" style={{ backgroundColor: '#00423D' }}>
          <Image
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D"
            alt="sports background"
            fill
            className="absolute inset-0 object-cover"
          />

          {/* Profile content */}
          <div className="relative z-10 flex items-end h-full p-8">
            <div className="flex items-end space-x-6">
              {/* Avatar with custom styling */}
              <div className="relative">
                <div className="w-26 h-26 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl font-bold text-gray-700 border-4 border-white">
                  JF
                </div>
              </div>

              {/* Name and title */}
              <div className="pb-4">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Jaydon Frankie
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-gray-100 z-10">
          <div className="flex justify-end gap-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  color: activeTab === tab.id ? '#00423D' : '#415C41',
                  borderBottomColor: activeTab === tab.id ? '#00423D' : 'transparent'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab.id ? '#98916D' : '#98916D30'
                    }}
                  >
                    {typeof tab.count === 'number' && tab.count < 1000 
                      ? tab.count 
                      : formatCount(tab.count as number)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="p-8">
          <div className="text-center py-12">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#00423D' }}
            >
              <div className="text-white">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#00423D' }}>
              {tabs.find(tab => tab.id === activeTab)?.label} Content
            </h3>
            <p style={{ color: '#415C41' }}>
              This is where the {activeTab} content would be displayed.
            </p>
          </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;