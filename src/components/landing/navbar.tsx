"use client"
import React, { useState } from 'react';
import { Menu, X, User, ChevronDown, Trophy, MapPin, Users, UserCircle } from 'lucide-react';

const SportsNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = (): void => setIsProfileOpen(!isProfileOpen);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, bgColor: string = '#98916D', textColor: string = 'white'): void => {
    (e.target as HTMLElement).style.backgroundColor = bgColor;
    (e.target as HTMLElement).style.color = textColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>, bgColor: string = 'transparent', textColor: string = '#415C41'): void => {
    (e.target as HTMLElement).style.backgroundColor = bgColor;
    (e.target as HTMLElement).style.color = textColor;
  };

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #998869 0%, #415C41 50%, #00423D 100%)' }}>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00423D' }}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ color: '#415C41' }}>SportsPro</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/join" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{ color: '#415C41' }}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                <Users className="w-5 h-5" />
                <span>Join</span>
              </a>

              <a 
                href="/venues" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{ color: '#415C41' }}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                <MapPin className="w-5 h-5" />
                <span>Venues</span>
              </a>

              <a 
                href="/tournaments" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{ color: '#415C41' }}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                <Trophy className="w-5 h-5" />
                <span>Tournaments</span>
              </a>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{ color: '#415C41' }}
                  onMouseEnter={(e) => {
                    if (!isProfileOpen) {
                      handleMouseEnter(e);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProfileOpen) {
                      handleMouseLeave(e);
                    }
                  }}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Profile</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a 
                      href="/profile" 
                      className="block px-4 py-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: '#415C41' }}
                      onMouseEnter={(e) => handleMouseEnter(e)}
                      onMouseLeave={(e) => handleMouseLeave(e)}
                    >
                      View Profile
                    </a>
                    <a 
                      href="/settings" 
                      className="block px-4 py-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: '#415C41' }}
                      onMouseEnter={(e) => handleMouseEnter(e)}
                      onMouseLeave={(e) => handleMouseLeave(e)}
                    >
                      Settings
                    </a>
                    <hr className="my-2 border-gray-200" />
                    <a 
                      href="/logout" 
                      className="block px-4 py-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: '#998869' }}
                      onMouseEnter={(e) => handleMouseEnter(e, '#998869', 'white')}
                      onMouseLeave={(e) => handleMouseLeave(e, 'transparent', '#998869')}
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: '#415C41' }}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
                <a 
                  href="/join" 
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  style={{ color: '#415C41' }}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  <Users className="w-5 h-5" />
                  <span>Join</span>
                </a>
                
                <a 
                  href="/venues" 
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  style={{ color: '#415C41' }}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Venues</span>
                </a>
                
                <a 
                  href="/tournaments" 
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  style={{ color: '#415C41' }}
                  onMouseEnter={(e) => handleMouseEnter(e)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Tournaments</span>
                </a>
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <a 
                    href="/profile" 
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    style={{ color: '#415C41' }}
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    <UserCircle className="w-5 h-5" />
                    <span>Profile</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to SportsPro</h1>
          <p className="text-xl opacity-90">Your professional sports platform</p>
        </div>
      </div>
    </div>
  );
};

export default SportsNavbar;