import React from 'react';
import { User, Users, DollarSign } from 'lucide-react';

const JoinBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Match Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1" style={{ color: '#415C41' }}>
                <Users className="w-5 h-5" />
                <span className="text-lg font-semibold">6/10</span>
                <span className="text-sm text-gray-500">players</span>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <DollarSign className="w-5 h-5" style={{ color: '#998869' }} />
              <span className="text-lg font-semibold" style={{ color: '#00423D' }}>$100</span>
              <span className="text-sm text-gray-500">per player</span>
            </div>
          </div>

          {/* Right Side - Join Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium" style={{ color: '#00423D' }}>Championship Football Match</p>
              <p className="text-xs" style={{ color: '#998869' }}>June 15, 2025 • Main Stadium</p>
            </div>
            
            <button 
              className="group relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: '#00423D' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Join Match</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Additional Info */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" style={{ color: '#998869' }} />
                <span className="font-semibold" style={{ color: '#00423D' }}>$35</span>
                <span className="text-gray-500">per player</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium" style={{ color: '#00423D' }}>June 15, 2025</p>
              <p style={{ color: '#998869' }}>Main Stadium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinBar;