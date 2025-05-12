import { Search, Command, Bell, Settings, ChevronLeft } from 'lucide-react';

export default function Navbar() {
  const notificationCount = 4;
  
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm py-7 px-4">
      <div className="flex items-center justify-between ">

        <div className="hidden md:block"></div>

        {/* Right Section */}
        <div className="flex items-center space-x-8">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex items-center space-x-1">
            <Command className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">K</span>
          </div>
          
          <button className="relative p-1.5 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-500" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          
          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
          
          
          {/* User Avatar */}
          <button className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AG</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}